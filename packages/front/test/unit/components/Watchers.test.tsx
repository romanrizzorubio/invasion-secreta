import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { Watchers } from '../../../src/components/Watchers/Watchers';
import { theme } from '../../../src/styles/theme';
import * as useWatchersHook from '../../../src/hooks/useWatchers';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

jest.mock('../../../src/hooks/useWatchers');

describe('Watchers Component', () => {
  const mockChangeUatu = jest.fn();
  const mockChangeAron = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when uatu and aron are undefined', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 0,
      uatu: undefined,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    const { container } = renderWithTheme(<Watchers />);
    expect(container.firstChild).toBeNull();
  });

  it('should render Uatu when uatu matches currentTable', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    expect(screen.getByText('Anterior')).toBeInTheDocument();
  });

  it('should render Aron when aron matches currentTable', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 2,
      uatu: undefined,
      aron: 2,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Siguiente')).toBeInTheDocument();
  });

  it('should render both Uatu and Aron when both match currentTable', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: 1,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    const buttons = screen.getAllByText('Anterior');
    expect(buttons).toHaveLength(2);
  });

  it('should not render Uatu when uatu does not match currentTable and not readOnly', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 2,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    const { container } = renderWithTheme(<Watchers readOnly={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render Uatu in readOnly mode regardless of currentTable', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 3,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers readOnly={true} />);
    expect(screen.getByText('Mesa 4')).toBeInTheDocument();
  });

  it('should render Aron in readOnly mode regardless of currentTable', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: undefined,
      aron: 4,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers readOnly={true} />);
    expect(screen.getByText('Mesa 5')).toBeInTheDocument();
  });

  it('should call changeUatu with false when Uatu Anterior is clicked', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    fireEvent.click(screen.getByText('Anterior'));
    expect(mockChangeUatu).toHaveBeenCalledWith(false);
  });

  it('should call changeUatu with true when Uatu Siguiente is clicked', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    fireEvent.click(screen.getByText('Siguiente'));
    expect(mockChangeUatu).toHaveBeenCalledWith(true);
  });

  it('should call changeAron with false when Aron Anterior is clicked', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 2,
      uatu: undefined,
      aron: 2,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    fireEvent.click(screen.getByText('Anterior'));
    expect(mockChangeAron).toHaveBeenCalledWith(false);
  });

  it('should call changeAron with true when Aron Siguiente is clicked', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 2,
      uatu: undefined,
      aron: 2,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers />);
    fireEvent.click(screen.getByText('Siguiente'));
    expect(mockChangeAron).toHaveBeenCalledWith(true);
  });

  it('should disable Uatu when uatuDisabled is true', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: undefined,
      uatuDisabled: true,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    const { container } = renderWithTheme(<Watchers />);
    const img = container.querySelector('img[disabled]');
    expect(img).toBeInTheDocument();
  });

  it('should not show buttons in readOnly mode', () => {
    jest.spyOn(useWatchersHook, 'useWatchers').mockReturnValue({
      currentTable: 1,
      uatu: 1,
      aron: undefined,
      uatuDisabled: false,
      changeUatu: mockChangeUatu,
      changeAron: mockChangeAron,
    });

    renderWithTheme(<Watchers readOnly={true} />);
    expect(screen.queryByText('Anterior')).not.toBeInTheDocument();
    expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
  });
});
