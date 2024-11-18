import { useCallback, useState } from 'react';

interface Props {
  draw?: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void;
}

const useCanvas = ({ draw }: Props) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const canvasRef = useCallback(
    (node: HTMLCanvasElement) => {
      if (node) {
        const ctx = node.getContext('2d');
        if (!ctx) return;

        const { width, height } = node.getBoundingClientRect();

        setWidth(width);
        setHeight(height);

        if (draw) {
          draw(node, ctx);
        }
      }
    },
    [draw]
  );

  return { canvasRef, width, height };
};

export default useCanvas;
