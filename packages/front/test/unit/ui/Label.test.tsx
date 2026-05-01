import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Label } from '../../../src/ui/Label/Label';
import { theme } from '../../../src/styles/theme';
import { SizeDict } from '../../../src/types/Dicts';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Label', () => {
  it('should render label with text', () => {
    renderWithTheme(<Label label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should render empty label when no label prop', () => {
    renderWithTheme(<Label />);
    const labels = document.querySelectorAll('label');
    expect(labels).toHaveLength(1);
    expect(labels[0].textContent).toBe('');
  });

  it('should render with htmlFor attribute', () => {
    renderWithTheme(<Label label="Input Label" htmlFor="input-id" />);
    const label = screen.getByText('Input Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('should render with different sizes', () => {
    const { rerender } = renderWithTheme(<Label label="Small" size={SizeDict.S} />);
    expect(screen.getByText('Small')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Label label="Medium" size={SizeDict.M} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Medium')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Label label="Large" size={SizeDict.L} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Large')).toBeInTheDocument();
  });

  it('should use default size when not specified', () => {
    renderWithTheme(<Label label="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('should pass through additional HTML attributes', () => {
    renderWithTheme(<Label label="Test" className="custom-class" />);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('custom-class');
  });
});
