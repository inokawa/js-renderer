import { canvasPainter } from "./painter";
import { createRenderer } from "./renderer";
import { FixedView, Tree } from "./types";

const canvas = document.createElement("canvas");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;
canvas.setAttribute("style", "display: block");
document.body.appendChild(canvas);

const renderer = createRenderer(canvasPainter(canvas));

const a = new Tree<FixedView>({
  input: {},
  x: 70,
  y: 100,
  width: 50,
  height: 50,
  zIndex: 0,
  backgroundColor: "#ff00ff",
});

const b = new Tree<FixedView>({
  input: {},
  x: 100,
  y: 200,
  width: 100,
  height: 100,
  zIndex: 0,
  backgroundColor: "#00ffff",
});

a.addChild(b);

renderer.render(a);
