# Condiciones técnicas para generar tests E2E

Usa este documento como contexto técnico adicional cuando el prompt funcional pida generar un test E2E de Playwright para este proyecto.

El prompt funcional debe describir el flujo de negocio, las pestañas implicadas, los datos de prueba y los resultados esperados. Este documento define las condiciones de implementación que debe cumplir el archivo `*.spec.ts` generado.

---

## Stack y archivo

- Generar tests E2E con Playwright.
- Crear el archivo en `e2e/tests/[nombre-del-test].spec.ts`.
- Importar desde `@playwright/test`:
  - `test`
  - `expect`
  - Solo los tipos necesarios, como `Page` o `Locator`.
- Crear un `test.describe` con el mismo nombre funcional indicado en el prompt.
- Usar `baseURL = 'http://localhost:3000'` salvo que la configuración existente del proyecto ya defina otra URL.

---

## Gestión de pestañas y contextos

- Cada pestaña, jugador, host, mesa o rol debe ejecutarse en un contexto independiente.
- Crear cada pestaña con `browser.newContext()` y `context.newPage()`.
- No reutilizar el mismo contexto para roles distintos si el test valida sincronización entre clientes.
- Nombrar las páginas de forma explícita según el rol:
  - `host`
  - `tableOne`
  - `tableTwo`
  - `player`
- Cerrar todos los contextos al final del test.

Ejemplo:

```ts
const contextHost = await browser.newContext();
const host = await contextHost.newPage();

const contextTableOne = await browser.newContext();
const tableOne = await contextTableOne.newPage();
```

---

## Selectores

- Preferir selectores accesibles y estables:
  - `getByRole`
  - `getByLabel`
  - `getByText`
  - `getByPlaceholder`
- Usar `locator('table')`, selectores CSS o selectores por estructura solo cuando no exista una alternativa accesible razonable.
- El test debe usar los nombres reales visibles en la UI.
- Si el prompt funcional menciona un botón, label o texto con un nombre diferente al existente en la interfaz, usar el nombre real y dejar un comentario breve explicando el ajuste.
- Evitar selectores frágiles basados en índices salvo que el estado del DOM sea estable y el prompt lo justifique.

---

## Sincronización y red

- No usar esperas fijas salvo que no exista una señal observable mejor.
- Cuando un click dispare una actualización remota, esperar la petición correspondiente.
- Crear un helper reutilizable si varias acciones hacen click y esperan un `POST`.
- El helper debe recibir la página, el control accionable y el endpoint esperado.

Ejemplo:

```ts
async function clickAndWaitForPost(page: Page, button: Locator, endpoint: string) {
  await Promise.all([
    page.waitForResponse(response =>
      response.url().includes(endpoint) &&
      response.request().method() === 'POST' &&
      response.ok()
    ),
    button.click(),
  ]);
}
```

- Para estados propagados entre pestañas por WebSocket, polling o peticiones HTTP, usar `expect.poll` o una expectativa observable equivalente.
- Cuando una pestaña dependa de acciones previas de otra, ordenar el flujo de forma explícita.
- Validar la sincronización en al menos dos pestañas cuando el estado sea compartido.

---

## Validaciones obligatorias

El test generado debe verificar los elementos relevantes del flujo, no solo ejecutar acciones.

Debe validar, cuando aplique:

- Que los textos, paneles, formularios, tablas o botones esperados aparecen.
- Que los controles incorrectos desaparecen o no están visibles.
- Que los botones quedan habilitados o deshabilitados según el estado.
- Que los valores numéricos cambian de acuerdo con la acción realizada.
- Que los valores propagados coinciden entre pestañas.
- Que el estado final del flujo aparece en la pestaña correcta.
- Que los roles tienen permisos visuales coherentes, por ejemplo controles visibles para jugadores pero no para host.

---

## Barras de progreso y valores visuales

- Si el test compara una barra de progreso, obtener el valor real desde el estilo calculado, atributo accesible o clase CSS que determine el ancho.
- No asumir el porcentaje solo por el texto visible si la UI representa el estado mediante estilos.
- Validar límites máximos y mínimos cuando el flujo modifique vida, puntuación, contadores u otros valores acotados.
- Si una acción intenta superar un límite, verificar que el valor se mantiene dentro del rango esperado.

---

## Fechas y horas

- Si el flujo depende de una hora futura, generar un valor dinámico válido.
- Evitar tests frágiles al cruzar medianoche.
- Si el input no soporta fecha futura y el test puede fallar cerca de medianoche, usar `test.skip` con una condición clara.
- No usar una hora fija que pueda quedar en el pasado según el momento de ejecución.

---

## Organización del test

- Mantener el orden del test alineado con los pasos del prompt funcional.
- Incluir comentarios breves por bloque cuando ayuden a reconocer las secciones del flujo.
- Evitar comentarios que repitan literalmente cada línea de código.
- Extraer helpers solo cuando reduzcan duplicación real o hagan más clara una espera compleja.
- Mantener el test legible como una narración técnica del flujo funcional.

---

## Ejecución y permisos

- Verificar el test generado con el comando de E2E del proyecto, normalmente `npm run test:e2e -- e2e/tests/[nombre-del-test].spec.ts`.
- Si Playwright debe levantar servidores locales mediante `webServer` y el entorno bloquea la escucha en puertos como `3000` o `4000` con errores tipo `listen EPERM`, pedir permisos escalados para ejecutar el comando de verificación.
- Al pedir permisos escalados, justificar que Playwright necesita levantar backend y frontend locales para comprobar el test E2E.
- No cambiar la configuración de puertos ni el test para evitar el bloqueo del sandbox si el problema es únicamente de permisos de ejecución.

---

## Información que debe venir del prompt funcional

Antes de generar el test, el prompt funcional debe especificar:

- Nombre claro del comportamiento a validar.
- Ruta exacta que visita cada pestaña.
- Rol de cada pestaña.
- Datos de formularios.
- Opciones de selects, checkboxes o controles equivalentes.
- Nombre exacto de botones, labels, textos y opciones visibles.
- Orden de dependencia entre pestañas.
- Acciones que deben esperar una respuesta de red.
- Endpoints relevantes, especialmente los `POST`.
- Elementos que deben existir, desaparecer, estar habilitados o deshabilitados.
- Estados compartidos que deben quedar sincronizados.
- Estado final que da por válido el test.

Si falta información crítica, el generador debe inferirla desde el código existente solo cuando sea evidente. Si no es evidente, debe pedir aclaración antes de implementar el test.

---

## Casos edge a considerar

Al generar el test, revisar si el flujo implica alguno de estos casos:

- Inputs con validación de hora o fecha.
- Estados que llegan por WebSocket, polling o petición HTTP.
- Diferencias entre modo normal y experto.
- Botones visibles solo para jugadores, mesas o host.
- Límites máximos y mínimos de vida, puntuación o contadores.
- Textos finales de victoria, derrota o avance de fase.
- Creación de varias mesas o clientes simultáneos.
- Propagación de estado entre clientes después de varias acciones consecutivas.

---

## Criterios de aceptación del test generado

- El test reproduce el flujo principal descrito por el prompt funcional.
- Cada rol se ejecuta en su propio contexto de navegador.
- Las acciones remotas esperan señales de red u otra señal observable.
- Las aserciones validan estado local y estado sincronizado.
- El test evita esperas fijas.
- El estado final queda comprobado en las pestañas relevantes.
- Los contextos se cierran correctamente.
