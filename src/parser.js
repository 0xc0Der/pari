export default class Parser {
    constructor(fn) {
        this.process = fn;
    }

    run(input) {
        return this.process({ input, err: false });
    }

    chain(parser) {
        return new Parser(state => {
            return parser.process(this.process(state));
        });
    }

    #next(fn, onErr) {
        return this.chain(
            new Parser(state => {
                return state.err ^ onErr ? state : fn(state);
            })
        );
    }

    next(fn) {
        return this.#next(fn, false);
    }

    error(fn) {
        return this.#next(fn, true);
    }
}
