import { zeroOrMore, sequence, char, or } from './core.js';

const spaces = zeroOrMore(char('[ \t\n]'));

export const between = (a, c) => b => sequence(a, b, c);

export const oneOrMore = p => sequence(p, zeroOrMore(p))
.map(state => {
    return { ...state, res: state.res.flat() };
});

export const separatedBy = a => b => sequence(b, zeroOrMore(sequence(a, b)))
.map(state => {
    return { ...state, res: state.res.flat(2) };
});

export const spaceArround = between(spaces, spaces);

export const spaceAfrer = a => sequence(a, spaces);

export const spaceBefore = a => sequence(spaces, a);
