import { useRef } from 'react';

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
    <Styled.Container>
      {new Array(playerCount * 2).fill(0).map((_, idx) => (
        <>
          <input
            key={`id_${idx}`}
            type="text"
            ref={(el) => (inputRef.current[idx] = el)}
            placeholder={`${idx < playerCount ? 'Player' : 'Goal'} ${(idx % playerCount) + 1}`}
          />
          {idx === playerCount - 1 && <div>Ladder</div>}
        </>
      ))}
      <div>
        <button type="button" onClick={handleGameStartButtonClick}>
          시작
        </button>
      </div>
    </Styled.Container>
  );
};

export default Ladder;
