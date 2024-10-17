import { Fragment, useRef } from 'react';

import * as Styled from './styled';

interface LadderProps {
  playerCount: number;
}

const Ladder = ({ playerCount }: LadderProps) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleGameStartButtonClick = () => {
    for (let input of inputRef.current) {
      console.log(input?.value);
    }
  };

  return (
    <Styled.Container playerCount={playerCount}>
      {new Array(playerCount * 2).fill(0).map((_, idx) => (
        <Fragment key={`id_${idx}`}>
          <input
            type="text"
            ref={(el) => (inputRef.current[idx] = el)}
            placeholder={`${idx < playerCount ? 'Player' : 'Goal'} ${(idx % playerCount) + 1}`}
          />
          {idx === playerCount - 1 && <div className="ladder">Ladder</div>}
        </Fragment>
      ))}

      <div className="controller">
        <button type="button">취소</button>
        <button type="button" onClick={handleGameStartButtonClick}>
          시작
        </button>
      </div>
    </Styled.Container>
  );
};

export default Ladder;
