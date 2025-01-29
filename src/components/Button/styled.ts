import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { type TYPE_VARIANTS, type SIZE_VARIANTS } from './types';

interface ButtonProps {
  variant: TYPE_VARIANTS;
  size: SIZE_VARIANTS;
  fullWidth: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 36px;
  padding: ${({ theme }) => theme.spacing.small};
  border: 0 solid transparent;
  border-radius: ${({ theme }) => theme.radius.small};
  cursor: pointer;
  user-select: none;
  transition:
    background-color ${({ theme }) => theme.animation.duration.normal}
      ${({ theme }) => theme.animation.easing.easeInOut},
    transform ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.easeOut};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return css`
          color: ${theme.colors.neutral10};
          background-color: ${theme.colors.brown40};

          &:hover {
            background-color: ${theme.colors.brown50};
          }
        `;
      case 'secondary':
        return css`
          color: ${theme.colors.white};
          background-color: ${theme.colors.neutral70};

          &:hover {
            background-color: ${theme.colors.neutral60};
          }
        `;
    }
  }}

  ${({ size, theme }) => {
    switch (size) {
      case 'medium':
        return css`
          ${theme.typography.bodyLarge}
          height: 40px;
        `;
      case 'large':
        return css`
          ${theme.typography.bodyLarge}
          height: 40px;
        `;
    }
  }}

  &:disabled {
    opacity: 0.26;
    cursor: not-allowed;
  }
`;
