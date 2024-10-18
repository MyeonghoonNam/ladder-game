import { Fragment, useRef } from 'react';
import { useCanvas } from 'hooks';

import * as Styled from './styled';

interface LadderProps {
  playerCount: number;
  onCancle?: () => void;
}

const Ladder = ({ playerCount, onCancle }: LadderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement[]>([]);

  const { canvasRef, width, height } = useCanvas({
    draw: (canvas, ctx) => {
      const canvasRect = canvas.getBoundingClientRect();

      for (let i = 0; i < inputRef.current.length / 2; i++) {
        const inputRect = inputRef.current[i].getBoundingClientRect();
        const startPos = {
          x: inputRect.x + inputRect.width / 2 - canvasRect.left,
          y: 0,
        };
        const endPos = {
          x: inputRect.x + inputRect.width / 2 - canvasRect.left,
          y: canvas.height,
        };

        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
        ctx.closePath();
      }
    },
  });

  return (
    <Styled.Container ref={containerRef} playerCount={playerCount}>
      {new Array(playerCount * 2).fill(0).map((_, idx) => (
        <Fragment key={`id_${idx}`}>
          <Styled.Input
            type="text"
            ref={(el) => el && (inputRef.current[idx] = el)}
            placeholder={`${idx < playerCount ? 'Player' : 'Goal'} ${(idx % playerCount) + 1}`}
          />

          {idx === playerCount - 1 && (
            <Styled.Ladder ref={canvasRef} width={width} height={height} playerCount={playerCount} />
          )}
        </Fragment>
      ))}

      <Styled.Controller playerCount={playerCount}>
        <button type="button" onClick={onCancle}>
          취소
        </button>
        <button type="button">시작</button>
      </Styled.Controller>
    </Styled.Container>
  );
};

export default Ladder;
