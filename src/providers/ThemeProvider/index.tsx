'use client';

import { Global, ThemeProvider } from '@emotion/react';
import { baseStyle, theme } from 'styles';

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <>
      <Global styles={baseStyle} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
