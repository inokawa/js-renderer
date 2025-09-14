import { FixedView, TextStyle, Tree, ViewStyle } from "./types";

export const jsx = <T extends "input" | "view">(
  _input: T,
  {
    style,
    ...props
  }: Omit<FixedView, "input"> &
    (T extends "input" ? { style: TextStyle } : { style?: ViewStyle }),
  children?: Tree<FixedView>[]
) => {
  const t = new Tree<FixedView>({
    input: style || {},
    ...props,
  });

  if (children) {
    children.forEach((c) => {
      t.addChild(c);
    });
  }

  return t;
};
