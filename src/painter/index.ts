import { FixedView } from "../types";

export interface Painter {
  size: (width: number, height: number, dpr: number) => void;
  draw: (views: readonly FixedView[]) => void;
}
