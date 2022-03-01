# pari

A simple parser combinator.

## usage

```js
import { char, zeroOrMore } from 'pari';

// char takes a Regex that matches one character.
const charResult = char('[a-z]').run('s');

// parsers take other parsers as arguments
const zomResult = zeroOrMore(char('[a-z]')).run('string');
```

## available parsers

```js
import {
  char,
  zeroOrMore,
  oneOrMore,
  zeroOrOne,
  sequence,
  separatedBy,
  between,
  spaceArround,
  spaceBefore,
  spaceAfter,
  lazy
} from 'pari';
```

## define a parser

```js
import { Parser } from 'pari';

const myParser = new Parser(state => {
  // do something with state
  return newState;
});

const newParser = myParser.chain(anotherParser); // chain another parser.

const newParser = myParser
  .next(state => {
    // do extra operations on the result.
    return newState;
  })
  .error(state => {
    // called on error.
    return newState;
  });
```
