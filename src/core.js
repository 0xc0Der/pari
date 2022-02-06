import Parser from './parser.js';

export const char = chr =>
    new Parser(state => {
        const { input, idx = 0 } = state;
        const curChr = input[idx];

        return RegExp(`^${chr}$`).test(curChr)
            ? {
                  ...state,
                  idx: idx + 1,
                  res: curChr
              }
            : {
                  ...state,
                  err: true
              };
    });

export const sequence = (...parsers) =>
    new Parser(state => {
        const res = [];

        for (let parser of parsers) {
            state = parser.process(state);

            if (state.err) {
                break;
            }

            res.push(state.res);
        }

        return { ...state, res };
    });

export const or = (...parsers) =>
    new Parser(state => {
        for (let parser of parsers) {
            const curState = parser.process(state);

            if (!curState.err) {
                return curState;
            }
        }

        return { ...state, err: true };
    });

export const zeroOrMore = parser =>
    new Parser(state => {
        let curState = state;
        const res = [];

        while (true) {
            curState = parser.process(state);

            if (curState.err) {
                break;
            }

            state = curState;
            res.push(state.res);
        }

        return { ...state, res };
    });

export const zeroOrOne = parser =>
    new Parser(state => {
        const newState = parser.process(state);

        return newState.err ? state : newState;
    });

export const lazy = func =>
    new Parser(state => state).next(state => {
        return func().process(state);
    });
