# pari

More than a simple parser combinator.

## install with `npm`.

```bash
npm i pari
```

## usage and basic parsers

you can read the source in `src/`. it's self documenting and easy to read.

here is a **simple** overview.

```js
import {
  char,
  firstOf,
  sequence,
  zeroOrOne,
  oneOrMore,
  zeroOrMore
} from 'pari';

// the `char` parser matches one char.
// it take a `regex` that matches exactly one char.

const digit = char('[0-9]');

// `firstOf` parser returns the first match in a list of parsers.

const lowerCase = char('[a-z]');
const digitOrLwcase = firstOf([digit, lowerCase]);

// `sequence` parser matches a list of parsers in sequence.

const hex = char('[0-9a-fA-F]');
const byteHex = sequence([char('0'), char('x'), hex, hex]);

// `zeroOrOne`, `zeroOrMore` and `oneOrMore` works as you expect
// ?, * and + to work in regular expressions, but with parsers.

const integer = sequence([
  zeroOrOne(char['+-']),
  char('[1-9]'),
  zeroOrMore(digit)
]);

const word = oneOrMore(lowerCase);
```

## the `State` of the parser.

```js
// TODO: for now see `examples/*/state.js`
```

```js
// to process input using a parser. call `process` with a starting `state`.

import { State } from 'pari';

const state = new State(input);
const resultState = parser.process(state);
```

see `examples/` for indepth examples to learn more about using `pari`.

## define a custom parser

```js
import { Parser } from 'pari';

// A parser composed of others might not be enough.
// for more complicated tasks, you can define a custom parser.

const myParser = new Parser(state => {
  // do something with state
  return state;
});
```

## handelling the resulting `state` based on the parsing status.

```js
const newParser = myParser
  .ok(state => {
    // do extra operations on the state.
    return state;
  })
  .error(state => {
    // do extra operations on the state.
    return state;
  });
```
