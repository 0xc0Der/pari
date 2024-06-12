import { char, sequence, firstOf, oneOrMore } from '../../index.js';
import { State } from './state.js';

const whitespace = oneOrMore(char(' '));

const digit = char('[0-9]').ok(state => state.withDigit());

const binary = char('[/*+-]')
    .ok(state => state.withBinary())
    .error(state => state.withErrorMessage());

const number = oneOrMore(digit).ok(state => state.withNumber());

const numbers = oneOrMore(firstOf([whitespace, number]));

const binaries = oneOrMore(firstOf([whitespace, binary]));

const post = oneOrMore(sequence([numbers, binaries]))
    .ok(state => {
        const { stack, errorMessage } = state;

        if (stack.length !== 1 || errorMessage.char)
            return state.withStatus(State.ERROR);

        return state;
    })
    .error(state => {
        const { stack, errorMessage } = state;

        if (!errorMessage.char && stack.length === 1)
            return state.withStatus(State.OK);

        return state;
    });

export const postfix = input => post.process(new State(input));
