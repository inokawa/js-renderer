import { createNode, FixedView, Node } from "./types";

type Children = Node | Node[];

interface Elements {
  view: Omit<FixedView, "input"> & { children?: Children };
  text: Omit<FixedView, "input">;
}

export namespace JSX {
  export interface ElementChildrenAttribute {
    children: unknown;
  }

  export type Element = Node;

  export type IntrinsicElements = Elements;
}

const flatten = <T>(o: T | T[]): T[] => {
  return Array.isArray(o) ? o : [o];
};

const Fragment = "fragment";

const jsx = <T extends keyof Elements | typeof Fragment>(
  type: T,
  props: unknown,
  _key: unknown
): Node => {
  switch (type) {
    case "view": {
      const { children, ...rest } = props as Elements["view"];
      const t = createNode(rest);

      if (children) {
        for (const c of flatten(children)) {
          t.addChild(c);
        }
      }

      return t;
    }
    default: {
      throw new Error(`${type} is unimplemented`);
    }
  }
};

export { jsx, jsx as jsxs, Fragment };
