export const theme = {
  colors: {
    aspects: {
      basic: '#bfbfbf',
      aggression: '#ac0202',
      justice: '#e1ba00',
      protection: '#069a04',
      leadership: '#1841ca',
      pool: '#b609ca',
    },
    background: {
      primary: '#ffffff',
      secondary: '#000000',
      tertiary: '#57e851',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#204c1f',
      quaternary: '#57e851',
    },
    border: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#204c1f',
    },
  },
  shadows: {
    primary: '2px 2px 0 #ffffff',
    secondary: '2px 2px 0 #000000',
    tertiary: '2px 2px 0 #204c1f',
  },
  progress: {
    low: '#45a341',
    medium: '#f59e0b',
    high: '#e74c3c',
  },
  typography: {
    sizes: {
      S: '12px',
      M: '1rem',
      L: '24px',
      XL: '32px',
      XXL: '64px',
      XXXL: '128px',
    },
  },
};

export type AppTheme = typeof theme;
