import { Painter } from "./painter";

export const createRenderer = (painter: Painter) => {
  return {
    render: () => {
      painter.draw();
    },
  };
};
