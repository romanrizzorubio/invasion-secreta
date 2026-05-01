import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { SuperPhase } from '../../../src/phases/SuperPhase/SuperPhase';
import { useSuper } from '../../../src/hooks/useSuper';
import { theme } from '../../../src/styles/theme';

jest.mock('../../../src/hooks/useSuper');
jest.mock('../../../src/components/Panel/Panel', () => ({
  Panel: ({ type }: { type: string }) => <div>Panel: {type}</div>,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SuperPhase', () => {
  const mockChangeSpiderWoman = jest.fn();
  const mockChangeSuperLife = jest.fn();
  const mockChangeSuperPlan = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSuper as jest.Mock).mockReturnValue({
      spiderWomanTotal: 3,
      spiderWomanOwn: 1,
      superLife: 50,
      superPlan: 30,
      changeSpiderWoman: mockChangeSpiderWoman,
      changeSuperLife: mockChangeSuperLife,
      changeSuperPlan: mockChangeSuperPlan,
    });
  });

  it('should render Super panel', () => {
    renderWithTheme(<SuperPhase />);
    expect(screen.getByText('Panel: 0')).toBeInTheDocument();
  });

  it('should render Super Plan panel', () => {
    renderWithTheme(<SuperPhase />);
    expect(screen.getByText('Panel: 1')).toBeInTheDocument();
  });

  it('should render Spider Woman Leaves panel', () => {
    renderWithTheme(<SuperPhase />);
    expect(screen.getByText('Panel: 4')).toBeInTheDocument();
  });

  it('should render all panels when readOnly is false', () => {
    renderWithTheme(<SuperPhase readOnly={false} />);
    expect(screen.getByText('Panel: 0')).toBeInTheDocument();
    expect(screen.getByText('Panel: 1')).toBeInTheDocument();
    expect(screen.getByText('Panel: 4')).toBeInTheDocument();
  });

  it('should render all panels when readOnly is true', () => {
    renderWithTheme(<SuperPhase readOnly={true} />);
    expect(screen.getByText('Panel: 0')).toBeInTheDocument();
    expect(screen.getByText('Panel: 1')).toBeInTheDocument();
    expect(screen.getByText('Panel: 4')).toBeInTheDocument();
  });

  it('should handle spiderWomanOwn being undefined', () => {
    (useSuper as jest.Mock).mockReturnValue({
      spiderWomanTotal: 3,
      spiderWomanOwn: undefined,
      superLife: 50,
      superPlan: 30,
      changeSpiderWoman: mockChangeSpiderWoman,
      changeSuperLife: mockChangeSuperLife,
      changeSuperPlan: mockChangeSuperPlan,
    });

    renderWithTheme(<SuperPhase />);
    expect(screen.getByText('Panel: 4')).toBeInTheDocument();
  });
});
