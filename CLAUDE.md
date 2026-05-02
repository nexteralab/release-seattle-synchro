# Seattle Synchro - Lineamientos de Diseño

## Identidad de Marca

Seattle Synchro es el equipo premier de natación artística del Noroeste de Estados Unidos. La identidad visual refleja elegancia, precisión y excelencia atlética a través de un diseño limpio, moderno y profesional.

### Valores de Marca
- **Excelencia**: Estándares de alto rendimiento en todos los aspectos
- **Precisión**: Atención al detalle en movimiento y diseño
- **Comunidad**: Sentido de pertenencia y apoyo mutuo
- **Profesionalismo**: Presentación de nivel competitivo

---

## Paleta de Colores

### Colores Principales

#### Azul Marino (Primary Brand Color)
```
HEX: #0A0A67
RGB: 10, 10, 103
Uso: Logo, headings principales (h1, h2, h3 sobre fondo blanco), botones CTA, navegación activa
```

#### Negro (Secondary Brand Color)
```
HEX: #021521 o #030213
RGB: 2, 21, 33 / 3, 2, 19
Uso: Texto en headings sobre fondos claros, íconos, elementos de énfasis
```

#### Gris Oscuro
```
HEX: #171717
RGB: 23, 23, 23
Uso: Headings alternativos, texto de navegación
```

### Colores de Texto

#### Texto Principal
```
HEX: #737373
RGB: 115, 115, 115
Uso: Párrafos, descripciones, body text
```

#### Texto Secundario
```
HEX: #a1a1a1
RGB: 161, 161, 161
Uso: Texto de menor jerarquía, copyright, metadatos
```

### Colores de Fondo

#### Blanco
```
HEX: #ffffff
RGB: 255, 255, 255
Uso: Fondo principal del sitio, tarjetas, secciones alternas
```

#### Gris Claro
```
HEX: #f5f5f5
RGB: 245, 245, 245
Uso: Backgrounds alternos, hover states, separadores
```

#### Gris Muy Claro
```
HEX: #ececf0
RGB: 236, 236, 240
Uso: Estados hover sutiles, inputs
```

### Colores de Sistema

#### Input Background
```
HEX: #f3f3f5
RGB: 243, 243, 245
```

#### Border
```
RGBA: rgba(0, 0, 0, 0.1)
Uso: Bordes de tarjetas, separadores, divisores
```

#### Destructive (Errores/Eliminación)
```
HEX: #d4183d
RGB: 212, 24, 61
```

---

## Tipografía

### Familias de Fuentes

El sitio utiliza dos familias de fuentes de Google Fonts:

#### Space Grotesk
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
```

**Uso principal:**
- Logo y marca
- Headings (h1, h2, h3, h4)
- Botones y CTAs
- Navegación principal
- Títulos de secciones

**Pesos disponibles:**
- Regular (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)

#### Inter
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Uso principal:**
- Body text y párrafos
- Descripciones
- Navegación secundaria (dropdowns)
- Formularios
- Listas y contenido general

**Pesos disponibles:**
- Regular (400)
- Medium (500)
- Semi-Bold (600)
- Bold (700)

### Jerarquía Tipográfica

#### Headings

```css
/* H1 - Títulos principales de página */
font-family: 'Space Grotesk', sans-serif;
font-weight: 500 (Medium);
font-size: var(--text-2xl); /* ~36-48px */
line-height: 1.5;
color: #0A0A67; /* Sobre fondo blanco */
```

```css
/* H2 - Títulos de sección */
font-family: 'Space Grotesk', sans-serif;
font-weight: 500 (Medium);
font-size: var(--text-xl); /* ~24-32px */
line-height: 1.5;
color: #0A0A67; /* Sobre fondo blanco */
```

```css
/* H3 - Subtítulos */
font-family: 'Space Grotesk', sans-serif;
font-weight: 500 (Medium);
font-size: var(--text-lg); /* ~18-24px */
line-height: 1.5;
color: #0A0A67; /* Sobre fondo blanco */
```

```css
/* H4 - Títulos menores */
font-family: 'Space Grotesk', sans-serif;
font-weight: 500 (Medium);
font-size: var(--text-base); /* 16px */
line-height: 1.5;
```

#### Body Text

```css
/* Párrafo estándar */
font-family: 'Inter', sans-serif;
font-weight: 400 (Regular);
font-size: 16px;
line-height: 26px; /* 1.625 */
color: #737373;
```

#### Navegación

```css
/* Navegación principal */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700 (Bold);
font-size: 14px;
letter-spacing: 1.4px;
text-transform: uppercase;
color: #0A0A67;
```

```css
/* Dropdown de navegación */
font-family: 'Inter', sans-serif;
font-weight: 400 (Regular);
font-size: 14px;
color: #737373;
```

#### Botones

```css
/* Botones primarios y secundarios */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700 (Bold);
font-size: 14px;
letter-spacing: 1.4px o 2.8px; /* Según énfasis */
text-transform: uppercase;
```

### Letter Spacing (Tracking)

- **Logo**: -1.2px (tighter, más compacto)
- **Headings grandes**: -1.8px a -0.6px (negativo para mejor lectura)
- **Navegación**: +1.4px (más abierto, uppercase)
- **Botones principales**: +2.8px (muy abierto, uppercase, énfasis)
- **Texto pequeño uppercase**: +1px a +1.2px

---

## Layout y Espaciado

### Container Width

```css
max-width: 1536px; /* max-w-screen-2xl */
margin: 0 auto;
```

### Padding Horizontal

```css
/* Mobile */
padding-left: 3rem; /* 48px - px-12 */
padding-right: 3rem; /* 48px - px-12 */

/* Desktop (md breakpoint y superior) */
padding-left: 12rem; /* 192px - md:px-48 */
padding-right: 12rem; /* 192px - md:px-48 */
```

### Padding Vertical

- Secciones grandes: `py-24` (96px)
- Secciones medianas: `py-16` (64px)
- Secciones pequeñas: `py-12` (48px)
- Header: `py-6` (24px)

### Gaps y Espacios

- Grid gap grande: `gap-16` (64px)
- Grid gap mediano: `gap-12` (48px)
- Elementos relacionados: `gap-6` (24px)
- Elementos muy cercanos: `gap-4` (16px)
- Inline spacing: `gap-2` (8px)

### Border Radius

```css
--radius: 0.625rem; /* 10px - Base radius */
--radius-sm: 6px; /* Elementos pequeños */
--radius-md: 8px;
--radius-lg: 10px;
--radius-xl: 14px;
```

---

## Componentes UI

### Navegación (Header)

**Características:**
- Posición: `fixed top-0` con `z-50`
- Fondo: Gradiente de blanco translúcido `from-white/90 to-white/50`
- Logo: Space Grotesk Bold, 24px, azul #0A0A67
- Sistema de dropdowns con hover
- Botón CTA "Free Try" con fondo azul sólido

**Estados:**
- **Normal**: Texto azul con 70% opacidad
- **Active**: Texto azul #0A0A67 sólido
- **Hover**: Transición a azul sólido

### Footer

**Estructura:**
- Grid de 4 columnas en desktop (2 para About, 1 Navigation, 1 Contact)
- Fondo blanco con separador superior
- Íconos sociales con hover effect
- Bottom bar con copyright y links legales

### Botones

#### Botón Primario
```css
background: #0A0A67;
color: white;
padding: 0.5rem 1.5rem; /* py-2 px-6 */
font-family: 'Space Grotesk', sans-serif;
font-weight: 700;
font-size: 14px;
letter-spacing: 1.4px;
text-transform: uppercase;
transition: background 200ms;

/* Hover */
background: #0A0A67/90;
```

#### Botón Secundario (Outline)
```css
background: white;
border: 1px solid #0a0a67;
color: #0a0a67;
padding: 1rem 2.5rem; /* py-4 px-10 */
/* Resto igual a primario */

/* Hover */
background: #0a0a67;
color: white;
```

### Tarjetas (Cards)

```css
background: white;
border-radius: var(--radius-lg);
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
overflow: hidden;
transition: all 300ms;

/* Hover */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
transform: translateY(-4px);
```

### Inputs y Formularios

```css
background: #f3f3f5;
border: 1px solid transparent;
border-radius: var(--radius-md);
padding: 0.5rem 1rem;
font-family: 'Inter', sans-serif;
font-size: 16px;
color: #171717;

/* Focus */
border-color: #0A0A67;
outline: 2px solid rgba(10, 10, 103, 0.1);
```

---

## Animaciones

### Motion/Framer Motion

El sitio utiliza la librería **Motion** (anteriormente Framer Motion) para animaciones fluidas.

#### Fade In Up (Entrada de secciones)

```javascript
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};
```

**Uso:** Secciones que aparecen al hacer scroll (whileInView)

#### Stagger Container (Elementos en secuencia)

```javascript
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
```

**Uso:** Grids de tarjetas, listas de elementos

### Transiciones CSS

```css
/* Transiciones estándar */
transition: all 200ms ease;
transition: colors 200ms ease;
transition: background 200ms ease;

/* Hover states para cards */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Easing Personalizado

```javascript
ease: [0.25, 0.1, 0.25, 1] // Ease-in-out suave
```

---

## Estructura de Navegación

### Categorías Principales (5)

1. **Programs**
   - Competitive
   - Recreational
   - Beginner
   - Summer Camp
   - Shows

2. **Team**
   - Coaches

3. **Athletes**
   - Hall of Fame
   - Safety
   - Health
   - Knoxing
   - Sport Psychology

4. **Booster**
   - Donate
   - Fundraising Opportunities
   - Volunteer

5. **Store**
   - Suits for Rent
   - Team Gear

### Sistema de Dropdown

- **Trigger**: Hover sobre categoría principal
- **Appearance**: Dropdown aparece con shadow y fondo blanco
- **Width mínimo**: 240px
- **Padding items**: px-6 py-3
- **Estado activo**: Font bold + color oscuro

---

## Responsive Design

### Breakpoints (Tailwind CSS v4)

```css
sm: 640px   /* Móvil grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeño */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Mobile First

El diseño parte de mobile y se expande con media queries:

```css
/* Mobile por defecto */
grid-cols-1
px-12
text-[14px]

/* Desktop */
md:grid-cols-4
md:px-48
md:text-[16px]
```

### Hero Section

- **Mobile**: Stack vertical, imagen a tamaño completo
- **Desktop**: Grid 2 columnas (lg:grid-cols-2)
- Altura: `h-screen` (full viewport)

---

## Imágenes y Assets

### Importación de Imágenes

#### Imágenes Raster (PNG, JPG)
```javascript
import imgName from "figma:asset/[hash].png";
```

**Importante:** `figma:asset` es un esquema virtual, NO usar con `./` o `../`

#### SVGs (Vectores)
```javascript
import svgPaths from "../imports/svg-[hash]";
```

**Uso:**
```jsx
<path d={svgPaths.pathName} stroke="currentColor" />
```

### Nuevas Imágenes

Para imágenes no importadas de Figma, usar el componente:

```jsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="url" 
  alt="descripción" 
  className="..."
/>
```

### Optimización

- Usar formatos WebP cuando sea posible
- Tamaños responsive con `object-cover` o `object-contain`
- Lazy loading implícito en navegadores modernos

---

## Gradientes

### Hero Background Overlay

```css
background: linear-gradient(to bottom, 
  rgba(0, 0, 0, 0.4) 0%,
  transparent 50%,
  rgba(0, 0, 0, 0.6) 100%
);
```

### Header Background

```css
background: linear-gradient(to bottom,
  rgba(255, 255, 255, 0.9) 0%,
  rgba(255, 255, 255, 0.5) 100%
);
```

---

## Iconografía

### Fuente de Íconos

- **Lucide React**: Librería principal para íconos
```bash
pnpm add lucide-react
```

### Estilo de Íconos

- Línea simple (stroke)
- Sin relleno (fill="none")
- Stroke width: 1.33 o 2
- Colores: Heredan del texto (currentColor) o específicos (#021521)

### Tamaños Comunes

- `size-4`: 16px (íconos pequeños inline)
- `size-6`: 24px (íconos medianos, redes sociales)
- `size-8`: 32px (íconos grandes)

---

## Sombras (Shadows)

### Box Shadows

```css
/* Sombra suave (cards, dropdowns) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Sombra mediana (dropdowns activos) */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

/* Sombra elevada (hover en cards) */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
```

### Text Shadow

No se utiliza text-shadow en el diseño actual.

---

## Estados Interactivos

### Hover

```css
/* Links de texto */
hover:text-[#171717]
transition-colors

/* Botones */
hover:bg-[#0A0A67]/90
transition-colors

/* Cards */
hover:shadow-lg
hover:-translate-y-1
transition-all duration-300
```

### Active/Focus

```css
/* Inputs */
focus:outline-ring/50
focus:border-[#0A0A67]

/* Links de navegación */
/* Activo por routing, no por :focus */
```

---

## Accesibilidad

### Contraste de Color

Todas las combinaciones cumplen con WCAG AA:

- Azul #0A0A67 sobre blanco: ✓ AAA
- Gris #737373 sobre blanco: ✓ AA
- Blanco sobre azul #0A0A67: ✓ AAA

### Tamaños de Fuente

- Texto mínimo: 14px
- Texto estándar: 16px
- Altamente legible en todos los dispositivos

### Focus States

Todos los elementos interactivos tienen estados de focus visibles mediante outline-ring.

### Semántica HTML

- Uso correcto de headings (h1, h2, h3, h4)
- Elementos `<nav>`, `<footer>`, `<section>`
- Alt text en todas las imágenes

---

## Mejores Prácticas

### CSS

1. **Usar variables CSS personalizadas** definidas en `theme.css`
2. **Mobile-first**: Estilos base para mobile, media queries para desktop
3. **Utilidad-first con Tailwind v4**: Preferir clases utility sobre CSS custom
4. **NO usar `text-*` utilities** para tamaños de fuente en headings (usar defaults de theme.css)

### Componentes React

1. **Componentes pequeños y reutilizables**
2. **Props tipadas** (TypeScript implícito)
3. **Nomenclatura consistente**: PascalCase para componentes
4. **Carpeta de organización**: `src/app/components/`

### Animaciones

1. **Usar Motion para animaciones complejas**
2. **CSS transitions para hover/focus simple**
3. **whileInView** para scroll-triggered animations
4. **viewport={{ once: true }}** para ejecutar solo una vez

### Performance

1. **Lazy load de imágenes** (nativo browser)
2. **Code splitting** por rutas (React Router)
3. **Minimizar re-renders** con memoization cuando necesario

---

## Archivo de Estilos

### Ubicación de Archivos

```
src/
  styles/
    fonts.css        # Imports de Google Fonts
    theme.css        # Variables CSS y defaults de elementos
  app/
    components/      # Componentes React
    pages/          # Páginas/vistas
```

### Import Order

```javascript
// 1. React y librerías
import { Link } from "react-router";
import { motion } from "motion/react";

// 2. SVGs y assets
import svgPaths from "../../imports/svg-[hash]";
import imgName from "figma:asset/[hash].png";

// 3. Componentes propios
import { Header } from "./components/Header";
```

---

## Convenciones de Código

### Clases de Tailwind

```jsx
// ✓ Bueno: Orden consistente
className="flex items-center gap-4 px-6 py-3 bg-white text-[#737373]"

// ✗ Evitar: Mezcla desordenada
className="text-[#737373] flex bg-white gap-4 px-6 items-center py-3"
```

**Orden sugerido:**
1. Layout (flex, grid, block)
2. Positioning (relative, absolute)
3. Sizing (w-*, h-*)
4. Spacing (p-*, m-*, gap-*)
5. Typography (font-*, text-*, leading-*)
6. Visual (bg-*, border-*, shadow-*)
7. States (hover:, focus:)

### Comentarios

```jsx
{/* Sección Hero */}
{/* Navegación principal con dropdowns */}
```

Comentarios concisos, en español, solo donde aportan valor.

---

## Recursos

### Fuentes
- Google Fonts: Space Grotesk, Inter
- https://fonts.google.com/

### Íconos
- Lucide React
- https://lucide.dev/

### Animaciones
- Motion (Framer Motion)
- https://motion.dev/

### Framework
- React 18.3+
- React Router 7+
- Tailwind CSS v4

---

## Versionado

**Versión**: 1.0  
**Fecha**: Abril 2026  
**Proyecto**: Seattle Synchro Website  
**Diseño original**: Figma Import  

---

## Admin Panel — Reglas de Componentes

### OBLIGATORIO: Usar shadcn/ui en el admin

En todas las vistas del admin (`/app/*`) se DEBEN usar los componentes de shadcn/ui disponibles en `src/components/ui/`. **Nunca usar elementos HTML nativos con clases hardcodeadas cuando existe un componente equivalente.**

#### Componentes disponibles y cuándo usarlos

| Necesidad | Componente shadcn | Importar desde |
|-----------|-------------------|----------------|
| Botón | `Button` | `#/components/ui/button` |
| Input de texto | `Input` | `#/components/ui/input` |
| Textarea | `Textarea` | `#/components/ui/textarea` |
| Label | `Label` | `#/components/ui/label` |
| Select | `Select` | `#/components/ui/select` |
| Checkbox | `Checkbox` | `#/components/ui/checkbox` |
| Switch toggle | `Switch` | `#/components/ui/switch` |
| Modal/Dialog | `Dialog` | `#/components/ui/dialog` |
| Tarjeta | `Card` | `#/components/ui/card` |
| Badge/Chip | `Badge` | `#/components/ui/badge` |
| Skeleton | `Skeleton` | `#/components/ui/skeleton` |
| Spinner | `Spinner` | `#/components/ui/spinner` |
| Tabs | `Tabs` | `#/components/ui/tabs` |
| Tooltip | `Tooltip` | `#/components/ui/tooltip` |

#### Razón
Los componentes shadcn ya tienen soporte de dark mode mediante CSS variables (`--background`, `--foreground`, `--border`, etc. definidas en `styles.css`). Usar `<input className="bg-white text-[#171717]">` quema los colores y rompe el dark mode. Los componentes shadcn resuelven esto automáticamente.

#### ¿Cuándo NO usar shadcn?
- En el sitio público (`/_public/*`) — ahí se usa el diseño de marca con clases Tailwind directas.
- Cuando necesites algo muy específico de marca que shadcn no puede expresar.

---

## Estructura de Rutas (`/app` — Admin)

### Convención: carpetas por sección, no archivos planos

Usar **directorios** en lugar de la notación de puntos de TanStack Router. Cada sección del admin vive en su propia carpeta.

```
src/routes/app/
  route.tsx               ← layout raíz del admin (AdminLayout + auth guard)
  index.tsx               ← dashboard /app
  blog/
    index.tsx             ← lista de posts     → /app/blog
    create.tsx            ← nuevo post         → /app/blog/create
    $postId/
      index.tsx           ← editar post        → /app/blog/$postId
      analytics.tsx       ← métricas del post  → /app/blog/$postId/analytics
  coaches/
    index.tsx             ← lista de coaches   → /app/coaches
    create.tsx            ← nuevo coach        → /app/coaches/create
    $coachId.tsx          ← editar coach       → /app/coaches/$coachId
  news/
    index.tsx
    create.tsx
    $newsId.tsx
  programs/
    index.tsx
```

### Reglas

- **Cada sección = su propia carpeta** bajo `/app/`. Nunca usar `blogs.index.tsx`, `blogs.new.tsx` — ese patrón aplana todo y dificulta escalar.
- **`index.tsx` = lista** de la sección (con tabs si aplica: Posts | Analytics).
- **`create.tsx` = formulario nuevo**. Nunca `new.tsx`.
- **`$id.tsx` o `$id/index.tsx` = formulario de edición**.
- **`route.tsx`** solo si la sección necesita un layout propio (ej. sin `MainLayout`, con `AdminLayout` fijo).
- Los sub-routes del form (`create`, `$id`) NO se envuelven en `MainLayout` — `PostFormPage` y similares manejan su propio layout de altura completa (`flex-1 min-h-0`).
- El `index.tsx` de cada sección SÍ usa `MainLayout` para el padding y scroll estándar del admin.

### Layout de páginas form (full-height, scroll aislado)

Las páginas de creación/edición necesitan este patrón para que solo el área del editor scrollee:

```tsx
// El componente de la página form:
<div className="peer-[.header-fixed]/header:mt-16 flex flex-col flex-1 min-h-0">
  <div className="shrink-0">          {/* Header fijo — nunca scrollea */}
  <div className="flex flex-1 min-h-0">
    <div className="flex-1 min-h-0 overflow-y-auto">  {/* ÚNICO área que scrollea */}
    <div className="w-72 overflow-y-auto">             {/* Panel lateral independiente */}
  </div>
</div>
```

`min-h-0` en cada nivel es obligatorio — sin él el flex item no puede contraerse y la página entera crece.

---

## Notas Finales

Este documento debe ser la fuente única de verdad para todas las decisiones de diseño en el sitio Seattle Synchro. Cualquier desviación debe documentarse y actualizarse en este archivo.

Para sugerencias o actualizaciones a estos lineamientos, consultar con el equipo de diseño.
