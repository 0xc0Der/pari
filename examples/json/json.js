import {
    ignoredChar,
    checkedChar,
    special,
    commaSeparated
} from './helpers.js';
import { Parser, sequence, firstOf } from '../../index.js';
import { string, whitespace } from './string.js';
import { number } from './number.js';
import { State } from './state.js';

const element = sequence([
    whitespace.ok(state => value.process(state)),
    whitespace
]);

const elements = firstOf([commaSeparated(element), whitespace]);

const member = sequence([
    whitespace,
    string.ok(state => state.withObjectKey()),
    whitespace,
    checkedChar(':'),
    element
]);

const members = firstOf([commaSeparated(member), whitespace]);

const object = new Parser(outer =>
    sequence([
        ignoredChar('\\{').ok(state => state.newContext({})),
        members,
        checkedChar('\\}').ok(state => outer.popContext(state))
    ]).process(outer)
);

const array = new Parser(outer =>
    sequence([
        ignoredChar('\\[').ok(state => state.newContext([])),
        elements,
        checkedChar('\\]').ok(state => outer.popContext(state))
    ]).process(outer)
);

const value = firstOf([
    number.ok(state => state.withValue()),
    string.ok(state => state.withValue()),
    array,
    object,
    special('true', true).ok(state => state.withValue()),
    special('false', false).ok(state => state.withValue()),
    special('null', null).ok(state => state.withValue())
]);

export const json = input => value.process(new State(input));
