import {
    ignoredChar,
    checkedChar,
    appendedChar,
    getWhitespaceCharCode
} from './helpers.js';
import { zeroOrMore, firstOf, sequence } from '../../index.js';

const newLine = ignoredChar('\\x0a').ok(state =>
    state.withUpdatedPosition(state.index)
);

export const whitespace = zeroOrMore(
    firstOf([newLine, ignoredChar('[\\x20\\x0d\\x09]')])
);

const stringWhiteSpace = ignoredChar('[/"\\\\bnfrt]')
    .ok(state => {
        const result = getWhitespaceCharCode(state.charAt(state.index - 1));

        return state.withAppendedStringResult('00' + result);
    })
    .error(state => state.withExpected('whitespace'));

const hex = appendedChar('[0-9a-fA-F]').error(state =>
    state.withExpected('hex')
);

const hexCharCode = sequence([ignoredChar('u'), hex, hex, hex, hex]);

const escapeSequence = firstOf([hexCharCode, stringWhiteSpace]).ok(state => {
    const charCode = '0x' + state.result.slice(-4);
    const string = state.result.slice(0, -4);

    return state.withResult(string + String.fromCharCode(charCode));
});

const character = firstOf([
    appendedChar('[^\\x00-\\x1f\\x7f\\"\\\\]'),
    sequence([ignoredChar('\\\\'), escapeSequence])
]);

const characters = zeroOrMore(character);

export const string = sequence([
    ignoredChar('"'),
    characters,
    checkedChar('"')
]);
