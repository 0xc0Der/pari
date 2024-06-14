import { sequence, zeroOrMore, char as ignoredChar } from '../../index.js';

export const checkedChar = ch =>
    ignoredChar(ch).error(state => state.withExpected(ch));

export const appendedChar = ch =>
    ignoredChar(ch).ok(state =>
        state.withAppendedStringResult(state.charAt(state.index - 1))
    );

export const getWhitespaceCharCode = ch => {
    const codes = ['2f', '22', '5c', '08', '0a', '0c', '0d', '09'];
    const index = '/"\\bnfrt'.indexOf(ch);

    return codes[index];
};

export const matchString = string => {
    const chars = string.split('');
    const parsers = chars.map((ch, idx) =>
        idx > 0 ? checkedChar(ch, string) : ignoredChar(ch)
    );

    return sequence(parsers);
};

export const special = (string, replacement) =>
    matchString(string).ok(state => state.withResult(replacement));

export const commaSeparated = parser =>
    parser.ok(state =>
        zeroOrMore(sequence([ignoredChar(','), parser])).process(state)
    );

export { ignoredChar };
