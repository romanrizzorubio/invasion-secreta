import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { GameProvider } from './contexts/GameContext';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GameProvider>
        <GlobalStyles />
        <App />
      </GameProvider>
    </ThemeProvider>
  </StrictMode>,
);
