import { Drawer } from ".";

export const canvasDrawer = (
  canvas: HTMLCanvasElement,
  options: { bgColor?: string } = {}
): Drawer => {
  const ctx = canvas.getContext("2d")!;

  const bgColor = options.bgColor ?? "#000000";

  const measureText = (
    text: string,
    font: string
  ): { width: number; height: number } => {
    ctx.font = font;
    const metrics = ctx.measureText(text);

    return {
      width: metrics.width,
      height:
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent,
    };
  };

  return {
    size: (width, height, dpr) => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    },
    measureText,
    draw: (views) => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const view of views) {
        if ("text" in view) {
          const font = view.fontSize + "px sans-serif";
          // Because by default in Canvas API Y is the baseline of the
          // text, we need to calculate the height of the text and then
          // offset it by that amount.
          const { height } = measureText(view.text, font);
          ctx.font = font;
          ctx.fillStyle = view.color;
          ctx.fillText(view.text, view.x, view.y + height);
        } else if (view.backgroundColor !== "transparent") {
          ctx.fillStyle = view.backgroundColor;
          ctx.fillRect(view.x, view.y, view.width, view.height);
        }
      }
    },
  };
};
