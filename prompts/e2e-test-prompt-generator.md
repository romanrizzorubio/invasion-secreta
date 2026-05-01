# Generador de prompts para nuevos tests E2E

Usa este documento como plantilla para escribir prompts que sirvan para generar tests E2E de Playwright en este proyecto.

El prompt resultante debe describir el flujo en lenguaje natural, pero con suficiente detalle para que se pueda convertir directamente en un archivo `*.spec.ts`.

---

## Prompt base

```md
# Test E2E: [Nombre claro del comportamiento que se quiere validar]

## Descripción
[Explica el objetivo del test en 1 o 2 frases.]

Debe quedar claro:
- Qué funcionalidad se prueba.
- Qué estado inicial se necesita.
- Qué resultado final demuestra que el flujo funciona.
- Si hay varias pestañas, mesas, jugadores, modos o sincronización entre clientes.

## Archivo sugerido
`e2e/tests/[nombre-del-test].spec.ts`

## Pestañas necesarias
- **Pestaña 1**: [Host / Jugador / Rol principal]
- **Pestaña 2**: [Jugador / Mesa / Rol secundario]
- **Pestaña 3**: [Jugador / Mesa / Rol secundario, si aplica]

Cada pestaña debe implementarse con un `browser.newContext()` independiente y una `newPage()` propia.

---

## Datos de prueba
- URL base: `http://localhost:3000`
- Rutas usadas:
  - `[ruta 1]`
  - `[ruta 2]`
- Valores de formularios:
  - `[Campo]`: `[Valor]`
- Selecciones:
  - `[Select o checkbox]`: `[Valor]`
- Endpoints relevantes para esperar sincronización:
  - `[POST /endpoint]`

---

## Pasos del test

### Paso 1: [Preparación o inicio del flujo]

**Pestaña 1** ([Rol]):
- Acción: Navegar a `[ruta]`
- Acción: [Completar input, seleccionar opción o hacer click]
- Verificar: [Estado visible esperado]
- Verificar: [Estado de botón, input, tabla, panel o texto]

**Pestaña 2** ([Rol]):
- Acción: Esperar a que Pestaña 1 complete si depende de ella
- Acción: Navegar a `[ruta]`
- Acción: [Completar datos propios]
- Verificar: [Estado esperado]

**Pestaña 3** ([Rol, opcional]):
- Acción: [Paso necesario]
- Verificar: [Estado esperado]

### Paso 2: [Validación del estado compartido]

**Todas las pestañas relevantes**:
- Verificar: [El mismo estado aparece sincronizado]
- Verificar: [Los controles esperados están visibles solo donde corresponde]

**Pestaña 1** ([Rol]):
- Verificar: [Estado host]

**Pestaña 2** ([Rol]):
- Verificar: [Estado jugador]

### Paso 3: [Interacciones y sincronización]

**Pestaña 2** ([Rol]):
- Acción: Click en `[botón]`
- Acción: Esperar respuesta `POST [endpoint]` si la acción actualiza estado remoto
- Verificar: [Cambio local esperado]
- Verificar: [El estado sigue dentro de límites, si aplica]

**Pestaña 3** ([Rol]):
- Acción: Esperar a que Pestaña 2 complete si depende de esa actualización
- Acción: [Interacción adicional]
- Verificar: [Cambio esperado]

**Pestaña 1** ([Host]):
- Acción: Esperar a que las pestañas anteriores completen
- Verificar: [El host refleja el estado final]

### Paso 4: [Validaciones finales]

**Todas las pestañas relevantes**:
- Verificar: [Estado final coherente]
- Verificar: [No quedan controles incorrectos visibles]

**Pestaña 1** ([Host]):
- Verificar: [Botón, mensaje o transición final]

---

## Resultados esperados
- [ ] Se completa el flujo principal.
- [ ] Las pestañas quedan sincronizadas.
- [ ] Los datos visibles coinciden con las acciones realizadas.
- [ ] El estado final esperado aparece en la pestaña correcta.

## Reglas para generar el test Playwright
- Importar desde `@playwright/test`: `test`, `expect` y solo los tipos necesarios como `Page` o `Locator`.
- Crear un `test.describe` con el mismo nombre del prompt.
- Crear una pestaña por rol usando contextos independientes:
  - `const contextHost = await browser.newContext();`
  - `const host = await contextHost.newPage();`
- Usar `baseURL = 'http://localhost:3000'` salvo que el proyecto ya configure otra URL.
- Preferir selectores accesibles:
  - `getByRole`
  - `getByLabel`
  - `getByText`
  - `locator('table')` solo cuando sea necesario.
- Cuando un click dispare una petición remota, crear un helper similar a:
  - `clickAndWaitForPost(page, button, endpoint)`
- Para cambios asíncronos o sincronización entre pestañas, usar `expect.poll`.
- Si se compara una barra de progreso, obtener el porcentaje real desde el estilo calculado o desde la clase CSS que define el ancho.
- Si el flujo depende de una hora futura, evitar tests frágiles al cruzar medianoche con `test.skip` cuando el input no soporte fecha futura.
- Cerrar todos los contextos al final del test.
- No usar esperas fijas salvo que no exista una señal observable mejor.
- Mantener comentarios breves por paso, alineados con las secciones del prompt.

## Detalles que el prompt debe especificar siempre
- Nombre exacto de botones, labels, textos y opciones de select.
- Rutas exactas que visita cada pestaña.
- Orden de dependencia entre pestañas.
- Qué acciones deben esperar una respuesta de red.
- Qué elementos deben existir, desaparecer, estar habilitados o deshabilitados.
- Qué estados deben estar sincronizados entre pestañas.
- Cuál es el estado final que da por válido el test.

## Casos edge a considerar
- Inputs con validación de hora o fecha.
- Estados que llegan por WebSocket, polling o petición HTTP.
- Diferencias entre modo normal y experto.
- Botones que solo aparecen para jugadores y no para host.
- Límites máximos y mínimos de valores como vida, puntuación o contadores.
- Textos finales de victoria, derrota o avance de fase.

## Notas adicionales
- Si el prompt menciona un botón con un nombre distinto al que existe en la UI, el test generado debe usar el nombre real y dejar un comentario breve.
- Si el estado se actualiza de forma compartida, validar al menos en dos pestañas.
- Si una acción cambia valores numéricos, validar tanto el cambio local como la propagación al resto de pestañas.
```

---

## Ejemplo de prompt generado

```md
# Test E2E: La vida del Súper Skrull se sincroniza entre mesas

## Descripción
Crear una partida con host y dos mesas. La primera mesa usa modo normal y la segunda modo experto. Al iniciar la partida, la vida del Súper Skrull debe aparecer completa y sincronizada en host y jugadores. Al modificar la vida desde distintas pestañas, todos los clientes deben reflejar el mismo estado y mostrar la derrota al llegar a cero.

## Archivo sugerido
`e2e/tests/super-skrull-health.spec.ts`

## Pestañas necesarias
- **Pestaña 1**: Host
- **Pestaña 2**: Mesa 1
- **Pestaña 3**: Mesa 2

---

## Pasos del test

### Paso 1: Inicio de la partida

**Pestaña 1** (Host):
- Acción: Navegar a `/`
- Acción: Escribir una hora futura válida en "Hora de finalización"
- Acción: Click en botón "Iniciar"
- Verificar: Se ve el reloj corriendo
- Verificar: El botón "Iniciar" queda deshabilitado
- Verificar: El input "Hora de finalización" ya no está visible

**Pestaña 2** (Mesa 1):
- Acción: Navegar a `/table`
- Acción: Escribir `1` en "Mesa"
- Acción: Click en "Iniciar"
- Acción: Seleccionar "Cable", "Daredevil", "Gamora" e "Iron Man"
- Acción: Click en "Iniciar"
- Verificar: La tabla contiene los cuatro héroes seleccionados

**Pestaña 3** (Mesa 2):
- Acción: Navegar a `/table`
- Acción: Escribir `2` en "Mesa"
- Acción: Click en "Iniciar"
- Acción: Marcar "Experto"
- Acción: Seleccionar "Ojo de Halcón", "Hombre Hormiga", "Mujer Invisible" y "Rondador Nocturno"
- Acción: Click en "Iniciar"

**Pestaña 1** (Host):
- Acción: Esperar a que las dos mesas estén creadas
- Acción: Click en "Iniciar"

### Paso 2: Verificar carga inicial

**Todas las pestañas**:
- Verificar: Se ve el panel de vida del Súper Skrull
- Verificar: La barra de vida está completa

**Pestaña 2** (Mesa 1):
- Verificar: Están visibles los botones "-10", "-5", "-1", "+10", "+5" y "+1"

**Pestaña 3** (Mesa 2):
- Verificar: Están visibles los botones "-10", "-5", "-1", "+10", "+5" y "+1"

### Paso 3: Modificar vida y validar sincronización

**Pestaña 2** (Mesa 1):
- Acción: Click en "+10" y esperar `POST /super-life`
- Verificar: La barra sigue completa
- Acción: Click en "-10" diez veces esperando `POST /super-life` en cada click
- Verificar: La barra ya no está completa
- Verificar: Host y Mesa 2 muestran el mismo porcentaje de vida

**Pestaña 3** (Mesa 2):
- Acción: Click en "-1" dos veces esperando `POST /super-life`
- Acción: Click en "-5" esperando `POST /super-life`
- Acción: Click en "-1" esperando `POST /super-life`
- Verificar: Se muestra "El Súper Skrull ha perdido la batalla"

**Pestaña 1** (Host):
- Verificar: Se muestra "El Súper Skrull ha perdido la batalla"
- Verificar: Se muestra el botón "Avanzar"

---

## Resultados esperados
- [ ] La partida se inicia correctamente.
- [ ] La vida inicial del Súper Skrull aparece completa.
- [ ] Los cambios de vida se sincronizan entre host y mesas.
- [ ] La derrota del Súper Skrull aparece en host y jugadores.
- [ ] El host puede avanzar al terminar el combate.
```
