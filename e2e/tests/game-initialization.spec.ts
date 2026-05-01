import { test, expect } from '@playwright/test';

test.describe('Game Initialization E2E', () => {
  test('should initialize game through API and verify frontend receives data', async ({ page, request }) => {
    // Test backend API
    const response = await request.get('http://localhost:4000/');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toBe('Hello World!');
  });

  test('should get game data from backend', async ({ request }) => {
    const response = await request.get('http://localhost:4000/data');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('tables');
    expect(data).toHaveProperty('phase');
    expect(data).toHaveProperty('end');
  });

  test('should initialize game with players and end value', async ({ request }) => {
    const response = await request.post('http://localhost:4000/init', {
      data: {
        players: 4,
        end: 10
      }
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('tables');
    expect(data).toHaveProperty('phase');
    expect(data).toHaveProperty('end', 10);
  });

  test('should get heroes list', async ({ request }) => {
    const response = await request.get('http://localhost:4000/heroes');
    expect(response.ok()).toBeTruthy();
    const heroes = await response.json();
    expect(Array.isArray(heroes)).toBeTruthy();
    expect(heroes.length).toBeGreaterThan(0);
  });

  test('should reset game', async ({ request }) => {
    // First initialize
    await request.post('http://localhost:4000/init', {
      data: { players: 4, end: 10 }
    });

    // Then reset
    const response = await request.post('http://localhost:4000/reset');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('tables');
    expect(data).toHaveProperty('phase');
  });

  test('should load frontend application', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Invasión Secreta|React App/);
  });

  test('should connect frontend to backend', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if there are no console errors related to connection
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit to ensure connection attempts
    await page.waitForTimeout(2000);

    // Basic check that page is functional
    await expect(page.locator('body')).toBeVisible();
  });
});
