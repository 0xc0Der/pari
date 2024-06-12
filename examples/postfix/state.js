import { State as Base } from '../../index.js';
import { Expr } from './expr.js';

export class State extends Base {
    errorMessage = {};
    stack = [];
    tmpstr = '';

    clone() {
        const newState = new State(this.input, this.index, this.status);

        newState.tmpstr = this.tmpstr;
        newState.stack = this.stack;
        newState.errorMessage = this.errorMessage;

        return newState;
    }

    withErrorMessage() {
        Object.assign(this.errorMessage, {
            index: this.index,
            char: this.charAt(this.index)
        });

        return this;
    }

    withNumber() {
        this.stack.push(this.tmpstr);
        this.tmpstr = '';

        return this;
    }

    withDigit() {
        this.tmpstr += this.charAt(this.index - 1);

        return this;
    }

    withBinary() {
        if (this.stack.length > 1) {
            const binary = this.charAt(this.index - 1);
            const [left, right] = this.stack.splice(-2, 2);

            this.stack.push(new Expr(left, right, binary));

            return this;
        }

        return this.withStatus(State.ERROR).withIndex(this.index - 1);
    }

    getErrorString() {
        if (this.status === State.OK) return 'no error';
        else if (this.errorMessage.char)
            return (
                `unexpected (${this.errorMessage.char}) at ` +
                this.errorMessage.index
            );
        else return 'expected (binary) at ' + this.errorMessage.index;
    }
}
