import { expect, test, type BrowserContext, type Locator, type Page } from '@playwright/test';

import { closeContextsAndHandleVideos, newRecordedContext } from './support/video-context';

const baseURL = 'http://localhost:3000';
const apiURL = 'http://localhost:4000';
const initialThreatPercentage = 100 / 7;
const threatAfterFourDecrementsPercentage = (4 / 56) * 100;

async function clickAndWaitForPost(page: Page, control: Locator, endpoint: string) {
  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes(endpoint) &&
        response.request().method() === 'POST' &&
        response.ok(),
    ),
    control.click(),
  ]);
}

async function fillFutureEndTime(host: Page) {
  const now = new Date();
  const endTime = new Date(now);
  endTime.setMinutes(now.getMinutes() + 10);

  test.skip(
    endTime.getDate() !== now.getDate(),
    'El input de hora no permite seleccionar una fecha futura al cruzar medianoche.',
  );

  const timeValue = endTime.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  await host.getByLabel('Hora de finalización').fill(timeValue);
  await host.getByLabel('Hora de finalización').blur();
}

function superPlanProgress(page: Page) {
  return page.getByText('Amenaza', { exact: true });
}

function superPlanPanel(page: Page) {
  return superPlanProgress(page).locator('xpath=../..');
}

async function getProgressPercentage(progress: Locator) {
  return progress.evaluate((element) => {
    const parent = element.parentElement;
    if (!parent) return 0;

    const width = Number.parseFloat(window.getComputedStyle(element).width);
    const parentWidth = Number.parseFloat(window.getComputedStyle(parent).width);

    return parentWidth > 0 ? (width / parentWidth) * 100 : 0;
  });
}

async function selectHeroes(page: Page, heroes: string[]) {
  for (const [index, hero] of heroes.entries()) {
    await page.getByLabel(`Jugador ${index + 1}`).selectOption({ label: hero });
  }
}

async function createTable(page: Page, tableNumber: string, heroes: string[], expert = false) {
  await page.goto(`${baseURL}/table`);
  await page.getByLabel('Mesa').fill(tableNumber);
  await page.getByLabel('Mesa').blur();
  await page.getByRole('button', { name: 'Iniciar' }).click();

  if (expert) {
    await page.getByLabel('Experto').check();
  }

  await selectHeroes(page, heroes);
  await clickAndWaitForPost(page, page.getByRole('button', { name: 'Iniciar' }), '/init-table');
}

async function expectThreatControls(panel: Locator) {
  for (const label of ['-10', '-5', '-1', '+1', '+5', '+10']) {
    await expect(panel.getByRole('button', { name: label, exact: true })).toBeVisible();
  }
}

test.describe('Test E2E: Los valores del plan del Súper Skrull genera correctamente.', () => {
  test('sincroniza la amenaza del plan entre host, mesa normal y mesa experta hasta la victoria', async ({
    browser,
    request,
  }, testInfo) => {
    const resetResponse = await request.post(`${apiURL}/reset`);
    expect(resetResponse.ok()).toBeTruthy();

    const contexts: BrowserContext[] = [];
    let keepVideos = false;

    try {
      const contextHost = await newRecordedContext(browser, testInfo, contexts);
      const contextTableOne = await newRecordedContext(browser, testInfo, contexts);
      const contextTableTwo = await newRecordedContext(browser, testInfo, contexts);

      const host = await contextHost.newPage();
      const tableOne = await contextTableOne.newPage();
      const tableTwo = await contextTableTwo.newPage();

      await host.goto(`${baseURL}/`);
      await fillFutureEndTime(host);
      await clickAndWaitForPost(host, host.getByRole('button', { name: 'Iniciar' }), '/init');

      await expect(host.getByRole('heading', { name: /-?\d+:\d{2}:\d{2}/ })).toBeVisible();
      await expect(host.getByRole('button', { name: 'Iniciar' })).toBeDisabled();
      await expect(host.getByLabel('Hora de finalización')).not.toBeVisible();

      await createTable(tableOne, '1', ['Cable', 'Daredevil', 'Gamora', 'Iron Man']);
      for (const hero of ['Cable', 'Daredevil', 'Gamora', 'Iron Man']) {
        await expect(tableOne.locator('table')).toContainText(hero);
      }

      await createTable(
        tableTwo,
        '2',
        ['Ojo de Halcón', 'Hombre Hormiga', 'Mujer Invisible', 'Rondador Nocturno'],
        true,
      );

      await expect(host.locator('table')).toHaveCount(2);
      for (const hero of ['Cable', 'Daredevil', 'Gamora', 'Iron Man']) {
        await expect(host.locator('table').nth(0)).toContainText(hero);
      }
      for (const hero of [
        'Ojo de Halcón',
        'Hombre Hormiga',
        'Mujer Invisible',
        'Rondador Nocturno',
      ]) {
        await expect(host.locator('table').nth(1)).toContainText(hero);
      }
      await clickAndWaitForPost(
        host,
        host.getByRole('button', { name: 'Iniciar' }),
        '/start-tables',
      );

      for (const page of [host, tableOne, tableTwo]) {
        await expect(superPlanProgress(page)).toBeVisible();
        await expect
          .poll(() => getProgressPercentage(superPlanProgress(page)))
          .toBeCloseTo(initialThreatPercentage, 0);
      }

      await expect(host.getByRole('button', { name: '-10', exact: true })).not.toBeVisible();
      await expectThreatControls(superPlanPanel(tableOne));
      await expectThreatControls(superPlanPanel(tableTwo));

      for (let i = 0; i < 4; i++) {
        await clickAndWaitForPost(
          tableOne,
          superPlanPanel(tableOne).getByRole('button', { name: '-1', exact: true }),
          '/super-plan',
        );
      }

      await expect
        .poll(() => getProgressPercentage(superPlanProgress(tableOne)))
        .toBeCloseTo(threatAfterFourDecrementsPercentage, 0);
      const threatAfterDecrements = await getProgressPercentage(superPlanProgress(tableOne));
      await expect
        .poll(() => getProgressPercentage(superPlanProgress(host)))
        .toBeCloseTo(threatAfterDecrements, 1);
      await expect
        .poll(() => getProgressPercentage(superPlanProgress(tableTwo)))
        .toBeCloseTo(threatAfterDecrements, 1);

      for (let i = 0; i < 5; i++) {
        await clickAndWaitForPost(
          tableTwo,
          superPlanPanel(tableTwo).getByRole('button', { name: '+10', exact: true }),
          '/super-plan',
        );
      }

      await clickAndWaitForPost(
        tableTwo,
        superPlanPanel(tableTwo).getByRole('button', { name: '+5', exact: true }),
        '/super-plan',
      );

      // La UI real expresa la victoria del Súper Skrull como "ha logrado sus planes".
      await expect(tableTwo.getByText('El Súper Skrull ha logrado sus planes')).toBeVisible();
      await expect(host.getByText('El Súper Skrull ha logrado sus planes')).toBeVisible();
      await expect(host.getByRole('button', { name: 'Avanzar' })).toBeVisible();
    } catch (error) {
      keepVideos = true;
      throw error;
    } finally {
      await closeContextsAndHandleVideos(contexts, testInfo, keepVideos);
    }
  });
});
