# pari

A simple parser combinator.

## usage

```js
import { char, zeroOrMore } from 'pari';

const charResult = char('[a-z]').run('s');

// parsers may take other parsers as arguments

const zomResult = zeroOrMore(char('[a-z]')).run('string');

```

## available parsers

```js
import {
  char,
  zeroOrMore,
  sequence,
  oneOrMore,
  spaceArround,
  separatedBy,
  between,
  zeroOrOne,
  spaceBefore,
  spaceAfter,
  lazy
} from 'pari';

```

## define your parser

```js
import { Parser } from 'pari';

const myParser = new Parser(state => {
  // do something with state
  return newState;
});

// parser has two methods

Parser.chain(parser) // to chain another parser to it.
Parser.map(state => {})   // to do extra operations on the result.
Parser.mapErr(state => {}) // same as map but on error.

```
