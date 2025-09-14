import { Tree } from "./data";
import { ViewStyle, TextStyle } from "./types";

export type Node = Tree<ViewStyle> | Tree<TextStyle & { text: string }>;

type Children = Node | Node[];

interface Elements {
  view: { children?: Children; style?: ViewStyle };
  text: { children: string; style?: TextStyle };
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
      const { children, style = {} } = props as Elements["view"];
      const t = new Tree<ViewStyle>(style);

      if (children) {
        for (const c of flatten(children)) {
          t.addChild(c);
        }
      }

      return t;
    }
    case "text": {
      const { children: text, style = {} } = props as Elements["text"];
      return new Tree<TextStyle & { text: string }>({ ...style, text });
    }
    default: {
      throw new Error(`${type} is unimplemented`);
    }
  }
};

export { jsx, jsx as jsxs, Fragment };
