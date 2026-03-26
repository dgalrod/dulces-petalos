# Dulces Petalos

Floristeria online que consume la API REST de Dulces Petalos para mostrar un catalogo de plantas con busqueda en tiempo real y vista de detalle.

## Levantar el proyecto

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local

# 3. Arrancar en modo desarrollo
pnpm dev

# 4. Abrir http://localhost:3000
```

### Otros comandos

```bash
pnpm build        # Build de produccion
pnpm test         # Tests unitarios (Vitest)
pnpm test:watch   # Tests en modo watch
pnpm lint         # ESLint
```

## Stack tecnico

| Capa       | Tecnologia                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 16 (App Router, Turbopack)               |
| UI         | React 19, Tailwind CSS 4                         |
| Lenguaje   | TypeScript (strict)                              |
| Testing    | Vitest + Testing Library                         |
| Tipografia | Nunito (headings) + DM Sans (body) via next/font |

## Estructura del proyecto

```
app/
  page.tsx                    # Listado de productos (Server Component)
  loading.tsx                 # Skeleton del listado
  error.tsx                   # Error boundary del listado
  products/[id]/
    page.tsx                  # Detalle de producto (Server Component)
    loading.tsx               # Skeleton del detalle
    error.tsx                 # Error boundary del detalle
components/
  products/
    ProductCard.tsx            # Card de producto con enlace al detalle
    ProductGrid.tsx            # Grid responsive (1 → 2 → 3 columnas)
    ProductCatalog.tsx         # Client Component: orquesta busqueda + grid
    ProductDetail.tsx          # Vista de detalle con breadcrumbs
    ProductCardSkeleton.tsx    # Skeleton de una card
  ui/
    SearchInput.tsx            # Input de busqueda reutilizable
hooks/
  useProductFilter.ts          # Logica de filtrado (hook + funcion pura)
lib/
  api/
    client.ts                  # Fetch generico con ApiError tipado
    products.ts                # getProducts(), getProductById()
  types/
    product.ts                 # Tipos del dominio
```

## Decisiones tecnicas

### Patron Server + Client

El fetch se ejecuta en el Server Component (`page.tsx`) y los datos se pasan como props al Client Component (`ProductCatalog`). Esto permite:

- Que el usuario vea contenido en el primer render sin esperar a que se descargue JS
- Que el filtrado sea instantaneo en el cliente sin nuevas peticiones al servidor
- Mantener la URL de la API fuera del bundle del cliente

### Link explicito vs router.back()

El boton "volver" en la vista de detalle es un `<Link href="/">`, no un `router.back()`. Un `router.back()` sacaria al usuario de la app si llego directamente a la URL del producto (bookmark, enlace externo). El breadcrumb "Inicio > Producto" del diseno de Figma refuerza que la navegacion debe ser explicita y predecible.

### filterProducts como funcion pura exportada

El hook `useProductFilter` envuelve `filterProducts`, que esta exportada por separado. Esto permite testear la logica de filtrado sin montar React — es el test mas valioso de la suite y el mas rapido de ejecutar.

### ApiError como clase tipada

Extiende `Error` con un campo `status` numerico. Permite discriminar errores HTTP en los consumidores (`err instanceof ApiError && err.status === 404`) sin parsear strings.

### API_URL obligatoria sin fallback

No hay URL hardcodeada como fallback. Si la variable de entorno no esta definida, la app lanza un error explicito en tiempo de ejecucion. Evita que un despliegue mal configurado funcione parcialmente contra una URL incorrecta.

### CSS Grid en vez de Flexbox para el catalogo

Se usa `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` en vez de flexbox con `min-width`. Grid garantiza columnas uniformes y un maximo estricto de 3 por fila sin hacks de `calc()`. El primer intento fue con flexbox y no respetaba el limite — lo corregi al verificar visualmente.

## Uso de IA

He utilizado **Claude Code** (CLI de Anthropic, modelo Claude Opus 4.6) como asistente durante todo el desarrollo, junto con el **Figma MCP server** para extraer el diseno directamente desde el archivo de Figma.

### Que le pedi

- Explorar los endpoints de la API con `curl` y generar los tipos TypeScript a partir de las respuestas reales
- Scaffolding de la capa de datos (`client.ts`, `products.ts`, `product.ts`)
- Traducir el diseno de Figma a componentes React+Tailwind usando el contexto que devuelve el MCP de Figma (nodos, tokens, screenshot)
- Tests unitarios para `filterProducts`, `ProductCard` y `client.ts`

### Que acepte tal cual

- Los tipos del dominio y la capa de datos — eran directos y derivaban de la respuesta real de la API
- La estructura de tests para `filterProducts` — cubria bien los edge cases (acentos, whitespace, match parcial)
- Los skeletons de loading y los error boundaries

### Que corregi o rechace

- **URL hardcodeada como fallback**: el primer intento de `client.ts` tenia `?? "https://..."`. Le pedi que lanzara error si faltaba `API_URL` — en produccion un fallback silencioso es un bug esperando a ocurrir
- **Flexbox para el grid de productos**: no limitaba a 3 columnas correctamente, lo cambie a CSS Grid tras verificar en el navegador
- **Tests de la capa API al principio**: los rechace inicialmente porque no aportan valor diferencial en una prueba tecnica. Los implementamos despues como complemento
- **Tipo del record `FERTILIZER_LABEL`**: venia tipado como `Record<string, string>`, lo cambie a `Record<FertilizerType, string>` para que el compilador avise si se anade un nuevo tipo de fertilizante
- **Cleanup de Testing Library**: los tests de componentes fallaban porque Vitest con `globals: false` no ejecutaba el cleanup automatico. Tuve que anadir `afterEach(cleanup)` al setup

## Que haria con mas tiempo

- **Accesibilidad**: audit con axe-core, asegurar contraste WCAG AA, `aria-label` en iconos SVG, link de skip-to-content
- **Debounce en la busqueda**: actualmente filtra en cada keystroke. Con mas productos convendria `useDeferredValue` o debounce para evitar re-renders innecesarios
- **Tests e2e**: flujo completo listado → buscar → detalle → volver con Playwright
- **Paginacion**: la API devuelve 8 productos, pero con cientos habria que implementar paginacion o scroll infinito
- **SEO dinamico**: `generateMetadata` en la pagina de detalle para title/description por producto
- **Cache y revalidacion**: configurar estrategia de cache en los Server Components para no golpear la API en cada request
- **Carrito funcional**: el boton "Anadir al carrito" no tiene logica — requeriria estado global (Context o Zustand) y persistencia
