import { LadderGameResult } from 'models';
import { Button, Spacing } from 'components';

import * as Styled from './styled';

interface ResultProps {
  result: LadderGameResult[];
  onReset: () => void;
}

export default function Result({ result, onReset }: ResultProps) {
  return (
    <Styled.Container>
      <Styled.Title>게임 결과</Styled.Title>

      <Styled.List columnCount={result.length <= 5 ? 1 : 2}>
        {result.map(({ start, end }) => (
          <Styled.Item key={`result ${start} to ${end}`}>
            <Styled.StartPoint>{start}</Styled.StartPoint>
            <Styled.RightArrow />
            <Styled.EndPoint>{end}</Styled.EndPoint>
          </Styled.Item>
        ))}
      </Styled.List>

      <Spacing size="medium" />

      <Button type="button" variant={'secondary'} size="large" onClick={onReset}>
        초기화
      </Button>
    </Styled.Container>
  );
}
