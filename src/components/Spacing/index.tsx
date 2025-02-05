import * as Styled from './styled';

export interface SpacingProps {
  size: Styled.SpacingSize;
  direction?: 'vertical' | 'horizontal';
  inline?: boolean;
}

export default function Spacing({ size, direction = 'vertical', inline = false }: SpacingProps) {
  return <Styled.Container size={size} direction={direction} inline={inline} />;
}
