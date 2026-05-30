import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Panel } from '../../../src/components/Panel/Panel';
import { PanelTypeDict } from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Panel Component', () => {
  it('should render with correct panel type', () => {
    const { container } = renderWithTheme(<Panel type={PanelTypeDict.SUPER} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('should render message when msg prop is provided', () => {
    renderWithTheme(<Panel type={PanelTypeDict.SUPER} msg="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('should not render message when msg prop is not provided', () => {
    const { container } = renderWithTheme(<Panel type={PanelTypeDict.SUPER} />);
    const text = container.querySelector('p');
    expect(text).not.toBeInTheDocument();
  });

  it('should render single progress bar', () => {
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        progress={{ percentage: 50, label: 'Life' }}
      />
    );
    expect(screen.getByText(/Life/)).toBeInTheDocument();
  });

  it('should render multiple progress bars', () => {
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        progress={[
          { percentage: 50, label: 'Life' },
          { percentage: 30, label: 'Plan' },
        ]}
      />
    );
    expect(screen.getByText(/Life/)).toBeInTheDocument();
    expect(screen.getByText(/Plan/)).toBeInTheDocument();
  });

  it('should render controls when provided', () => {
    const mockOnChange = jest.fn();
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        controls={{ maxValue: 10, onChange: mockOnChange }}
      />
    );
    expect(screen.getByText('+10')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
  });

  it('should render single button', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        buttons={{ label: 'Test Button', onClick: mockOnClick }}
      />
    );
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should render multiple buttons', () => {
    const mockOnClick1 = jest.fn();
    const mockOnClick2 = jest.fn();
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        buttons={[
          { label: 'Button 1', onClick: mockOnClick1 },
          { label: 'Button 2', onClick: mockOnClick2 },
        ]}
      />
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('should disable buttons when disabled prop is true', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        buttons={{ label: 'Test Button', onClick: mockOnClick }}
        disabled={true}
      />
    );
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
  });

  it('should disable image when disabled prop is true', () => {
    const { container } = renderWithTheme(<Panel type={PanelTypeDict.SUPER} disabled={true} />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('disabled');
  });

  it('should call button onClick when clicked', () => {
    const mockOnClick = jest.fn();
    renderWithTheme(
      <Panel
        type={PanelTypeDict.SUPER}
        buttons={{ label: 'Click Me', onClick: mockOnClick }}
      />
    );
    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should render different panel types correctly', () => {
    const { rerender, container } = renderWithTheme(<Panel type={PanelTypeDict.SUPER} />);
    let img = container.querySelector('img');
    expect(img).toHaveAttribute('src');

    rerender(
      <ThemeProvider theme={theme}>
        <Panel type={PanelTypeDict.VERANKE} />
      </ThemeProvider>
    );
    img = container.querySelector('img');
    expect(img).toHaveAttribute('src');
  });
});
