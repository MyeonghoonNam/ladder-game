import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Button, Spacing } from 'components';

import * as Styled from './styled';

interface PlayerCountProps {
  count: number;
  onDecrementButtonClick: () => void;
  onIncrementButtonClick: () => void;
  onConfirmButtonClick: () => void;
}

export default function PlayerCounter({
  count,
  onDecrementButtonClick,
  onIncrementButtonClick,
  onConfirmButtonClick,
}: PlayerCountProps) {
  return (
    <Styled.Container>
      <Styled.Header>
        <p>출발지 수를 선택하세요.</p>
        <p>※ 최대 10개까지 선택 가능합니다.</p>
      </Styled.Header>

      <Spacing size="medium" />

      <Styled.CounterContainer>
        <Button type="button" size="medium" onClick={onDecrementButtonClick} disabled={count <= 2}>
          <FaMinus />
        </Button>

        <Styled.Counter>{count}</Styled.Counter>

        <Button type="button" size="medium" disabled={count >= 10} onClick={onIncrementButtonClick}>
          <FaPlus />
        </Button>
      </Styled.CounterContainer>

      <Spacing size="medium" />

      <Button type="button" size="large" onClick={onConfirmButtonClick}>
        확인
      </Button>
    </Styled.Container>
  );
}
