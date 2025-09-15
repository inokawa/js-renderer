interface LinkedNode<T> {
  prev: LinkedNode<T> | null;
  next: LinkedNode<T> | null;
}

class LinkedList<T extends LinkedNode<unknown>> {
  private _head: T | null = null;
  private _tail: T | null = null;
  private _length: number = 0;

  constructor(items?: Iterable<T>) {
    if (items) {
      for (const item of items) {
        this.push(item);
      }
    }
  }

  push(node: T) {
    node.prev = this._tail;
    node.next = null;

    if (this._tail) this._tail.next = node;
    this._tail = node;
    if (!this._head) this._head = node;

    this._length++;
  }

  get length(): number {
    return this._length;
  }

  get first(): T | null {
    return this._head;
  }

  get last(): T | null {
    return this._tail;
  }
}

export class TreeNode<T> implements LinkedNode<T> {
  readonly value: T;
  readonly children: LinkedList<TreeNode<T>>;
  parent: TreeNode<T> | null = null;
  prev: TreeNode<T> | null = null;
  next: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
    this.children = new LinkedList();
  }

  get firstChild(): TreeNode<T> | null {
    return this.children.first;
  }

  get lastChild(): TreeNode<T> | null {
    return this.children.last;
  }

  addChild(node: TreeNode<T>) {
    node.parent = this;

    this.children.push(node);
  }
}
