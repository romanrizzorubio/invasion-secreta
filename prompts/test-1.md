# Test E2E: Los valores de la vida del Súper Skrull genera correctamente.

## Descripción
Vamos a crear 2 mesas con 4 jugadores cada una, una en normal y otra en experto, con esto el Súper Skrull debería tener 108 de Vida.

## Pestañas necesarias
- **Pestaña 1**: Host
- **Pestaña 2**: Jugador 1
- **Pestaña 3**: Jugador 2

---

## Pasos del test

### Paso 1: Inicio de la partida
**Pestaña 1** (Host):
- Acción: Navegar a `/`
- Acción: Escribir en el Input 1 Hora más tarde de la hora actual
- Acción: Click en botón "Iniciar"
- Verificar: Se ve el reloj corriendo, el botón "Iniciar" deshabilitado y ya no existe el Input de type

**Pestaña 2** (Jugador 1):
- Acción: Esperar a que Pestaña 1 complete
- Acción: Navegar a `/table`
- Acción: Escribir en el Input el valor 1
- Acción: Click en "Iniciar"
- Acción: Seleccionar en el primer Select "Cable"
- Acción: Seleccionar en el segundo Select "Daredevil"
- Acción: Seleccionar en el tercer Select "Gamora"
- Acción: Seleccionar en el cuarto Select "Iron Man"
- Acción: Click en botón "Iniciar"
- Verificar: Debe salir una tabla con los 4 héroes seleccionados

**Pestaña 3** (Jugador 2):
- Acción: Navegar a `/table`
- Acción: Escribir en el Input el valor 2
- Acción: Click en "Iniciar"
- Acción: Seleccionar en el primer Select "Ojo de Halcón"
- Acción: Seleccionar en el segundo Select "Hombre Hormiga"
- Acción: Seleccionar en el tercer Select "Mujer Invisible"
- Acción: Seleccionar en el cuarto Select "Rondador Nocturno"
- Acción: Click en botón "Crear"

**Pestaña 1** (Host):
- Acción: Esperar a que Pestaña 1 complete
- Acción: Esperar a que Pestaña 2 complete
- Acción: Click en botón "Iniciar"

### Paso 2: Verificar carga inicial del Súper Skrull
**Pestaña 1** (Host):
- Verificar: Se ve el panel del Súper Skrull con la barra de progreso entera

**Pestaña 2** (Jugador 1):
- Verificar: Se ve el panel del Súper Skrull con la barra de progreso entera
- Verificar: Se ve el panel del Súper Skrull con la barra de progreso entera y botones debajo de "-10", "-5", "-1", "+10", "+5" y "+1" 

**Pestaña 3** (Jugador 2):
- Verificar: Se ve el panel del Súper Skrull con la barra de progreso entera
- Verificar: Se ve el panel del Súper Skrull con la barra de progreso entera y botones debajo de "-10", "-5", "-1", "+10", "+5" y "+1" 

### Paso 2: Interactuar con el Súper Skrull
**Pestaña 2** (Jugador 1):
- Acción: Click en botón "+10" del Súper Skrull
- Verificar: La barra de progreso del Súper Skrull sigue entera
- Acción: Click en botón "-10" del Súper Skrull 10 veces
- Verificar: La barra de progreso del Súper Skrull no está entera
- Verificar: La barra de progreso del Súper Skrull tiene el mismo ancho que en Pestaña 1 y Pestaña 3

**Pestaña 3** (Jugador 2):
- Acción: Esperar a que Pestaña 2 complete
- Acción: Click en botón "-1" del Súper Skrull 2 veces
- Acción: Click en botón "-5" del Súper Skrull
- Acción: Click en botón "-1" del Súper Skrull
- Verificar: Se muestra imagen del Súper Skrull derrotado

- **Pestaña 1** (Host):
- Acción: Esperar a que Pestaña 3 complete
- Verificar: Se muestra imagen del Súper Skrull derrotado
- Verificar: Se muestra Botón "Avanzar"

---

## Resultados esperados
- [ ] Se cumplen todos los casos de prueba
- [ ] Todas las pestañas sincronizadas
