import { Tree } from "./data";
import { Style, TextStyle, ViewLayout, TextLayout } from "./types";

export type LayoutNode = Tree<ViewLayout> | Tree<TextLayout>;

type Children = LayoutNode | LayoutNode[];

interface Elements {
  view: { children?: Children; style?: Style };
  text: { children: string; style?: TextStyle };
}

export namespace JSX {
  export interface ElementChildrenAttribute {
    children: unknown;
  }

  export type Element = LayoutNode;

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
): LayoutNode => {
  switch (type) {
    case "view": {
      const { children, style = {} } = props as Elements["view"];
      const t = new Tree<ViewLayout>(style);

      if (children) {
        for (const c of flatten(children)) {
          t.addChild(c);
        }
      }

      return t;
    }
    case "text": {
      const { children: text, style = {} } = props as Elements["text"];
      return new Tree<TextLayout>({ ...style, text });
    }
    default: {
      throw new Error(`${type} is unimplemented`);
    }
  }
};

export { jsx, jsx as jsxs, Fragment };
