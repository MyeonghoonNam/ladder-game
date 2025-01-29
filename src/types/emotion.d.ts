import '@emotion/react';
import { Theme as ThemeTpye } from 'styles';

declare module '@emotion/react' {
  export interface Theme extends ThemeTpye {}
}
