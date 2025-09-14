import { Painter } from "./painter";
import { FixedView, Node } from "./types";

interface QueueNode<T> {
  readonly data: T;
  prev: QueueNode<T> | null;
  next: QueueNode<T> | null;
}

class Queue<T> {
  private start: QueueNode<T> | null = null;
  private end: QueueNode<T> | null = null;
  private _size = 0;

  enqueue(value: T): void {
    const node: QueueNode<T> = {
      data: value,
      next: null,
      prev: null,
    };

    if (this.end) {
      this.end.next = node;
      node.prev = this.end;
    } else {
      this.start = node;
    }

    this.end = node;
    this._size++;
  }

  dequeue(): T | null {
    const node = this.start;
    if (!node) {
      return null;
    }

    if (node.next) {
      this.start = node.next;
    } else {
      this.start = null;
      this.end = null;
    }

    this._size--;
    return node.data;
  }

  dequeueFront(): T | null {
    const node = this.end;
    if (!node) {
      return null;
    }

    if (node.prev) {
      this.end = node.prev;
    } else {
      this.start = null;
      this.end = null;
    }

    this._size--;
    return node.data;
  }

  get size(): number {
    return this._size;
  }
}

export const createRenderer = (painter: Painter) => {
  return {
    size: (width: number, height: number, dpr: number) => {
      painter.size(width, height, dpr);
    },
    render: (root: Node) => {
      const list: FixedView[] = [];

      // Traverse the tree in DFS order to respect local order of
      // components (unlike in level order traversal that will be used
      // for resolving positions and sizes of elements of the tree).
      // This allows for zIndex to properly work.
      const queue = new Queue<Node>();
      queue.enqueue(root);

      while (queue.size) {
        const node = queue.dequeueFront();
        if (!node) {
          throw new Error("Node should exist.");
        }

        list.push(node.value);

        let p = node.lastChild;
        while (p) {
          if (!("text" in p.value.input) && p.value.input.display === "none") {
            p = p.prev;
            continue;
          }

          queue.enqueue(p);
          p = p.prev;
        }
      }

      // Respect zIndex.
      list.sort((a, b) => a.zIndex - b.zIndex);

      painter.draw(list);
    },
  };
};
