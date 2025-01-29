import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Button } from 'components';

import * as Styled from './styled';

interface PlayerCountProps {
  count: number;
  onDecrementButtonClick: () => void;
  onIncrementButtonClick: () => void;
}

const PlayerCounter = ({ count, onDecrementButtonClick, onIncrementButtonClick }: PlayerCountProps) => {
  return (
    <Styled.Container>
      <Button type="button" size="medium" onClick={onDecrementButtonClick} disabled={count <= 2}>
        <FaMinus />
      </Button>

      <Styled.Counter>{count}</Styled.Counter>

      <Button type="button" size="medium" disabled={count >= 10} onClick={onIncrementButtonClick}>
        <FaPlus />
      </Button>
    </Styled.Container>
  );
};

export default PlayerCounter;
