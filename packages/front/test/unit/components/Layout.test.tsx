import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../../src/components/Layout/Layout';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Layout Component', () => {
  it('should render without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('should render Outlet component', () => {
    const TestChild = () => <div>Test Child Content</div>;

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TestChild />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  it('should render container structure', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );

    const container = document.querySelector('div');
    const main = document.querySelector('main');

    expect(container).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});
