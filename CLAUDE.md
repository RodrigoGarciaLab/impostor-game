# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Juego del Impostor" - A mobile-first web game where players receive a secret word, except one impostor who receives "IMPOSTOR" instead. Players must discover the impostor through conversation and voting.

**Tech Stack:**
- Next.js 16+ (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui (New York style, stone base color)
- lucide-react for icons

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Architecture

### Current State
The project is in initial setup phase:
- Fresh Next.js installation with App Router
- shadcn/ui configured and ready to use
- Tailwind CSS 4 with custom theme configured
- Path aliases set up (`@/` points to root)
- Geist font family loaded (sans and mono variants)

### Planned Structure

```
/app
  /page.tsx                 # Landing page (currently default Next.js page)
  /crear-partida/page.tsx   # Game setup page (to be created)
  /juego/page.tsx          # Game play page (to be created)
  /layout.tsx              # Root layout with fonts
  /globals.css             # Tailwind + shadcn styles

/components
  /ui/                     # shadcn/ui components (install as needed)
  /game/                   # Game-specific components (to be created)
    game-setup.tsx         # Player and category configuration
    player-turn.tsx        # Individual player turn screen
    word-reveal.tsx        # Word reveal animation component

/lib
  /utils.ts               # cn() utility for class merging (exists)
  /game-data.ts           # Word categories and lists (to be created)
  /game-logic.ts          # Core game logic functions (to be created)
```

### Import Aliases

Configured in `tsconfig.json`:
- `@/*` - Maps to project root
- `@/components/ui` - shadcn/ui components
- `@/lib/utils` - Utilities including cn()

### shadcn/ui Configuration

Install components using:
```bash
npx shadcn@latest add <component-name>
```

Components are added to `/components/ui/` automatically.

**Configuration details:**
- Style: "new-york"
- Base color: "stone"
- CSS variables: enabled
- RSC: enabled
- Icon library: lucide-react

**Needed components:**
- button
- card
- input
- checkbox
- badge
- alert
- separator

## Game Implementation Specification

### Core Types

```typescript
interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  hasSeenWord: boolean;
}

interface GameConfig {
  players: Player[];
  categories: string[];
  selectedWord: string;
  currentPlayerIndex: number;
}
```

### Game Flow

1. **Landing (/)**: Title, rules explanation, "Crear Partida" button
2. **Setup (/crear-partida)**:
   - Add players (minimum 3)
   - Select categories (minimum 1)
   - "Comenzar Juego" button → starts game with random word and impostor
3. **Game (/juego)**:
   - Shows current player's turn
   - "Revelar Palabra" reveals word (or "IMPOSTOR")
   - "Siguiente Jugador" advances turn
   - Progress indicator (e.g., "3/7 jugadores")
   - "Nueva Partida" when all players have seen their word

### Game Logic Functions (`/lib/game-logic.ts`)

```typescript
// Select random word from selected categories
function selectRandomWord(categories: string[]): string;

// Randomly assign impostor role to one player
function assignImpostor(players: Player[]): Player[];

// Get word for specific player (real word or "IMPOSTOR")
function getWordForPlayer(player: Player, word: string): string;

// Move to next player
function nextPlayer(currentIndex: number, totalPlayers: number): number;

// Check if game round is complete
function allPlayersRevealed(players: Player[]): boolean;
```

### Word Categories (`/lib/game-data.ts`)

Categories to implement with 15-20 words each:
- **Animales**: Conejo, León, Elefante, Pingüino, Delfín, Águila, Oso, Jirafa, Cocodrilo, Tortuga, Tiburón, Mariposa, Canguro, Panda, Tigre, Búho, Serpiente, Caballo, Ballena, Lobo
- **Comida**: Pizza, Hamburguesa, Sushi, Tacos, Pasta, Helado, Empanada, Asado, Milanesa, Ensalada, Paella, Risotto, Curry, Croissant, Falafel, Burrito, Ramen, Ceviche, Dulce de leche, Choripán
- **Países**: Argentina, Brasil, Uruguay, España, Italia, Francia, Japón, China, México, Alemania, India, Canadá, Australia, Egipto, Grecia, Perú, Chile, Colombia, Portugal, Noruega
- Add more as needed: Profesiones, Deportes, Objetos cotidianos

## Mobile Optimization Requirements

This is a **mobile-first** game. Ensure:
- Minimum font size: 16px (prevents zoom on iOS)
- Minimum touch target: 44x44px for buttons
- Vertical orientation optimized
- Large, high-contrast text for quick reading
- Smooth animations but not distracting
- Viewport meta tag properly configured

## UX Considerations

1. **Privacy**: Before revealing word, warn player to hide screen from others
2. **Clear turn indication**: Bold message showing whose turn it is
3. **Progress feedback**: Show "X/Y jugadores han visto su palabra"
4. **Word reveal animation**: Smooth, attention-grabbing but not slow
5. **Navigation safeguards**: Prevent accidental back navigation during game

## State Management

Use React hooks (useState, useContext). Game state should persist during navigation between setup and game pages. Consider using:
- URL search params for simple state
- Context API for complex game state
- localStorage for persisting game history (future enhancement)

## Styling Guidelines

- Use Tailwind utility classes
- Use `cn()` from `@/lib/utils` for conditional classes
- Follow shadcn/ui component patterns
- Use CSS variables for theming (already configured in globals.css)
- Dark mode support (`.dark` class toggle)

## Deployment

Recommended: Vercel (optimal for Next.js)

```bash
# Build and test locally first
npm run build
npm start

# Then deploy via Vercel CLI or GitHub integration
```
