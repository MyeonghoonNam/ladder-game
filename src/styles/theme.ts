export type Theme = typeof theme;

export const theme = {
  colors: {
    brown20: '#4b382a',
    brown30: '#6d4e35',
    brown40: '#8c694f',
    brown50: '#8b5a2b',

    neutral10: '#fdf5e6',
    neutral20: '#d2b48c',
    neutral40: '#D7D3BF',
    neutral50: '#ECEBDE',
    neutral60: '#A59D84',
    neutral70: '#C1BAA1',
    neutral90: '#333333',

    red40: '#E57373',
    red50: '#D32F2F',

    green40: '#81C784',
    green50: '#388E3C',

    white: '#ffffff',

    gray05: '#f3f3f3',

    background: {
      primary: '#F5F5DC',
      secondary: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.05)',
    },
    border: {
      light: '#E8E8E8',
      dark: '#D0D0D0',
    },
  },
  typography: {
    heading1: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      lineHeight: '3rem',
    },
    heading2: {
      fontSize: '2rem',
      fontWeight: 'bold',
      lineHeight: '2.5rem',
    },
    heading3: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      lineHeight: '2rem',
    },
    bodyLarge: {
      fontSize: '1.25rem',
      fontWeight: 'normal',
      lineHeight: '1.75rem',
    },
    bodyMedium: {
      fontSize: '1rem',
      fontWeight: 'normal',
      lineHeight: '1.5rem',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      lineHeight: '1.25rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 'normal',
      lineHeight: '1rem',
    },
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px',
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600,
  },
  animation: {
    duration: {
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    },
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  radius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
} as const;
