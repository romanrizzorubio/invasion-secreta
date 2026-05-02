# Test E2E: Los valores del plan del Súper Skrull genera correctamente.

## Descripción
Vamos a crear 2 mesas con 4 jugadores cada una, una en normal y otra en experto, con esto el plan del Súper Skrull debería tener 56 de Umbral y 8 de Inicio.

## Archivo sugerido
`e2e/tests/super-skrull-scheme.spec.ts`

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
- Verificar: Hay una tabla contiene los cuatro héroes seleccionados en Mesa 1
- Verificar: Hay una tabla contiene los cuatro héroes seleccionados en Mesa 2
- Acción: Click en "Iniciar"

### Paso 2: Verificar carga inicial

**Todas las pestañas**:
- Verificar: Se ve el panel de amenaza del plan del Súper Skrull
- Verificar: La barra de amenaza muestra el porcentaje adecuado en base a 1/7

**Pestaña 1** (Host):
- Verificar: No están visibles los botones "-10", "-5", "-1", "+10", "+5" y "+1" correspondientes al panel de amenaza

**Pestaña 2** (Mesa 1):
- Verificar: Están visibles los botones "-10", "-5", "-1", "+10", "+5" y "+1" correspondientes al panel de amenaza

**Pestaña 3** (Mesa 2):
- Verificar: Están visibles los botones "-10", "-5", "-1", "+10", "+5" y "+1" correspondientes al panel de amenaza

### Paso 3: Modificar amenaza y validar sincronización

**Pestaña 2** (Mesa 1):
- Acción: Click en "-1" cuatro veces esperando `POST /super-plan` en cada click
- Verificar: La barra está vacía
- Verificar: Host y Mesa 2 muestran el mismo porcentaje de amenaza que Mesa 1

**Pestaña 3** (Mesa 2):
- Acción: Click en "+10" cinco veces esperando `POST /super-plan` en cada click
- Acción: Click en "+5" esperando `POST /super-plan`
- Acción: Click en "+1" esperando `POST /super-plan`
- Verificar: Se muestra "El Súper Skrull ha ganado la batalla"

**Pestaña 1** (Host):
- Verificar: Se muestra "El Súper Skrull ha ganado la batalla"
- Verificar: Se muestra el botón "Avanzar"

---

## Resultados esperados
- [ ] La partida se inicia correctamente.
- [ ] La amenaza inicial del Súper Skrull aparece con su valor inicial.
- [ ] Los cambios de amenaza se sincronizan entre host y mesas.
- [ ] La victoria del Súper Skrull aparece en host y jugadores.
- [ ] El host puede avanzar al terminar el combate.
