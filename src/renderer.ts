import type { LayoutNode } from "./jsx-runtime";
import { Drawer } from "./drawer";
import { Draw } from "./types";
import { LinkedList, LinkedNode } from "./data";

interface QueueNode<T> extends LinkedNode<T> {
  readonly value: T;
}

class Queue<T> {
  private readonly list = new LinkedList<QueueNode<T>>();

  push(value: T): void {
    this.list.push({
      value,
      next: null,
      prev: null,
    });
  }

  pop(): T | undefined {
    return this.list.pop()?.value;
  }

  shift(): T | undefined {
    return this.list.shift()?.value;
  }

  get length(): number {
    return this.list.length;
  }
}

export const createRenderer = (drawer: Drawer) => {
  return {
    size: (width: number, height: number, dpr: number) => {
      drawer.size(width, height, dpr);
    },
    render: (root: LayoutNode) => {
      const list: Draw[] = [];

      // Traverse the tree in DFS order to respect local order of
      // components (unlike in level order traversal that will be used
      // for resolving positions and sizes of elements of the tree).
      // This allows for zIndex to properly work.
      const queue = new Queue<LayoutNode>();
      queue.push(root);

      while (queue.length) {
        const node = queue.shift();
        if (!node) {
          throw new Error("Node should exist.");
        }

        const style = node.value;
        list.push(
          "text" in style
            ? {
                x: style.left ?? 0,
                y: style.top ?? 0,
                width: style.width ?? 0,
                height: style.height ?? 0,
                zIndex: style.zIndex ?? 0,
                text: style.text,
                fontSize: style.fontSize ?? 14,
                color: style.color ?? "#fff",
              }
            : {
                x: style.left ?? 0,
                y: style.top ?? 0,
                width: style.width ?? 0,
                height: style.height ?? 0,
                zIndex: style.zIndex ?? 0,
                backgroundColor: style.backgroundColor ?? "transparent",
              }
        );

        let p = node.lastChild;
        while (p) {
          if (p.value.display === "none") {
            p = p.prev;
            continue;
          }

          queue.push(p);
          p = p.prev;
        }
      }

      // Respect zIndex.
      list.sort((a, b) => a.zIndex - b.zIndex);

      drawer.draw(list);
    },
  };
};
