import { Drawer } from "./drawer";
import { Draw, InputNode } from "./types";
import { LinkedList, LinkedNode } from "./data";
import { invariant } from "./utils";

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
  let disposed = false;
  let nextRoot: InputNode | undefined;
  let _width: number;
  let _height: number;
  let _dpr: number;
  const _bgColor: string = "#000000";

  const render = (root: InputNode) => {
    invariant(_width != null, "width is not initialized");
    invariant(_height != null, "height is not initialized");
    invariant(_dpr != null, "dpr is not initialized");

    const list: Draw[] = [];

    // Traverse the tree in DFS order to respect local order of
    // components (unlike in level order traversal that will be used
    // for resolving positions and sizes of elements of the tree).
    // This allows for zIndex to properly work.
    const queue = new Queue<InputNode>();
    queue.push(root);

    let node: InputNode | undefined;
    while ((node = queue.shift())) {
      const value = node.value;
      if ("text" in value) {
        const { text, style } = value;
        list.push({
          x: style.left ?? 0,
          y: style.top ?? 0,
          width: style.width ?? 0,
          height: style.height ?? 0,
          zIndex: style.zIndex ?? 0,
          text: text,
          fontSize: style.fontSize ?? 14,
          color: style.color ?? "#fff",
        });
      } else {
        const { style } = value;
        list.push({
          x: style.left ?? 0,
          y: style.top ?? 0,
          width: style.width ?? 0,
          height: style.height ?? 0,
          zIndex: style.zIndex ?? 0,
          backgroundColor: style.backgroundColor ?? "transparent",
        });
      }

      let p = node.lastChild;
      while (p) {
        if (p.value.style.display === "none") {
          p = p.prev;
          continue;
        }

        queue.push(p);
        p = p.prev;
      }
    }

    // Respect zIndex.
    list.sort((a, b) => a.zIndex - b.zIndex);

    drawer.draw(list, _width, _height, _dpr, _bgColor);
  };

  const scheduleRender = () => {
    requestAnimationFrame(() => {
      const root = nextRoot;
      nextRoot = undefined;

      if (disposed || !root) return;
      render(root);
    });
  };

  return {
    size: (width: number, height: number, dpr: number) => {
      _width = width;
      _height = height;
      _dpr = dpr;
    },
    render: (root: InputNode) => {
      nextRoot = root;
      scheduleRender();
    },
    dispose: () => {
      disposed = true;
    },
  };
};
