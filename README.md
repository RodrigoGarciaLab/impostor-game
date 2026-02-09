# 🎭 Juego del Impostor

Un juego de fiesta móvil donde los jugadores reciben una palabra secreta en un dispositivo compartido. ¡Excepto uno - el impostor - que recibe "IMPOSTOR" en su lugar! Los jugadores deben descubrir al impostor a través de conversación y votación.

## ✨ Características

- 🎨 **Diseño sofisticado y oscuro** - Interfaz elegante optimizada para modo oscuro
- 📱 **Mobile-first** - Diseñado específicamente para dispositivos móviles con objetivos táctiles de 44px+
- 🎯 **9 categorías temáticas** - Más de 300 palabras en categorías como Animales, Comida, Países, Profesiones, Deportes, Objetos, Fútbol, Celebridades y Marcas
- 👥 **Modo jugadores como palabras** - Opción para incluir los nombres de los jugadores como palabras secretas
- 💾 **Persistencia de estado** - El juego se guarda automáticamente en sessionStorage
- 🎬 **Animaciones fluidas** - Efectos 3D de volteo de cartas y micro-interacciones
- 🔄 **Sin recargas** - Experiencia de aplicación de página única (SPA)
- ⚡ **Rendimiento optimizado** - Construido con Next.js 16 y React 19

## 🚀 Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) con App Router y Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) con OKLCH color space
- **Componentes**: [shadcn/ui](https://ui.shadcn.com/) (estilo New York)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Fuentes**: [Geist Sans](https://vercel.com/font) de Vercel

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/impostor-game.git
   cd impostor-game
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**

   Visita [http://localhost:4000](http://localhost:4000)

## 🎮 Cómo Jugar

1. **Configurar partida**: Agrega al menos 3 jugadores y selecciona una o más categorías
2. **Revelar palabras**: Cada jugador toma turnos para ver su palabra en privado
3. **Discusión**: Una vez que todos han visto su palabra, discuten para identificar al impostor
4. **¡Vota!**: Los jugadores votan para eliminar a quien creen que es el impostor

## 🍴 Fork y Personalización

Este proyecto es completamente open source y está diseñado para ser fácilmente personalizable. ¡Siéntete libre de hacer un fork y agregar tus propias categorías!

### Cómo hacer Fork

1. **Fork el repositorio**
   - Haz clic en el botón "Fork" en la esquina superior derecha de GitHub
   - Clona tu fork localmente

2. **Crea una rama para tus cambios**
   ```bash
   git checkout -b feature/mis-categorias-personalizadas
   ```

### 🎯 Agregar tus propias categorías

Las categorías se definen en `lib/game-data.ts`. Aquí te mostramos cómo agregar las tuyas:

#### Paso 1: Actualizar el tipo Category

Abre `lib/types.ts` y agrega tu nueva categoría al tipo:

```typescript
export type Category =
  | 'animales'
  | 'comida'
  | 'paises'
  | 'profesiones'
  | 'deportes'
  | 'objetos'
  | 'futbol'
  | 'celebridades'
  | 'marcas'
  | 'tu-nueva-categoria'; // ⬅️ Agrega aquí
```

#### Paso 2: Agregar palabras para tu categoría

En `lib/game-data.ts`, agrega tu categoría al objeto `GAME_WORDS`:

```typescript
export const GAME_WORDS: Record<Category, string[]> = {
  // ... categorías existentes
  'tu-nueva-categoria': [
    'Palabra 1',
    'Palabra 2',
    'Palabra 3',
    // Agrega al menos 15-20 palabras para variedad
  ],
};
```

#### Paso 3: Agregar etiqueta y icono

En el mismo archivo `lib/game-data.ts`:

```typescript
export const CATEGORY_LABELS: Record<Category, string> = {
  // ... etiquetas existentes
  'tu-nueva-categoria': 'Tu Categoría',
};

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  // ... iconos existentes
  'tu-nueva-categoria': TuIcono, // Importa desde lucide-react
};
```

Busca iconos disponibles en [Lucide Icons](https://lucide.dev/icons/).

#### Paso 4: Agregar colores personalizados (opcional)

En `components/game/category-selector.tsx`, puedes agregar un esquema de colores único:

```typescript
const CATEGORY_COLORS: Record<Category, {
  gradient: string;
  glow: string;
  border: string;
  icon: string;
}> = {
  // ... colores existentes
  'tu-nueva-categoria': {
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    glow: 'shadow-purple-500/20',
    border: 'border-purple-500/50',
    icon: 'text-purple-400',
  },
};
```

#### Paso 5: Actualizar la lista de categorías

En `app/crear-partida/page.tsx`, agrega tu categoría al array:

```typescript
const ALL_CATEGORIES: Category[] = [
  'animales',
  'comida',
  'paises',
  'profesiones',
  'deportes',
  'objetos',
  'futbol',
  'celebridades',
  'marcas',
  'tu-nueva-categoria', // ⬅️ Agrega aquí
];
```

¡Eso es todo! Tu nueva categoría ahora aparecerá en el selector de categorías.

### 🎨 Otras Personalizaciones

**Cambiar el tema de colores:**
- Edita las variables CSS en `app/globals.css`
- Modifica la paleta de colores stone por otra (slate, zinc, neutral, etc.)

**Cambiar la cantidad mínima de jugadores:**
- En `app/crear-partida/page.tsx`, modifica `const minPlayers = 3;`

**Agregar nuevas animaciones:**
- Agrega keyframes personalizados en `app/globals.css`
- Usa las animaciones en tus componentes con Tailwind

**Personalizar textos:**
- Todos los textos están directamente en los componentes
- Busca y reemplaza para traducir a otro idioma

## 📁 Estructura del Proyecto

```
impostor-game/
├── app/
│   ├── page.tsx                 # Página de inicio
│   ├── crear-partida/
│   │   └── page.tsx            # Configuración del juego
│   ├── juego/
│   │   └── page.tsx            # Pantalla principal del juego
│   ├── layout.tsx              # Layout raíz
│   └── globals.css             # Estilos globales y animaciones
├── components/
│   ├── ui/                     # Componentes shadcn/ui
│   └── game/                   # Componentes del juego
│       ├── category-selector.tsx
│       ├── player-list.tsx
│       ├── progress-indicator.tsx
│       └── word-reveal-card.tsx
├── lib/
│   ├── types.ts                # Definiciones de tipos TypeScript
│   ├── game-data.ts            # Categorías y listas de palabras
│   ├── game-logic.ts           # Lógica central del juego
│   └── utils.ts                # Funciones de utilidad
└── public/                     # Archivos estáticos
```

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres contribuir:

1. **Fork el proyecto**
2. **Crea una rama para tu feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit tus cambios** (`git commit -m 'Add some AmazingFeature'`)
4. **Push a la rama** (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### Ideas para contribuir

- 🌍 Traducciones a otros idiomas
- 🎯 Nuevas categorías de palabras
- 🎨 Temas visuales alternativos
- 🎮 Nuevos modos de juego
- 🐛 Corrección de bugs
- 📱 Mejoras de UX/UI
- ⚡ Optimizaciones de rendimiento

## 🏗️ Build para Producción

```bash
# Construir la aplicación
npm run build

# Iniciar el servidor de producción
npm start
```

## 🚀 Deploy

El proyecto está optimizado para desplegarse en [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/impostor-game)

También puedes desplegarlo en:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Cualquier plataforma que soporte Next.js

## 📝 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo (puerto 4000)
npm run build    # Construye la aplicación para producción
npm start        # Inicia el servidor de producción
npm run lint     # Ejecuta el linter de ESLint
```

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

## 🙏 Agradecimientos

- Diseño de UI inspirado en estéticas de juegos modernos
- Componentes base de [shadcn/ui](https://ui.shadcn.com/)
- Iconos de [Lucide](https://lucide.dev/)
- Construido con [Next.js](https://nextjs.org/)

---

Hecho con ❤️ para reuniones de amigos y familia

¿Encontraste un bug? ¿Tienes una idea? [Abre un issue](https://github.com/tu-usuario/impostor-game/issues)
