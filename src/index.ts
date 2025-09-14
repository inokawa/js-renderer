import { canvasPainter } from "./painter";
import { createRenderer } from "./renderer";

const canvas = document.createElement("canvas");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.setAttribute("style", "display: block");
document.body.appendChild(canvas);

const renderer = createRenderer(canvasPainter(canvas));

renderer.render();
