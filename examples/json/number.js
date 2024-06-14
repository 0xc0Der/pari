import { oneOrMore, zeroOrOne, firstOf, sequence } from '../../index.js';
import { appendedChar } from './helpers.js';

const onenine = appendedChar('[1-9]');

const digit = appendedChar('[0-9]');

const digits = oneOrMore(digit);

const checkedDigits = oneOrMore(digit).error(state =>
    state.withExpected('digit')
);

const natural = firstOf([sequence([onenine, digits]), digit]);

const integer = sequence([zeroOrOne(appendedChar('-')), natural]);

const fraction = zeroOrOne(sequence([appendedChar('\\.'), checkedDigits]));

const exponent = zeroOrOne(
    sequence([
        appendedChar('[Ee]'),
        zeroOrOne(appendedChar('[+-]')),
        checkedDigits
    ])
);

export const number = sequence([integer, fraction, exponent]).ok(state =>
    state.withResult(Number.parseFloat(state.result))
);
