export class Parser {

    constructor(fn) {
        this.process = fn;
    }

    run(input) {
        return this.process({ input, err: false });
    }

    map(func, onErr = false) {
        return this.chain(new Parser(state => {
            return state.err ^ onErr ? state : {
                ...state,
                ...func(state)
            };
        }));
    }

    mapErr(func) {
        return this.map(func, true);
    }

    chain(parser) {
        return new Parser(state => {
            return parser.process(this.process(state));
        });
    }

}
