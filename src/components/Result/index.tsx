import { type LadderGameResult } from 'models';

interface ResultProps {
  result: LadderGameResult[];
}

export default function Result({ result }: ResultProps) {
  console.log(result);
  return (
    <div>
      {result.map(({ start, end }, idx) => (
        <div key={`key_${idx}`}>
          <span>{start}</span>
          <span>{'=>'}</span>
          <span>{end}</span>
        </div>
      ))}
    </div>
  );
}
