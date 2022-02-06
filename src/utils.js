import { zeroOrMore, sequence, char, or } from './core.js';

const spaces = zeroOrMore(char('[ \t\n]'));

export const between = (b, a) => p => sequence(b, p, a);

export const oneOrMore = p =>
    sequence(p, zeroOrMore(p)).next(state => ({
        ...state,
        res: state.res.flat()
    }));

export const separatedBy = sep => p =>
    sequence(p, zeroOrMore(sequence(sep, p))).next(state => ({
        ...state,
        res: state.res.flat(2)
    }));

export const spaceArround = between(spaces, spaces);

export const spaceAfter = p => sequence(p, spaces);

export const spaceBefore = p => sequence(spaces, p);
