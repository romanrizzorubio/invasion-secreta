# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/tests/super-skrull-health.spec.ts >> Test E2E: Los valores de la vida del Súper Skrull se generan correctamente >> Flujo completo con 2 mesas (Normal y Experto) y 4 jugadores cada una
- Location: e2e/tests/super-skrull-health.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Test E2E: Los valores de la vida del Súper Skrull se generan correctamente', () => {
  4   |   test('Flujo completo con 2 mesas (Normal y Experto) y 4 jugadores cada una', async ({ browser }) => {
  5   |     // 1. Preparar Contextos y Páginas (Pestañas)
  6   |     const contextHost = await browser.newContext();
  7   |     const contextP1 = await browser.newContext();
  8   |     const contextP2 = await browser.newContext();
  9   | 
  10  |     const host = await contextHost.newPage();
  11  |     const p1 = await contextP1.newPage();
  12  |     const p2 = await contextP2.newPage();
  13  | 
  14  |     // --- PASO 1: Inicio de la partida ---
  15  |     
  16  |     const baseURL = 'http://localhost:3000';
  17  | 
  18  |     // Pestaña 1 (Host): Navegar a /
> 19  |     await host.goto(`${baseURL}/`);
      |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
  20  |     
  21  |     // Acción: Escribir en el Input 1 Hora más tarde de la hora actual
  22  |     const now = new Date();
  23  |     now.setHours(now.getHours() + 1);
  24  |     const timeValue = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  25  |     
  26  |     await host.getByLabel('Hora de finalización').fill(timeValue);
  27  |     
  28  |     // Acción: Click en botón "Iniciar"
  29  |     await host.getByRole('button', { name: 'Iniciar' }).click();
  30  |     
  31  |     // Verificar: Se ve el reloj corriendo, el botón "Iniciar" deshabilitado y ya no existe el Input
  32  |     await expect(host.locator('div:has-text(":")')).toBeVisible(); // Suponiendo que el Timer tiene ":"
  33  |     await expect(host.getByRole('button', { name: 'Iniciar' })).toBeDisabled();
  34  |     await expect(host.getByLabel('Hora de finalización')).not.toBeVisible();
  35  | 
  36  |     // Pestaña 2 (Jugador 1): Navegar a /table
  37  |     await p1.goto(`${baseURL}/table`);
  38  |     
  39  |     // Acción: Escribir en el Input el valor 1
  40  |     await p1.getByLabel('Mesa').fill('1');
  41  |     
  42  |     // Acción: Click en "Iniciar"
  43  |     await p1.getByRole('button', { name: 'Iniciar' }).click();
  44  |     
  45  |     // Acción: Seleccionar 4 héroes
  46  |     await p1.getByLabel('Jugador 1').selectOption('Cable');
  47  |     await p1.getByLabel('Jugador 2').selectOption('Daredevil');
  48  |     await p1.getByLabel('Jugador 3').selectOption('Gamora');
  49  |     await p1.getByLabel('Jugador 4').selectOption('Iron Man');
  50  |     
  51  |     // Acción: Click en botón "Iniciar"
  52  |     await p1.getByRole('button', { name: 'Iniciar' }).click();
  53  |     
  54  |     // Verificar: Debe salir una tabla con los 4 héroes seleccionados
  55  |     await expect(p1.locator('table')).toContainText('Cable');
  56  |     await expect(p1.locator('table')).toContainText('Daredevil');
  57  |     await expect(p1.locator('table')).toContainText('Gamora');
  58  |     await expect(p1.locator('table')).toContainText('Iron Man');
  59  | 
  60  |     // Pestaña 3 (Jugador 2): Navegar a /table
  61  |     await p2.goto(`${baseURL}/table`);
  62  |     
  63  |     // Acción: Escribir en el Input el valor 2
  64  |     await p2.getByLabel('Mesa').fill('2');
  65  |     
  66  |     // Acción: Click en "Iniciar"
  67  |     await p2.getByRole('button', { name: 'Iniciar' }).click();
  68  |     
  69  |     // Acción: Seleccionar "Experto"
  70  |     await p2.getByLabel('Experto').check();
  71  |     
  72  |     // Acción: Seleccionar 4 héroes
  73  |     await p2.getByLabel('Jugador 1').selectOption('Ojo de Halcón');
  74  |     await p2.getByLabel('Jugador 2').selectOption('Hombre Hormiga');
  75  |     await p2.getByLabel('Jugador 3').selectOption('Mujer Invisible');
  76  |     await p2.getByLabel('Jugador 4').selectOption('Rondador Nocturno');
  77  |     
  78  |     // Acción: Click en botón "Iniciar" (el MD dice "Crear", pero en código es "Iniciar")
  79  |     await p2.getByRole('button', { name: 'Iniciar' }).click();
  80  |     
  81  |     // Pestaña 1 (Host): Click en botón "Iniciar"
  82  |     // Esperamos a que los otros jugadores hayan terminado (opcionalmente podemos verificar estado en el host si hay una lista de mesas)
  83  |     await host.getByRole('button', { name: 'Iniciar' }).click();
  84  | 
  85  |     // --- PASO 2: Verificar carga inicial del Súper Skrull ---
  86  |     
  87  |     // Verificar en todas las pestañas que se ve el panel con barra llena
  88  |     const progressHost = host.locator('div[class*="Bar"]').first(); // Primer panel suele ser Super Life
  89  |     await expect(progressHost).toHaveAttribute('style', /width: 100%/);
  90  |     
  91  |     const progressP1 = p1.locator('div[class*="Bar"]').first();
  92  |     await expect(progressP1).toHaveAttribute('style', /width: 100%/);
  93  |     
  94  |     const progressP2 = p2.locator('div[class*="Bar"]').first();
  95  |     await expect(progressP2).toHaveAttribute('style', /width: 100%/);
  96  | 
  97  |     // Verificar botones en P1 y P2
  98  |     await expect(p1.getByRole('button', { name: '-10' })).toBeVisible();
  99  |     await expect(p1.getByRole('button', { name: '+10' })).toBeVisible();
  100 |     await expect(p2.getByRole('button', { name: '-5' })).toBeVisible();
  101 |     await expect(p2.getByRole('button', { name: '-1' })).toBeVisible();
  102 | 
  103 |     // --- PASO 3: Interactuar con el Súper Skrull ---
  104 |     
  105 |     // Pestaña 2 (Jugador 1): Click +10
  106 |     await p1.getByRole('button', { name: '+10' }).click();
  107 |     // Verificar: Sigue entera (100%)
  108 |     await expect(progressP1).toHaveAttribute('style', /width: 100%/);
  109 |     
  110 |     // Acción: Click -10 diez veces
  111 |     for (let i = 0; i < 10; i++) {
  112 |       await p1.getByRole('button', { name: '-10' }).click();
  113 |     }
  114 |     
  115 |     // Verificar: No está entera
  116 |     const widthP1 = await progressP1.evaluate(el => el.style.width);
  117 |     expect(parseFloat(widthP1)).toBeLessThan(100);
  118 |     
  119 |     // Verificar sincronización
```