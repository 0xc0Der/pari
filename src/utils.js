import { zeroOrMore, sequence, char, or } from './core.js';

export const between = (a, c) => b => sequence(a, b, c);

export const oneOrMore = p => sequence(p, zeroOrMore(p))
.map(state => {
    return { ...state, res: state.res.flat() };
});

export const separatedBy = a => b => sequence(b, zeroOrMore(sequence(a, b)))
.map(state => {
    return { ...state, res: state.res.flat(2)};
});

export const spaceArround = between(
    zeroOrMore(char('[ \n\t]')),
    zeroOrMore(char('[ \n\t]'))
);
