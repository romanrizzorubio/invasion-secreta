# Test E2E: [Nombre del test]

## Descripción
Breve descripción de qué flujo o funcionalidad se está probando.

## Pestañas necesarias
- **Pestaña 1**: Jugador 1 / Host
- **Pestaña 2**: Jugador 2
- **Pestaña 3**: Jugador 3 (opcional)

---

## Pasos del test

### Paso 1: [Título del paso]
**Pestaña 1** (Jugador 1):
- Acción: Navegar a `/`
- Acción: Click en botón "Crear Partida"
- Verificar: Se muestra el código de sala
- Capturar: `roomCode` para usar en otras pestañas

**Pestaña 2** (Jugador 2):
- Acción: Esperar a que Pestaña 1 complete
- Acción: Navegar a `/`
- Acción: Click en "Unirse a Partida"

### Paso 2: [Título del paso]
**Pestaña 1** (Jugador 1):
- Acción: Seleccionar configuración de partida
- Acción: Click en "Iniciar Juego"
- Verificar: Transición a pantalla de juego

**Pestaña 2** (Jugador 2):
- Acción: Ingresar `roomCode` capturado
- Acción: Click en "Entrar"
- Verificar: Aparece en la lista de jugadores

**Pestaña 3** (Jugador 3):
- Acción: [Similar a Pestaña 2]

### Paso 3: [Título del paso - Interacción simultánea]
**Todas las pestañas**:
- Acción: Esperar evento WebSocket "game_started"
- Verificar: Todas las pestañas muestran la pantalla de juego

**Pestaña 1** (Jugador 1):
- Acción: Realizar jugada
- Verificar: Se actualiza el estado

**Pestaña 2** (Jugador 2):
- Verificar: Recibe actualización de la jugada de Pestaña 1
- Acción: Realizar su propia jugada

### Paso 4: [Validaciones finales]
**Pestaña 1**:
- Verificar: Estado final esperado
- Verificar: Puntuación correcta

**Pestaña 2**:
- Verificar: Sincronización con Pestaña 1

---

## Resultados esperados
- [ ] Resultado 1
- [ ] Resultado 2
- [ ] Todas las pestañas sincronizadas

## Casos edge a considerar
- ¿Qué pasa si un jugador se desconecta?
- ¿Qué pasa si hay timeout?
- ¿Qué pasa si las acciones llegan en desorden?

## Notas adicionales
- Consideraciones especiales
- Tiempos de espera específicos
- Datos de prueba necesarios
