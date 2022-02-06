import State from './state.js';

export default class Parser {
    constructor(process) {
        this.process = process;
    }

    chain(parser) {
        return new Parser(state => {
            return parser.process(this.process(state));
        });
    }

    next(fn, status) {
        return this.chain(
            new Parser(state => {
                return state.status & status ? fn(state) : state;
            })
        );
    }

    ok(fn) {
        return this.next(fn, State.OK);
    }

    nok(fn) {
        return this.next(fn, State.ERROR | State.WARNING);
    }

    warning(fn) {
        return this.next(fn, State.WARNING);
    }

    error(fn) {
        return this.next(fn, State.ERROR);
    }
}
