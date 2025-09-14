import { Draw } from "../types";

export interface Painter {
  size: (width: number, height: number, dpr: number) => void;
  measureText: (
    text: string,
    font: string
  ) => { width: number; height: number };
  draw: (views: readonly Draw[]) => void;
}
