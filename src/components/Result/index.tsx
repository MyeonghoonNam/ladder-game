import { LadderGameResult } from 'models';
import * as Styled from './styled';

interface ResultProps {
  result: LadderGameResult[];
}

export default function Result({ result }: ResultProps) {
  return (
    <Styled.ResultContainer>
      <Styled.ResultTitle>게임 결과</Styled.ResultTitle>
      <Styled.ResultList columnCount={result.length <= 5 ? 1 : 2}>
        {result.map(({ start, end }) => (
          <Styled.ResultItem key={`result ${start} to ${end}`}>
            <Styled.StartPoint>{start}</Styled.StartPoint>
            <Styled.RightArrow />
            <Styled.EndPoint>{end}</Styled.EndPoint>
          </Styled.ResultItem>
        ))}
      </Styled.ResultList>
    </Styled.ResultContainer>
  );
}
