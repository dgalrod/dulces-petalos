# Dulces Petalos — Agent Guidelines

## Project overview

Floristeria online con Next.js 16 (App Router). Dos vistas: listado de productos con busqueda y detalle de producto. Consume la API REST de `dulces-petalos.jakala.es`.

## Architecture rules

### Server vs Client boundary

- **Server Components** (`app/**/page.tsx`): hacen el fetch de datos. No usan hooks ni estado.
- **Client Components** (`"use client"`): gestionan interactividad (busqueda, navegacion). Reciben datos por props desde el server.
- No mover fetch al cliente. La API se llama siempre desde el servidor.

### Directory conventions

| Directorio    | Proposito                  | Regla                                                                                   |
| ------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| `app/`        | Rutas y layouts de Next.js | Solo page, layout, loading, error. Sin logica de negocio.                               |
| `components/` | Componentes React          | Agrupados por dominio (`products/`, `ui/`). Sin fetch ni acceso a API.                  |
| `hooks/`      | Custom hooks               | Logica de estado/filtrado. Exportar siempre la funcion pura junto al hook para testing. |
| `lib/api/`    | Capa de datos              | Funciones async que llaman a `fetchApi`. Sin dependencia de React.                      |
| `lib/types/`  | Tipos del dominio          | Interfaces y tipos compartidos. Source of truth para el shape de datos.                 |

### Patterns to follow

- Nuevos endpoints: crear funcion en `lib/api/` que use `fetchApi` de `client.ts`.
- Nuevos filtros/logica: crear hook en `hooks/` con la funcion pura exportada por separado.
- Nuevas paginas: crear directorio en `app/` con `page.tsx`, `loading.tsx` y `error.tsx`.
- Componentes de UI genericos (botones, inputs): van en `components/ui/`.
- Componentes de dominio (cards, grids, detalles): van en `components/{dominio}/`.

### Patterns to avoid

- No usar `router.back()` para navegacion — usar `<Link>` con ruta explicita.
- No hardcodear URLs de API — usar `process.env.API_URL` via `fetchApi`.
- No poner logica de negocio en componentes — extraerla a hooks o funciones puras en `lib/`.
- No crear `"use client"` en `page.tsx` — crear un componente cliente separado y pasarle los datos como props.

## Styling

- **Tailwind CSS 4** con `@theme inline` para tokens custom.
- Fuentes: `font-heading` (Nunito) para titulos/precios, `font-body` (DM Sans) para texto.
- Colores del diseno: `#f9f9f9` (fondo), `#111` (texto principal), `#606060` (texto secundario), `#771e42` (accent/CTA), `#bbb` (bordes).
- Border radius: `rounded-[32px]` (cards), `rounded-3xl` (imagenes), `rounded-full` (botones/pills), `rounded-lg` (inputs).

## Testing

- Runner: Vitest + Testing Library.
- Setup en `vitest.setup.ts` incluye `afterEach(cleanup)` — necesario porque `globals: false`.
- Tests junto al codigo: `__tests__/` dentro del directorio del modulo.
- Priorizar tests de logica pura (hooks/funciones) sobre tests de componentes.
- Mock de `fetch` con `vi.stubGlobal("fetch", mockFn)`. Setear `process.env.API_URL` en `beforeEach`.

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build
pnpm test         # Vitest run
pnpm test:watch   # Vitest watch mode
pnpm lint         # ESLint
```

## Environment

Requiere `.env.local` con:

```
API_URL=https://dulces-petalos.jakala.es/api/v1
```

La app lanza error si no esta definida — no hay fallback.
