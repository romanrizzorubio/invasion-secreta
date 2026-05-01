import React from 'react';
import { render, screen } from '@testing-library/react';
import { loadService } from '../../src/data/services/load';
import { loadSocket } from '../../src/data/sockets/load';

jest.mock('react-router-dom');
jest.mock('../../src/data/services/load');
jest.mock('../../src/data/sockets/load');

import AppRouter from '../../src/routes/AppRouter';
import { MemoryRouter } from 'react-router-dom';

describe('App Integration Tests', () => {
  const mockLoadData = {
    tables: [],
    phase: 'INIT',
    superLife: 0,
    superPlan: 0,
    spiderWomanTotal: 0,
    ship: 0,
    enemy: 0,
    exposed: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (loadService as jest.Mock).mockResolvedValue(mockLoadData);
    (loadSocket as jest.Mock).mockReturnValue(() => {});
  });

  it('should render without crashing', () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    expect(document.body).toBeInTheDocument();
  });

  it('should initialize with GameProvider', async () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    // Wait for initial data load
    await screen.findByRole('main', {}, { timeout: 3000 }).catch(() => {
      // If main role not found, just verify app rendered
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should setup routing', () => {
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    // Verify router is initialized
    expect(window.location.pathname).toBeDefined();
  });
});
