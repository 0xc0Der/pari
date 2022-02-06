export default class State {
    static OK = 1 << 0;
    static WARNING = 1 << 1;
    static ERROR = 1 << 2;

    #index;
    #input;
    #status;

    constructor(input = '', index = 0, status = State.OK) {
        this.#input = input;
        this.#index = index;
        this.#status = status;
    }

    get index() {
        return this.#index;
    }

    get status() {
        return this.#status;
    }

    get input() {
        return this.#input;
    }

    withStatus(status) {
        this.#status = status;

        return this;
    }

    withIndex(index) {
        this.#index = index;

        return this;
    }

    charAt(index) {
        return this.#input.charAt(index);
    }
}
