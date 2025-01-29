import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import { type TYPE_VARIANTS, type SIZE_VARIANTS } from './types';

import * as Styled from './styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TYPE_VARIANTS;
  size?: SIZE_VARIANTS;
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'medium', fullWidth = false, children, ...rest }: Props,
  forwardedRef: Ref<HTMLButtonElement>
) {
  return (
    <Styled.Button ref={forwardedRef} variant={variant} size={size} fullWidth={fullWidth} {...rest}>
      {children}
    </Styled.Button>
  );
});

export default Button;
