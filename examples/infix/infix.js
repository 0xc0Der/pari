import {
    Parser,
    char,
    firstOf,
    oneOrMore,
    zeroOrMore,
    sequence
} from '../../index.js';
import { State } from './state.js';

const whitespace = zeroOrMore(char(' '));

const digit = char('[0-9]').ok(state => state.withDigit());

const number = oneOrMore(digit).ok(state => state.withNumber());

const binary = char('[/*+-]').ok(state => state.withBinary());

const expr = number.ok(state => zeroOrMore(partExpr).process(state));

const subExpr = new Parser(outer =>
    sequence([
        char('\\(').ok(state => state.newContext()),
        expr,
        char('\\)')
            .error(state => state.withErrorMessage('closing ")"'))
            .ok(state => outer.popContext(state))
    ]).process(outer)
);

const partExpr = sequence([
    whitespace,
    binary,
    whitespace,
    firstOf([number, subExpr])
        .error(state => state.withErrorMessage('expr'))
]);

export const infix = input => expr.process(new State(input));
