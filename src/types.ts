export interface ViewStyle {
  width?: number | `${number}%` | undefined;
  height?: number | `${number}%` | undefined;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  alignSelf?: "flex-start" | "center" | "flex-end" | "stretch";
  flex?: number;
  position?: "absolute" | "relative";
  gap?: number;
  zIndex?: number;
  display?: "flex" | "none";
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  padding?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  // The only value not related to layout.
  backgroundColor?: string;
}

export interface TextStyle {
  text: string;
  fontSize: number;
  color: string;
}

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

export interface FixedView {
  input: ViewStyle | TextStyle;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  backgroundColor: string;
}
