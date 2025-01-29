import { LadderGameResult } from 'models';
import * as Styled from './styled';

interface ResultProps {
  result: LadderGameResult[];
}

export default function Result({ result }: ResultProps) {
  return (
    <Styled.ResultContainer>
      <Styled.ResultTitle>게임 결과</Styled.ResultTitle>
      <Styled.ResultList>
        {result.map(({ start, end }, idx) => (
          <Styled.ResultItem key={`key_${idx}`}>
            <Styled.StartPoint>{start}</Styled.StartPoint>
            <Styled.RightArrow />
            <Styled.EndPoint>{end}</Styled.EndPoint>
          </Styled.ResultItem>
        ))}
      </Styled.ResultList>
    </Styled.ResultContainer>
  );
}
