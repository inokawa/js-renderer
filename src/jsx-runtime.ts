import { TreeNode } from "./data";
import { Style, TextStyle, ViewInput, TextInput, InputNode } from "./types";

type Children = InputNode | InputNode[];

interface Elements {
  view: { children?: Children; style?: Style };
  text: { children: string; style?: TextStyle };
}

export namespace JSX {
  export interface ElementChildrenAttribute {
    children: unknown;
  }

  export type Element = InputNode;

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
): InputNode => {
  switch (type) {
    case "view": {
      const { children, style = {} } = props as Elements["view"];
      const t = new TreeNode<ViewInput>({ style });

      if (children) {
        for (const c of flatten(children)) {
          t.addChild(c);
        }
      }

      return t;
    }
    case "text": {
      const { children: text, style = {} } = props as Elements["text"];
      return new TreeNode<TextInput>({ style, text });
    }
    default: {
      throw new Error(`${type} is unimplemented`);
    }
  }
};

export { jsx, jsx as jsxs, Fragment };
