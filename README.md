# pari

A simple parser combinator.

## usage

```js

import { char, zeroOrMore } from 'pari';

// char takes a Regex that matches one character.
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

// parser has three methods

someParser.chain(anotherParser); // chain another parser.

someParser.map(state => {
  // do extra operations on the result.
  return newState;
});

someParser.mapErr(state => {
  // same as `map` but on error.
  return newState;
});

```
