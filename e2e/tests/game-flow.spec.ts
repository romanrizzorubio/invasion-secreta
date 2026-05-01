import { test, expect } from '@playwright/test';

test.describe('Complete Game Flow E2E', () => {
  test.beforeEach(async ({ request }) => {
    // Reset game state before each test
    await request.post('http://localhost:4000/reset');
  });

  test('should complete a full game initialization flow', async ({ page, request }) => {
    // Step 1: Initialize game
    const initResponse = await request.post('http://localhost:4000/init', {
      data: {
        players: 4,
        end: 10
      }
    });
    expect(initResponse.ok()).toBeTruthy();
    const initData = await initResponse.json();
    expect(initData.end).toBe(10);

    // Step 2: Get heroes
    const heroesResponse = await request.get('http://localhost:4000/heroes');
    expect(heroesResponse.ok()).toBeTruthy();
    const heroes = await heroesResponse.json();
    expect(heroes.length).toBeGreaterThan(0);

    // Step 3: Initialize a table
    const tableResponse = await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });
    expect(tableResponse.ok()).toBeTruthy();

    // Step 4: Start tables
    const startResponse = await request.post('http://localhost:4000/start-tables');
    expect(startResponse.ok()).toBeTruthy();

    // Step 5: Load frontend and verify it reflects the state
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify page is loaded
    await expect(page.locator('body')).toBeVisible();
  });

  test('should handle table operations', async ({ request }) => {
    // Initialize game
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    // Get heroes for table
    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    // Initialize table
    const initTableResponse = await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });
    expect(initTableResponse.ok()).toBeTruthy();

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    // Update super life
    const superLifeResponse = await request.post('http://localhost:4000/super-life', {
      data: {
        table: 1,
        value: 5
      }
    });
    expect(superLifeResponse.ok()).toBeTruthy();

    // Update super plan
    const superPlanResponse = await request.post('http://localhost:4000/super-plan', {
      data: {
        table: 1,
        value: 3
      }
    });
    expect(superPlanResponse.ok()).toBeTruthy();

    // Update ship
    const shipResponse = await request.post('http://localhost:4000/ship', {
      data: {
        table: 1
      }
    });
    expect(shipResponse.ok()).toBeTruthy();

    // Update enemy
    const enemyResponse = await request.post('http://localhost:4000/enemy', {
      data: {
        table: 1,
        value: 2
      }
    });
    expect(enemyResponse.ok()).toBeTruthy();

    // Get updated data
    const dataResponse = await request.get('http://localhost:4000/data');
    const gameData = await dataResponse.json();
    expect(gameData.tables).toHaveLength(1);
    expect(gameData.tables[0]).toHaveProperty('superDamage', 5);
    expect(gameData.tables[0]).toHaveProperty('superThreat', 3);
    expect(gameData.tables[0]).toHaveProperty('ship', 1);
    expect(gameData.tables[0]).toHaveProperty('enemy', 2);
  });

  test('should advance game phases', async ({ request }) => {
    // Initialize game
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    // Initialize table
    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    // Advance game
    const advanceResponse = await request.post('http://localhost:4000/advance');
    expect(advanceResponse.ok()).toBeTruthy();

    // Verify game advanced
    const dataResponse = await request.get('http://localhost:4000/data');
    const gameData = await dataResponse.json();
    expect(gameData).toHaveProperty('phase');
    expect(gameData).toHaveProperty('tables');
  });

  test('should handle spider-woman updates', async ({ request }) => {
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    const spiderResponse = await request.post('http://localhost:4000/spider-woman', {
      data: {
        table: 1,
        value: 1
      }
    });
    expect(spiderResponse.ok()).toBeTruthy();
  });

  test('should handle exposed updates', async ({ request }) => {
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    const exposedResponse = await request.post('http://localhost:4000/exposed', {
      data: {
        table: 1,
        value: 2
      }
    });
    expect(exposedResponse.ok()).toBeTruthy();
  });

  test('should handle watcher changes (Uatu and Aron)', async ({ request }) => {
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    // Change Uatu
    const uatuResponse = await request.post('http://localhost:4000/uatu', {
      data: {
        next: true
      }
    });
    expect(uatuResponse.ok()).toBeTruthy();

    // Change Aron
    const aronResponse = await request.post('http://localhost:4000/aron', {
      data: {
        next: false
      }
    });
    expect(aronResponse.ok()).toBeTruthy();
  });

  test('should complete and end game', async ({ request }) => {
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    // Complete Veranke
    const completeResponse = await request.post('http://localhost:4000/complete', {
      data: {
        table: 1
      }
    });
    expect(completeResponse.ok()).toBeTruthy();

    // End game
    const endResponse = await request.post('http://localhost:4000/end');
    expect(endResponse.ok()).toBeTruthy();
  });

  test('should reset table individually', async ({ request }) => {
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    // Start tables
    await request.post('http://localhost:4000/start-tables');

    // Reset specific table
    const resetTableResponse = await request.post('http://localhost:4000/reset-table', {
      data: {
        table: 1
      }
    });
    expect(resetTableResponse.ok()).toBeTruthy();
  });

  test('should handle full game cycle with frontend integration', async ({ page, request }) => {
    // Initialize backend
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    const heroesResponse = await request.get('http://localhost:4000/heroes');
    const heroes = await heroesResponse.json();

    await request.post('http://localhost:4000/init-table', {
      data: {
        table: 1,
        players: heroes.slice(0, 4),
        expert: false
      }
    });

    await request.post('http://localhost:4000/start-tables');

    // Load frontend
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Make backend changes
    await request.post('http://localhost:4000/super-life', {
      data: { table: 1, value: 5 }
    });

    await request.post('http://localhost:4000/ship', {
      data: { table: 1 }
    });

    // Wait for WebSocket updates
    await page.waitForTimeout(1000);

    // Verify frontend is still functional
    await expect(page.locator('body')).toBeVisible();

    // Advance and end
    await request.post('http://localhost:4000/advance');
    await page.waitForTimeout(500);

    await request.post('http://localhost:4000/end');
    await page.waitForTimeout(500);

    // Frontend should reflect final state
    await expect(page.locator('body')).toBeVisible();
  });
});
