import { Fragment, useRef, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { Modal } from 'components';
import { useCanvas } from 'hooks';
import { gameReducer, initialState } from 'reducers/game';

import * as Styled from './styled';

interface LadderProps {
  playerCount: number;
  onCancle?: () => void;
}

const Ladder = ({ playerCount, onCancle }: LadderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement[]>([]);

  const [ladder, dispatch] = useImmerReducer(gameReducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  const { canvasRef, width, height } = useCanvas({
    draw: (canvas, ctx) => {
      const canvasRect = canvas.getBoundingClientRect();

      for (let i = 0; i < inputRef.current.length / 2; i++) {
        const inputRect = inputRef.current[i].getBoundingClientRect();
        const leftPos = {
          x: inputRect.x + inputRect.width / 2 - canvasRect.left,
          y: 0,
        };
        const rightPos = {
          x: inputRect.x + inputRect.width / 2 - canvasRect.left,
          y: canvas.height,
        };

        ctx.beginPath();
        ctx.moveTo(leftPos.x, leftPos.y);
        ctx.lineTo(rightPos.x, rightPos.y);
        ctx.stroke();
        ctx.closePath();
      }

      for (let i = 0; i < ladder.length; i++) {
        for (let j = 0; j < ladder[i].length; j++) {
          const footStool = ladder[i][j];
          const leftInputRect = inputRef.current[j].getBoundingClientRect();
          const rightInputRect = inputRef.current[j + 1].getBoundingClientRect();

          const leftPos = {
            x: 0,
            y: 0,
          };

          const rightPos = {
            x: 0,
            y: 0,
          };

          if (footStool === '---') {
            leftPos.x = leftInputRect.x + leftInputRect.width / 2 - canvasRect.left;
            leftPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.5;
            rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
            rightPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.5;
          }

          if (footStool === '/-/') {
            leftPos.x = leftInputRect.x + leftInputRect.width / 2 - canvasRect.left;
            leftPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.75;
            rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
            rightPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.15;
          }

          if (footStool === '\\-\\') {
            leftPos.x = leftInputRect.x + leftInputRect.width / 2 - canvasRect.left;
            leftPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.15;
            rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
            rightPos.y = i * (canvasRect.height / 5) + (canvasRect.height / 5) * 0.75;
          }

          ctx.beginPath();
          ctx.moveTo(leftPos.x, leftPos.y);
          ctx.lineTo(rightPos.x, rightPos.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    },
    deps: [ladder],
  });

  const handleGameStartButtonClick = () => {
    const hasEmptyInput = inputRef.current.some((el) => !Boolean(el.value));

    if (hasEmptyInput) {
      setIsOpen(true);
      return;
    }

    dispatch({
      type: 'start_game',
      width: playerCount - 1,
      height: 5,
    });
  };

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
        <button type="button" onClick={handleGameStartButtonClick}>
          시작
        </button>
      </Styled.Controller>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>빈 칸을 모두 채워주세요.</p>
      </Modal>
    </Styled.Container>
  );
};

export default Ladder;
