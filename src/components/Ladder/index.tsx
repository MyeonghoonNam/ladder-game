import { Fragment, useRef, useState } from 'react';
import { Modal, Button } from 'components';
import { useCanvas } from 'hooks';
import type { Ladder, LadderConnectedPoint, LadderSelectedInput } from 'models';
import { theme } from 'styles';

import * as Styled from './styled';

interface LadderProps {
  ladder: Ladder;
  playerCount: number;
  onStartGame: (players: string[], goals: string[]) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function Ladder({ ladder, playerCount, onStartGame, onPrev, onNext }: LadderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [selectedInput, setSelectedInput] = useState<LadderSelectedInput | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isGameProgress, setIsGameProgress] = useState(false);

  const { canvasRef, width, height } = useCanvas({
    draw: (canvas, ctx) => {
      const canvasRect = canvas.getBoundingClientRect();
      const connectedPointArray: LadderConnectedPoint[][] = Array.from(new Array(playerCount), () => []);
      const ladderHeight = ladder.length;

      ctx.clearRect(0, 0, canvasRect.width, canvasRect.height);

      ctx.strokeStyle = theme.colors.neutral60;
      ctx.lineWidth = 2;

      const verticalLineDraw = () => {
        for (let i = 0; i < inputRef.current.length / 2; i++) {
          const inputRect = inputRef.current[i].getBoundingClientRect();

          const startPos = {
            x: inputRect.x + inputRect.width / 2 - canvasRect.left,
            y: 0,
          };

          const endPos = {
            x: inputRect.x + inputRect.width / 2 - canvasRect.left,
            y: canvasRect.height,
          };

          ctx.beginPath();
          ctx.moveTo(startPos.x, startPos.y);
          ctx.lineTo(endPos.x, endPos.y);
          ctx.stroke();
          ctx.closePath();
        }
      };

      const footStoolLineDraw = () => {
        for (let i = 0; i < ladder.length; i++) {
          for (let j = 0; j < ladder[i].length; j++) {
            const footStool = ladder[i][j];

            if (footStool === '' || footStool === '|') continue;

            const connectedLeftVerticalLineIdx = Math.floor(j / 2);
            const connectedRightVerticalLineIdx = connectedLeftVerticalLineIdx + (j % 2);
            const leftInputRect = inputRef.current[connectedLeftVerticalLineIdx].getBoundingClientRect();
            const rightInputRect = inputRef.current[connectedRightVerticalLineIdx].getBoundingClientRect();

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
              leftPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.5;
              rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
              rightPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.5;
            }

            if (footStool === '/-/') {
              leftPos.x = leftInputRect.x + leftInputRect.width / 2 - canvasRect.left;
              leftPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.75;
              rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
              rightPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.15;
            }

            if (footStool === '\\-\\') {
              leftPos.x = leftInputRect.x + leftInputRect.width / 2 - canvasRect.left;
              leftPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.15;
              rightPos.x = rightInputRect.x + rightInputRect.width / 2 - canvasRect.left;
              rightPos.y = i * (canvasRect.height / ladderHeight) + (canvasRect.height / ladderHeight) * 0.75;
            }

            ctx.beginPath();
            ctx.moveTo(leftPos.x, leftPos.y);
            ctx.lineTo(rightPos.x, rightPos.y);
            ctx.stroke();
            ctx.closePath();

            connectedPointArray[connectedLeftVerticalLineIdx].push({
              coords: {
                x: leftPos.x,
                y: leftPos.y,
              },
              verticalLineIdx: connectedLeftVerticalLineIdx,
              connectedPointCoords: {
                x: rightPos.x,
                y: rightPos.y,
              },
              connectedPointVerticalLineIdx: connectedRightVerticalLineIdx,
            });

            connectedPointArray[connectedRightVerticalLineIdx].push({
              coords: {
                x: rightPos.x,
                y: rightPos.y,
              },
              verticalLineIdx: connectedRightVerticalLineIdx,
              connectedPointCoords: {
                x: leftPos.x,
                y: leftPos.y,
              },
              connectedPointVerticalLineIdx: connectedLeftVerticalLineIdx,
            });
          }
        }

        for (const lineIdx in connectedPointArray) {
          connectedPointArray[lineIdx].sort((a, b) => a.coords.y - b.coords.y);
        }
      };

      const selectedLinePathDraw = () => {
        if (selectedInput === null) return;

        const inputRect = inputRef.current[selectedInput.selectedInputIdx].getBoundingClientRect();
        const isDirTopToBottom = selectedInput.selectedInputIdx < playerCount;

        const startPointIdx = isDirTopToBottom ? 0 : connectedPointArray[selectedInput.selectedInputLineIdx].length - 1;
        const startPoint = connectedPointArray[selectedInput.selectedInputLineIdx][startPointIdx];

        const currentPoint = {
          x: inputRect.x + inputRect.width / 2 - canvasRect.left,
          y: isDirTopToBottom ? 0 : canvasRect.height,
        };

        let nextPoint: LadderConnectedPoint | null = startPoint ?? null;

        ctx.strokeStyle = theme.colors.red40;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (nextPoint === null) {
          ctx.beginPath();
          ctx.moveTo(currentPoint.x, currentPoint.y);
          ctx.lineTo(currentPoint.x, isDirTopToBottom ? canvasRect.height : 0);
          ctx.stroke();
          ctx.closePath();

          return;
        }

        while (nextPoint) {
          ctx.beginPath();
          ctx.moveTo(currentPoint.x, currentPoint.y);

          // vertical move
          ctx.lineTo(nextPoint.coords.x, nextPoint.coords.y);

          // horizontal and diagonal move
          ctx.lineTo(nextPoint.connectedPointCoords.x, nextPoint.connectedPointCoords.y);
          ctx.stroke();
          ctx.closePath();

          const lastContactPointIdx = isDirTopToBottom
            ? connectedPointArray[nextPoint.connectedPointVerticalLineIdx].length - 1
            : 0;

          const lastContactPoint = connectedPointArray[nextPoint.connectedPointVerticalLineIdx][lastContactPointIdx];

          if (
            lastContactPoint.coords.x === nextPoint.connectedPointCoords.x &&
            lastContactPoint.coords.y === nextPoint.connectedPointCoords.y
          ) {
            // final vertical move
            ctx.beginPath();
            ctx.moveTo(nextPoint.connectedPointCoords.x, nextPoint.connectedPointCoords.y);
            ctx.lineTo(lastContactPoint.coords.x, isDirTopToBottom ? canvasRect.height : 0);
            ctx.stroke();
            ctx.closePath();

            return;
          }

          const contactedPointIdx: number = connectedPointArray[nextPoint.connectedPointVerticalLineIdx].findIndex(
            (point) =>
              point.coords.x === nextPoint?.connectedPointCoords.x &&
              point.coords.y === nextPoint?.connectedPointCoords.y
          );

          currentPoint.x = nextPoint.connectedPointCoords.x;
          currentPoint.y = nextPoint.connectedPointCoords.y;

          const nextPointIdx: number = isDirTopToBottom ? contactedPointIdx + 1 : contactedPointIdx - 1;

          nextPoint =
            contactedPointIdx !== -1
              ? connectedPointArray[nextPoint.connectedPointVerticalLineIdx][nextPointIdx]
              : null;
        }
      };

      verticalLineDraw();
      footStoolLineDraw();

      if (selectedInput !== null) {
        selectedLinePathDraw();
      }
    },
  });

  const handleGameStartButtonClick = () => {
    if (isGameProgress && onNext) {
      onNext();
      return;
    }

    const hasEmptyInput = inputRef.current.some((el) => !el.value);

    if (hasEmptyInput) {
      setIsOpen(true);
      return;
    }

    setIsGameProgress(true);

    const inputValues = inputRef.current.map((el) => el.value);
    const players = inputValues.slice(0, playerCount);
    const goals = inputValues.slice(playerCount);

    onStartGame(players, goals);
  };

  const handleInputButtonClick = (selectedInputIdx: number) => {
    if (isGameProgress) {
      setSelectedInput({
        selectedInputLineIdx: selectedInputIdx % playerCount,
        selectedInputIdx,
      });
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
        <Button type="button" variant={'secondary'} size="large" onClick={onPrev}>
          취소
        </Button>
        <Button type="button" size="large" onClick={handleGameStartButtonClick}>
          {isGameProgress ? '확인' : '시작'}
        </Button>
      </Styled.Controller>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>빈 칸을 모두 채워주세요.</p>
      </Modal>
    </Styled.Container>
  );
}
