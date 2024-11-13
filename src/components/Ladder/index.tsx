import { Fragment, useRef, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { Modal } from 'components';
import { useCanvas } from 'hooks';
import { gameReducer, initialState } from 'reducers/game';
import { type LadderContactPoint } from 'models';

import * as Styled from './styled';

interface LadderProps {
  playerCount: number;
  onCancle?: () => void;
}

export default function Ladder({ playerCount, onCancle }: LadderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [ladder, dispatch] = useImmerReducer(gameReducer, initialState);
  const [selectedLineIdx, setSelectedLineIdx] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameProgress, setIsGameProgress] = useState(false);

  const { canvasRef, width, height } = useCanvas({
    draw: (canvas, ctx) => {
      const canvasRect = canvas.getBoundingClientRect();
      const contactPointArray: LadderContactPoint[][] = Array.from(new Array(playerCount), () => []);

      ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;

      const verticalLineDraw = () => {
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
      };

      const footStoolLineDraw = () => {
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

            const currentVerticalLineIdx = j % playerCount;
            const contactedVerticalLineIdx = currentVerticalLineIdx + 1;

            if (footStool !== '') {
              contactPointArray[currentVerticalLineIdx].push({
                coords: {
                  x: leftPos.x,
                  y: leftPos.y,
                },
                verticalLineIdx: currentVerticalLineIdx,
                connectedPointCoords: {
                  x: rightPos.x,
                  y: rightPos.y,
                },
                contactedVerticalLineIdx,
              });

              contactPointArray[contactedVerticalLineIdx].push({
                coords: {
                  x: rightPos.x,
                  y: rightPos.y,
                },
                verticalLineIdx: contactedVerticalLineIdx,
                connectedPointCoords: {
                  x: leftPos.x,
                  y: leftPos.y,
                },
                contactedVerticalLineIdx: currentVerticalLineIdx,
              });
            }
          }
        }

        for (let lineIdx in contactPointArray) {
          contactPointArray[lineIdx].sort((a, b) => a.coords.y - b.coords.y);
        }
      };

      const selectedLinePathDraw = () => {
        if (selectedLineIdx === null) return;

        const rect = inputRef.current[selectedLineIdx].getBoundingClientRect();
        const currentPoint = {
          x: rect.x + rect.width / 2 - canvasRect.left,
          y: 0,
        };

        let nextPoint: LadderContactPoint | null = contactPointArray[selectedLineIdx][0] ?? null;

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (nextPoint === null) {
          ctx.beginPath();
          ctx.moveTo(currentPoint.x, currentPoint.y);
          ctx.lineTo(currentPoint.x, canvasRect.height);
          ctx.stroke();
          ctx.closePath();

          return;
        }

        while (nextPoint) {
          ctx.beginPath();
          ctx.moveTo(currentPoint.x, currentPoint.y);

          // 수직 이동
          ctx.lineTo(nextPoint.coords.x, nextPoint.coords.y);

          // 수평 및 대각 이동
          ctx.lineTo(nextPoint.connectedPointCoords.x, nextPoint.connectedPointCoords.y);
          ctx.stroke();
          ctx.closePath();

          const [lastContactPoint] = contactPointArray[nextPoint.contactedVerticalLineIdx].slice(-1);

          if (
            lastContactPoint.coords.x === nextPoint.connectedPointCoords.x &&
            lastContactPoint.coords.y === nextPoint.connectedPointCoords.y
          ) {
            // 최종 수직 이동
            ctx.beginPath();
            ctx.moveTo(nextPoint.connectedPointCoords.x, nextPoint.connectedPointCoords.y);
            ctx.lineTo(lastContactPoint.coords.x, canvasRect.height);
            ctx.stroke();
            ctx.closePath();

            return;
          }

          const nextPointIdx = contactPointArray[nextPoint.contactedVerticalLineIdx].findIndex(
            (point) =>
              point.coords.x === nextPoint?.connectedPointCoords.x &&
              point.coords.y === nextPoint?.connectedPointCoords.y
          );

          currentPoint.x = nextPoint.connectedPointCoords.x;
          currentPoint.y = nextPoint.connectedPointCoords.y;

          nextPoint =
            nextPointIdx !== -1 ? contactPointArray[nextPoint.contactedVerticalLineIdx][nextPointIdx + 1] : null;
        }
      };

      verticalLineDraw();
      footStoolLineDraw();

      if (selectedLineIdx !== null) {
        selectedLinePathDraw();
      }
    },
    deps: [ladder, selectedLineIdx],
  });

  const handleGameStartButtonClick = () => {
    const hasEmptyInput = inputRef.current.some((el) => !Boolean(el.value));

    if (hasEmptyInput) {
      setIsOpen(true);
      return;
    }

    setIsGameProgress(true);

    dispatch({
      type: 'start_game',
      width: playerCount - 1,
      height: 5,
    });
  };

  const handleInputButtonClick = (idx: number) => {
    if (isGameProgress) {
      setSelectedLineIdx(idx);
    }
  };

  return (
    <Styled.Container ref={containerRef} playerCount={playerCount}>
      {new Array(playerCount * 2).fill(0).map((_, idx) => (
        <Fragment key={`id_${idx}`}>
          <Styled.Input
            type="text"
            ref={(el) => el && (inputRef.current[idx] = el)}
            placeholder={`${idx < playerCount ? 'Player' : 'Goal'} ${(idx % playerCount) + 1}`}
            readOnly={isGameProgress}
            onClick={() => handleInputButtonClick(idx)}
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
}
