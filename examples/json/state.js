import { State as Base } from '../../index.js';

export class State extends Base {
    errorMessages = [];
    position = { lineNumber: 1, lineStart: 0 };
    context;
    result = '';

    clone(context = false) {
        const newState = new State(this.input, this.index, this.status);

        if (!context) newState.context = this.context;

        newState.result = this.result;
        newState.position = this.position;
        newState.errorMessages = this.errorMessages;

        return newState;
    }

    getRelativePosition() {
        return {
            line: this.position.lineNumber,
            column: this.index - this.position.lineStart
        };
    }

    getErrorMessages() {
        return this.errorMessages.map(
            msg =>
                `expected (${msg.expected}) at ${msg.index} got (${msg.char})`
        );
    }

    withExpected(expected) {
        this.errorMessages.push({
            expected,
            index: this.index,
            char: this.charAt(this.index)
        });

        return this;
    }

    withResult(result) {
        this.result = result;

        return this;
    }

    withAppendedStringResult(string) {
        this.result += string;

        return this;
    }

    withUpdatedPosition(newLineStart) {
        this.position.lineNumber += 1;
        this.position.lineStart = newLineStart;

        return this;
    }

    withValue() {
        if (Array.isArray(this.context)) {
            this.context.push(this.result);
        } else {
            this.context[Object.entries(this.context).at(-1)[0]] = this.result;
        }

        this.result = '';

        return this;
    }

    withObjectKey() {
        this.context[this.result] = undefined;

        this.result = '';

        return this;
    }

    newContext(context) {
        const n = this.clone(true);

        n.context = context;

        return n;
    }

    popContext(state) {
        if (Array.isArray(this.context)) {
            this.context.push(state.context);
            state.context = this.context;
        } else if (this.context) {
            const lastkey = Object.entries(this.context).at(-1)[0];

            this.context[lastkey] = state.context;
            state.context = this.context;
        }

        return state;
    }
}
