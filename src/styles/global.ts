import { css } from '@emotion/react';
import { resetStyle } from './reset';

export const baseStyle = css`
  ${resetStyle}

  * {
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  :root {
    --vh: 100%;
  }
`;
