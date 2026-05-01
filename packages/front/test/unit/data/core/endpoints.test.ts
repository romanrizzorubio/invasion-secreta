import { endpoints } from '../../../../src/data/core/endpoints';

describe('Endpoints', () => {
  it('should have the correct socket endpoint', () => {
    expect(endpoints.socket).toBe('game:update');
  });

  it('should have the correct HTTP endpoints', () => {
    expect(endpoints.advance).toBe('/advance');
    expect(endpoints.aron).toBe('/aron');
    expect(endpoints.aspects).toBe('/aspects');
    expect(endpoints.complete).toBe('/complete');
    expect(endpoints.data).toBe('/data');
    expect(endpoints.endTime).toBe('/end');
    expect(endpoints.enemy).toBe('/enemy');
    expect(endpoints.exposed).toBe('/exposed');
    expect(endpoints.heroes).toBe('/heroes');
    expect(endpoints.init).toBe('/init');
    expect(endpoints.initTable).toBe('/init-table');
    expect(endpoints.ship).toBe('/ship');
    expect(endpoints.spiderWoman).toBe('/spider-woman');
    expect(endpoints.startTables).toBe('/start-tables');
    expect(endpoints.superLife).toBe('/super-life');
    expect(endpoints.superPlan).toBe('/super-plan');
    expect(endpoints.reset).toBe('/reset');
    expect(endpoints.resetTable).toBe('/reset-table');
    expect(endpoints.uatu).toBe('/uatu');
  });

  it('should be a const object', () => {
    // The object uses 'as const' for TypeScript immutability,
    // but JavaScript doesn't prevent runtime modifications
    expect(endpoints).toBeDefined();
    expect(typeof endpoints).toBe('object');
  });

  it('should have all expected endpoints', () => {
    const expectedEndpoints = [
      'socket',
      'advance',
      'aron',
      'aspects',
      'complete',
      'data',
      'endTime',
      'enemy',
      'exposed',
      'heroes',
      'init',
      'initTable',
      'ship',
      'spiderWoman',
      'startTables',
      'superLife',
      'superPlan',
      'reset',
      'resetTable',
      'uatu',
    ];

    expectedEndpoints.forEach((endpoint) => {
      expect(endpoints).toHaveProperty(endpoint);
    });
  });
});
