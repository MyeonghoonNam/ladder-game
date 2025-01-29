import React from 'react';
import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import { baseStyle, theme } from 'styles';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Global styles={baseStyle} />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
