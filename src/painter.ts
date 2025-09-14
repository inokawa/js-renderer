import { FixedView } from "./types";

export interface Painter {
  size: (width: number, height: number, dpr: number) => void;
  draw: (views: readonly FixedView[]) => void;
}

export const canvasPainter = (
  canvas: HTMLCanvasElement,
  options: { bgColor?: string } = {}
): Painter => {
  const ctx = canvas.getContext("2d")!;

  const bgColor = options.bgColor ?? "#000000";

  return {
    size: (width, height, dpr) => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    },
    draw: (views) => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const view of views) {
        if ("text" in view.input) {
          ctx.font = view.input.fontSize + "px sans-serif";
          ctx.fillStyle = view.input.color;
          // Because by default in Canvas API Y is the baseline of the
          // text, we need to calculate the height of the text and then
          // offset it by that amount.
          const metrics = ctx.measureText(view.input.text);
          const height =
            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

          ctx.fillText(view.input.text, view.x, view.y + height);
        } else if (view.backgroundColor !== "transparent") {
          ctx.fillStyle = view.backgroundColor;
          ctx.fillRect(view.x, view.y, view.width, view.height);
        }
      }
    },
  };
};
