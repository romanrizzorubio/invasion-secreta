# Invasión Secreta

Monorepo para el proyecto Invasión Secreta, conteniendo backend y frontend.

## Estructura del proyecto

```
invasion-secreta/
├── packages/
│   ├── back/          # Backend (Express + Socket.IO)
│   └── front/         # Frontend (React)
├── docker-compose.yml
├── docker-compose.dev.yml
└── package.json
```

## Requisitos

- Node.js >= 18
- npm >= 8
- Docker y Docker Compose (para despliegue con Docker)

## Instalación

Desde la raíz del proyecto:

```bash
npm install
```

Esto instalará todas las dependencias de todos los packages del monorepo.

## Comandos disponibles

### Desarrollo

```bash
# Ejecutar ambos proyectos simultáneamente
npm run dev

# Ejecutar solo el backend (puerto 4000)
npm run dev:back

# Ejecutar solo el frontend (puerto 3000)
npm run dev:front
```

### Build

```bash
# Construir ambos proyectos
npm run build

# Construir solo el backend
npm run build:back

# Construir solo el frontend
npm run build:front
```

### Tests

```bash
# Ejecutar todos los tests de ambos proyectos
npm run test

# Ejecutar solo tests unitarios de todos los proyectos
npm run test:unit

# Ejecutar solo tests de integración de todos los proyectos
npm run test:integration

# Ejecutar tests del backend
npm run test:back

# Ejecutar tests del frontend
npm run test:front
```

### Linting y Formateo

```bash
# Ejecutar lint en ambos proyectos
npm run lint

# Ejecutar lint y auto-fix en ambos proyectos
npm run lint:fix

# Lint individual
npm run lint:back
npm run lint:front
```

### TypeScript

```bash
# Verificar tipos en ambos proyectos
npm run typecheck

# Verificar tipos individual
npm run typecheck:back
npm run typecheck:front
```

## Docker

### Producción

```bash
# Construir las imágenes
npm run docker:build

# Levantar los contenedores
npm run docker:up

# Construir y levantar en un solo comando
npm run docker:dev

# Detener los contenedores
npm run docker:down
```

**Puertos en producción:**
- Frontend: `http://localhost:80`
- Backend: `http://localhost:4000`

### Desarrollo con Docker (hot-reload)

```bash
# Levantar en modo desarrollo con volúmenes montados
docker-compose -f docker-compose.dev.yml up --build

# Detener
docker-compose -f docker-compose.dev.yml down
```

**Puertos en desarrollo:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Configuración compartida

El monorepo comparte configuraciones comunes en la raíz:

- **TypeScript**: `tsconfig.base.json` - Configuración base extendida por cada package
- **ESLint**: `eslint.config.js` - Reglas de linting compartidas
- **Prettier**: `.prettierrc.json` - Formato de código unificado

## Packages

### Backend (`packages/back`)

Backend construido con Express y Socket.IO.

**Tecnologías:**
- Express 5
- Socket.IO
- TypeScript
- Cors
- Vitest (testing framework)
- Supertest (API testing)

**Comandos específicos** (desde `packages/back/`):
```bash
npm run dev              # Desarrollo con hot-reload
npm run build            # Compilar TypeScript
npm run start            # Ejecutar versión compilada
npm run test             # Ejecutar todos los tests
npm run test:unit        # Ejecutar solo tests unitarios
npm run test:integration # Ejecutar solo tests de integración
npm run test:watch       # Tests en modo watch
npm run test:ui          # Tests con interfaz visual
npm run test:coverage    # Tests con cobertura
```

**Estructura de tests:**
- `test/unit/` - Tests unitarios organizados por carpetas (model, services, sockets, store)
- `test/integration/` - Tests de integración de rutas y API

### Frontend (`packages/front`)

Frontend construido con React.

**Tecnologías:**
- React 18
- React Router DOM
- Socket.IO Client
- Styled Components
- Jest + Testing Library

**Comandos específicos** (desde `packages/front/`):
```bash
npm run start            # Desarrollo (puerto 3000)
npm run build            # Build para producción
npm run test             # Ejecutar todos los tests
npm run test:unit        # Ejecutar solo tests unitarios
npm run test:integration # Ejecutar solo tests de integración
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Tests con cobertura
```

## Despliegue

### Con Docker (recomendado)

```bash
npm run docker:build
npm run docker:up
```

### Manual

1. Construir ambos proyectos:
```bash
npm run build
```

2. El backend generará archivos en `packages/back/dist/`
3. El frontend generará archivos en `packages/front/build/`

4. Iniciar backend:
```bash
npm run start:back
```

5. Servir frontend con un servidor web (nginx, Apache, etc.)

## Variables de entorno

Crear archivos `.env` en cada package según sea necesario:

**Backend** (`packages/back/.env`):
```env
PORT=4000
NODE_ENV=production
```

**Frontend** (`packages/front/.env`):
```env
REACT_APP_API_URL=http://localhost:4000
```

## Contribuir

1. Instalar dependencias: `npm install`
2. Crear rama para tu feature
3. Ejecutar tests: `npm run test`
4. Verificar linting: `npm run lint`
5. Verificar tipos: `npm run typecheck`
6. Commit y push

## Licencia

ISC
