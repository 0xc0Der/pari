import Parser from './parser.js';
import State from './state.js';

export const char = char =>
    new Parser(state => {
        const match = new RegExp(`^${char}$`).test(state.charAt(state.index));

        return state
            .withStatus(1 << (!match + !match))
            .withIndex(state.index + match);
    });

export const firstOf = ([p, ...ps]) =>
    new Parser(state => {
        const next = ps.length === 1 ? ps[0] : firstOf(ps);

        return p.nok(() => next.process(state)).process(state.clone());
    });

export const sequence = ([p, ...ps]) =>
    p.ok(state => {
        const next = ps.length === 1 ? ps[0] : sequence(ps);

        return next.process(state);
    });

export const zeroOrOne = p =>
    new Parser(state => p.error(() => state).process(state.clone()));

export const zeroOrMore = p =>
    zeroOrOne(p.ok(state => zeroOrMore(p).process(state)));

export const oneOrMore = p => p.ok(state => zeroOrMore(p).process(state));
