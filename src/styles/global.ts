import { css } from '@emotion/react';
import { resetStyle } from './reset';

export const baseStyle = css`
  ${resetStyle}

  body {
    font-size: 16px;
    line-height: 1.5;
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
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-family: 'Pretendard', sans-serif;
  }

  p,
  span,
  a,
  button {
    font-family: 'Pretendard', sans-serif;
  }

  :root {
    --vh: 100%;
  }
`;
