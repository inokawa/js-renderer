export interface Painter {
  draw: () => void;
}

export const canvasPainter = (
  canvas: HTMLCanvasElement,
  options: { bgColor?: string } = {}
): Painter => {
  const ctx = canvas.getContext("2d")!;

  const bgColor = options.bgColor ?? "#000000";

  return {
    draw: () => {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
  };
};
