import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Watcher } from '../../../src/components/Watchers/Watcher';
import { PanelTypeDict } from '../../../src/types/Dicts';
import { theme } from '../../../src/styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Watcher Component', () => {
  const mockOnPrevious = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with panel type', () => {
    const { container } = renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });

  it('should render "Anterior" and "Siguiente" buttons when not readOnly', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        readOnly={false}
      />
    );
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('should not render buttons when readOnly is true', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        readOnly={true}
      />
    );
    expect(screen.queryByText('Anterior')).not.toBeInTheDocument();
    expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
  });

  it('should call onPrevious when "Anterior" button is clicked', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );
    fireEvent.click(screen.getByText('Anterior'));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('should call onNext when "Siguiente" button is clicked', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );
    fireEvent.click(screen.getByText('Siguiente'));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('should render table text when readOnly and table is provided', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        table={1}
        readOnly={true}
      />
    );
    expect(screen.getByText('Mesa 2')).toBeInTheDocument();
  });

  it('should not render table text when not readOnly', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        table={1}
        readOnly={false}
      />
    );
    expect(screen.queryByText('Mesa 2')).not.toBeInTheDocument();
  });

  it('should not render table text when table is not provided', () => {
    renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        readOnly={true}
      />
    );
    expect(screen.queryByText(/Mesa/)).not.toBeInTheDocument();
  });

  it('should disable panel when disabled is true', () => {
    const { container } = renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        disabled={true}
      />
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('disabled');
  });

  it('should not disable panel when disabled is false', () => {
    const { container } = renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        disabled={false}
      />
    );
    const img = container.querySelector('img');
    expect(img).not.toHaveAttribute('disabled');
  });

  it('should render correct table text for different table numbers', () => {
    const { rerender } = renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        table={3}
        readOnly={true}
      />
    );
    expect(screen.getByText('Mesa 4')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Watcher
          type={PanelTypeDict.UATU}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
          table={5}
          readOnly={true}
        />
      </ThemeProvider>
    );
    expect(screen.getByText('Mesa 6')).toBeInTheDocument();
  });

  it('should render different panel types', () => {
    const { rerender, container } = renderWithTheme(
      <Watcher
        type={PanelTypeDict.UATU}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    );
    let img = container.querySelector('img');
    expect(img).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={theme}>
        <Watcher
          type={PanelTypeDict.ARON}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      </ThemeProvider>
    );
    img = container.querySelector('img');
    expect(img).toBeInTheDocument();
  });
});
