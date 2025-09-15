import { canvasDrawer } from "./drawer/canvas";
import { createRenderer } from "./renderer";

window.addEventListener("error", (e) => {
  alert(e.message);
});

const canvas = document.createElement("canvas");

canvas.setAttribute("style", "display: block");

const renderer = createRenderer(canvasDrawer(canvas));

const setSize = () => {
  const dpr = window.devicePixelRatio;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  renderer.size(width, height, dpr);
};
setSize();

document.body.appendChild(canvas);

const render = () => {
  renderer.render(
    <view
      style={{
        left: 70,
        top: 100,
        width: 50,
        height: 50,
        zIndex: 0,
        backgroundColor: "#ff00ff",
      }}
    >
      <view
        style={{
          left: 100,
          top: 200,
          width: 100,
          height: 100,
          zIndex: 0,
          backgroundColor: "#00ffff",
        }}
      />
    </view>
  );
};

render();

window.addEventListener("resize", () => {
  setSize();
  render();
});
