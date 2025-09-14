export class Tree<T> {
  readonly value: T;
  next: Tree<T> | null = null;
  prev: Tree<T> | null = null;
  firstChild: Tree<T> | null = null;
  lastChild: Tree<T> | null = null;
  parent: Tree<T> | null = null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
    this.firstChild = null;
    this.lastChild = null;
    this.parent = null;
  }

  addChild(node: Tree<T>): Tree<T> {
    node.parent = this;

    if (!this.firstChild) {
      this.firstChild = node;
      this.lastChild = node;
    } else {
      if (!this.lastChild) {
        throw new Error("Last child must be set.");
      }

      node.prev = this.lastChild;
      this.lastChild.next = node;
      this.lastChild = node;
    }
    return node;
  }
}
