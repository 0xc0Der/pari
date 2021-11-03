import { Parser } from './parser.js';

export const char = char => new Parser(state => {
    const idx = state.idx || 0, curChar = state.input[idx];

    return RegExp(`^${char}$`).test(curChar) ? {
        ...state,
        idx: idx + 1,
        res: curChar
    } : {
        ...state,
        err: true,
        errMsg: `can't find '${char}' at '${idx}'.`
    };
});

export const sequence = (...parsers) => new Parser(state => {
    let result = state, res = [];

    for(let parser of parsers) {
        result = parser.process(result);
        res.push(result.res);
    }

    return { ...result, res };
});

export const or = (...parsers) => new Parser(state => {
    for(let parser of parsers) {
        const newState = parser.process(state);

        if(!newState.err) return newState;
    }

    return { ...state, err: true, errMsg: 'or found no match' };
});

export const zeroOrMore = parser => new Parser(state => {
    const result = parser.process(state);

    return result.err ? {
        ...state,
        res: []
    } : zeroOrMore(parser).map(state => {
        return { ...state, res: [result.res, ...state.res] };
    }).process(result);
});

export const lazy = func => new Parser(state => state).map(state => {
    return func().process(state);
});
