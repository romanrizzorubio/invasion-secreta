import { test, expect, type BrowserContext, type Locator, type Page } from '@playwright/test';

import { closeContextsAndHandleVideos, newRecordedContext } from './support/video-context';

test.describe('Test E2E: Los valores de la vida del Súper Skrull se generan correctamente', () => {
  test('Flujo completo con 2 mesas (Normal y Experto) y 4 jugadores cada una', async ({
    browser,
  }, testInfo) => {
    const contexts: BrowserContext[] = [];
    let keepVideos = false;

    try {
      // 1. Preparar Contextos y Páginas (Pestañas)
      const contextHost = await newRecordedContext(browser, testInfo, contexts);
      const contextP1 = await newRecordedContext(browser, testInfo, contexts);
      const contextP2 = await newRecordedContext(browser, testInfo, contexts);

      const host = await contextHost.newPage();
      const p1 = await contextP1.newPage();
      const p2 = await contextP2.newPage();
      const clickAndWaitForPost = async (page: Page, button: Locator, endpoint: string) => {
        const response = page.waitForResponse(
          (res) => res.url().endsWith(endpoint) && res.request().method() === 'POST',
        );

        await button.click();
        await response;
      };
      const getProgressPercentage = async (progress: Locator) =>
        progress.evaluate((el) => {
          const classNames = Array.from(el.classList);

          for (const stylesheet of Array.from(document.styleSheets)) {
            for (const rule of Array.from(stylesheet.cssRules)) {
              if (!(rule instanceof CSSStyleRule) || !rule.style.width.endsWith('%')) continue;

              const selector = rule.selectorText;
              if (classNames.some((className) => selector.includes(`.${className}`))) {
                return parseFloat(rule.style.width);
              }
            }
          }

          return 0;
        });

      // --- PASO 1: Inicio de la partida ---

      const baseURL = 'http://localhost:3000';

      // Pestaña 1 (Host): Navegar a /
      await host.goto(`${baseURL}/`);

      // Acción: Escribir en el Input 1 Hora más tarde de la hora actual
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

      // Acción: Click en botón "Iniciar"
      await host.getByRole('button', { name: 'Iniciar' }).click();

      // Verificar: Se ve el reloj corriendo, el botón "Iniciar" deshabilitado y ya no existe el Input
      await expect(host.getByRole('heading', { name: /-?\d+:\d{2}:\d{2}/ })).toBeVisible();
      await expect(host.getByRole('button', { name: 'Iniciar' })).toBeDisabled();
      await expect(host.getByLabel('Hora de finalización')).not.toBeVisible();

      // Pestaña 2 (Jugador 1): Navegar a /table
      await p1.goto(`${baseURL}/table`);

      // Acción: Escribir en el Input el valor 1
      await p1.getByLabel('Mesa').fill('1');
      await p1.getByLabel('Mesa').blur();

      // Acción: Click en "Iniciar"
      await p1.getByRole('button', { name: 'Iniciar' }).click();

      // Acción: Seleccionar 4 héroes
      await p1.getByLabel('Jugador 1').selectOption('Cable');
      await p1.getByLabel('Jugador 2').selectOption('Daredevil');
      await p1.getByLabel('Jugador 3').selectOption('Gamora');
      await p1.getByLabel('Jugador 4').selectOption('Iron Man');

      // Acción: Click en botón "Iniciar"
      await p1.getByRole('button', { name: 'Iniciar' }).click();

      // Verificar: Debe salir una tabla con los 4 héroes seleccionados
      await expect(p1.locator('table')).toContainText('Cable');
      await expect(p1.locator('table')).toContainText('Daredevil');
      await expect(p1.locator('table')).toContainText('Gamora');
      await expect(p1.locator('table')).toContainText('Iron Man');

      // Pestaña 3 (Jugador 2): Navegar a /table
      await p2.goto(`${baseURL}/table`);

      // Acción: Escribir en el Input el valor 2
      await p2.getByLabel('Mesa').fill('2');
      await p2.getByLabel('Mesa').blur();

      // Acción: Click en "Iniciar"
      await p2.getByRole('button', { name: 'Iniciar' }).click();

      // Acción: Seleccionar "Experto"
      await p2.getByLabel('Experto').check();

      // Acción: Seleccionar 4 héroes
      await p2.getByLabel('Jugador 1').selectOption('Ojo de Halcón');
      await p2.getByLabel('Jugador 2').selectOption('Hombre Hormiga');
      await p2.getByLabel('Jugador 3').selectOption('Mujer Invisible');
      await p2.getByLabel('Jugador 4').selectOption('Rondador Nocturno');

      // Acción: Click en botón "Iniciar" (el MD dice "Crear", pero en código es "Iniciar")
      await p2.getByRole('button', { name: 'Iniciar' }).click();

      // Pestaña 1 (Host): Click en botón "Iniciar"
      // Esperamos a que los otros jugadores hayan terminado (opcionalmente podemos verificar estado en el host si hay una lista de mesas)
      await host.getByRole('button', { name: 'Iniciar' }).click();

      // --- PASO 2: Verificar carga inicial del Súper Skrull ---

      // Verificar en todas las pestañas que se ve el panel con barra llena
      const progressHost = host.getByText('Vida');
      await expect.poll(() => getProgressPercentage(progressHost)).toBeGreaterThan(99);

      const progressP1 = p1.getByText('Vida');
      const lifePanelP1 = progressP1.locator('xpath=../..');
      await expect.poll(() => getProgressPercentage(progressP1)).toBeGreaterThan(99);

      const progressP2 = p2.getByText('Vida');
      const lifePanelP2 = progressP2.locator('xpath=../..');
      await expect.poll(() => getProgressPercentage(progressP2)).toBeGreaterThan(99);

      // Verificar botones en P1 y P2
      await expect(lifePanelP1.getByRole('button', { name: '-10', exact: true })).toBeVisible();
      await expect(lifePanelP1.getByRole('button', { name: '+10', exact: true })).toBeVisible();
      await expect(lifePanelP2.getByRole('button', { name: '-5', exact: true })).toBeVisible();
      await expect(lifePanelP2.getByRole('button', { name: '-1', exact: true })).toBeVisible();

      // --- PASO 3: Interactuar con el Súper Skrull ---

      // Pestaña 2 (Jugador 1): Click +10
      await clickAndWaitForPost(
        p1,
        lifePanelP1.getByRole('button', { name: '+10', exact: true }),
        '/super-life',
      );
      // Verificar: Sigue entera (100%)
      await expect.poll(() => getProgressPercentage(progressP1)).toBeGreaterThan(99);

      // Acción: Click -10 diez veces
      for (let i = 0; i < 10; i++) {
        await clickAndWaitForPost(
          p1,
          lifePanelP1.getByRole('button', { name: '-10', exact: true }),
          '/super-life',
        );
      }

      // Verificar: No está entera
      const widthP1 = await getProgressPercentage(progressP1);
      expect(widthP1).toBeLessThan(99);

      // Verificar sincronización
      await expect.poll(() => getProgressPercentage(progressHost)).toBeCloseTo(widthP1, 2);
      await expect.poll(() => getProgressPercentage(progressP2)).toBeCloseTo(widthP1, 2);

      // Pestaña 3 (Jugador 2): -1 x2, -5, -1
      await clickAndWaitForPost(
        p2,
        lifePanelP2.getByRole('button', { name: '-1', exact: true }),
        '/super-life',
      );
      await clickAndWaitForPost(
        p2,
        lifePanelP2.getByRole('button', { name: '-1', exact: true }),
        '/super-life',
      );
      await clickAndWaitForPost(
        p2,
        lifePanelP2.getByRole('button', { name: '-5', exact: true }),
        '/super-life',
      );
      await clickAndWaitForPost(
        p2,
        lifePanelP2.getByRole('button', { name: '-1', exact: true }),
        '/super-life',
      );

      // Verificar: Se muestra imagen del Súper Skrull derrotado (o el mensaje)
      await expect(p2.getByText('El Súper Skrull ha perdido la batalla')).toBeVisible();

      // Pestaña 1 (Host): Verificar derrota y botón Avanzar
      await expect(host.getByText('El Súper Skrull ha perdido la batalla')).toBeVisible();
      await expect(host.getByRole('button', { name: 'Avanzar' })).toBeVisible();
    } catch (error) {
      keepVideos = true;
      throw error;
    } finally {
      await closeContextsAndHandleVideos(contexts, testInfo, keepVideos);
    }
  });
});
