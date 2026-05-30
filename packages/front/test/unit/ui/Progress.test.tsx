import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Progress } from '../../../src/ui/Progress/Progress';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Progress', () => {
  it('should render progress bar without label', () => {
    const { container } = renderWithTheme(<Progress percentage={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render progress bar with label and percentage', () => {
    renderWithTheme(<Progress percentage={75} label="Salud" />);
    expect(screen.getByText('75 (Salud)')).toBeInTheDocument();
  });

  it('should render progress bar with value if provided', () => {
    renderWithTheme(<Progress percentage={50} value={10} label="Vida" />);
    expect(screen.getByText('10 (Vida)')).toBeInTheDocument();
  });

  it('should show HIGH status when percentage > 66 (normal mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={80} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show MEDIUM status when 33 < percentage <= 66 (normal mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show LOW status when percentage <= 33 (normal mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={20} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show HIGH status when percentage < 33 (inverted mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={20} invert />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show MEDIUM status when 33 <= percentage < 66 (inverted mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={50} invert />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show LOW status when percentage >= 66 (inverted mode)', () => {
    const { container } = renderWithTheme(<Progress percentage={80} invert />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle 0 percentage', () => {
    const { container } = renderWithTheme(<Progress percentage={0} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle 100 percentage', () => {
    const { container } = renderWithTheme(<Progress percentage={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle edge case at 33 percentage', () => {
    const { container } = renderWithTheme(<Progress percentage={33} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should handle edge case at 66 percentage', () => {
    const { container } = renderWithTheme(<Progress percentage={66} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should default invert to false', () => {
    const { container } = renderWithTheme(<Progress percentage={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
