export class Expr {
    left;
    right;
    binary;

    constructor(left, right, binary) {
        this.left = left;
        this.right = right;
        this.binary = binary;
    }
}
