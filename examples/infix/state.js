import { State as Base } from '../../index.js';
import { Expr } from './expr.js';

const prec = binary =>
    '+-'.includes(binary) ? 2 : '/*'.includes(binary) ? 1 : 0;

const applyPrec = (left, right, binary) => {
    if (prec(binary) < prec(left.binary)) {
        return new Expr(
            left.left,
            new Expr(left.right, right, binary),
            left.binary
        );
    } else {
        return new Expr(left, right, binary);
    }
};

export class State extends Base {
    result = '';
    context = [];
    errorMessages = [];

    clone(context = false) {
        const state = new State(this.input, this.index, this.status);

        state.result = this.result;
        state.errorMessages = this.errorMessages;

        if (!context) state.context = this.context;

        return state;
    }

    withErrorMessage(expected) {
        this.errorMessages.push({
            expected,
            index: this.index,
            char: this.charAt(this.index)
        });

        return this;
    }

    withDigit() {
        this.result += this.charAt(this.index - 1);

        return this;
    }

    withNumber() {
        const binary = this.context.pop();
        const left = this.context.pop();

        if (binary && left) {
            this.context.push(applyPrec(left, this.result, binary));
        } else {
            this.context.push(this.result);
        }

        this.result = '';

        return this;
    }

    withBinary() {
        this.context.push(this.charAt(this.index - 1));

        return this;
    }

    newContext() {
        return this.clone(true);
    }

    popContext(state) {
        const binary = this.context.pop();
        const left = this.context.pop();

        this.context.push(applyPrec(left, state.context[0], binary));
        state.context = this.context;

        return state;
    }

    getErrorString() {
        return this.errorMessages.map(message =>
            `expected ${message.expected} at ${message.index} but got ${message.char || 'EOI'}.`
        );
    }

    getTree() {
        return this.context[0];
    }
}
