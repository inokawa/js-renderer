import { Draw } from "../types";

export interface Drawer {
  measureText: (
    text: string,
    font: string
  ) => { width: number; height: number };
  draw: (
    views: readonly Draw[],
    width: number,
    height: number,
    dpr: number,
    bgColor: string
  ) => void;
}
