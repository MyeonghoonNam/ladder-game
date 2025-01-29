import styled from '@emotion/styled';
import { Theme } from 'styles';
import { SpacingProps } from './index';

export type SpacingSize = keyof Theme['spacing'];

export const Container = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical', theme, inline = false }) => {
    const marginSize = theme.spacing[size];

    return {
      display: inline ? 'inline-block' : 'block',
      ...(direction === 'vertical' ? { height: marginSize } : { width: marginSize }),
    };
  }}
`;
