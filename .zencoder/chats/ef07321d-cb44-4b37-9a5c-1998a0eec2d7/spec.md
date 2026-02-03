# Technical Specification - The Four Seasons PWA

## Technical Context
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Pastel palette, Glassmorphism)
- **Animation**: Framer Motion (Parallax, AnimatePresence)
- **State Management**: Zustand
- **Icons**: Lucide-React
- **Target**: Mobile-First PWA

## Implementation Approach

### 1. Parallax Engine (`SceneWrapper`)
- Use Framer Motion's `useScroll` or `useMouseMove` (mapped to device tilt/touch) to drive motion.
- Three defined layers with varying `motion.div` transition speeds:
  - **Layer 0 (Background)**: `y` transform at 0.2x speed.
  - **Layer 1 (Midground)**: `y` transform at 1x speed (normal).
  - **Layer 2 (Foreground)**: `y` transform at 1.5x speed.
- Viewport will be fixed (`h-screen overflow-hidden`) to maintain the "Living Illustration" feel.

### 2. State Management (`useSeasonStore`)
- A Zustand store will manage the current `season` state: `winter`, `spring`, `summer`, `autumn`.
- Actions to set the season manually (for Phase 1 debug).

### 3. Visual Transitions
- `AnimatePresence` will wrap the scene layers to allow smooth cross-fading of backgrounds and weather effects.
- Dynamic Tailwind classes or CSS Variables will be used to switch palettes.

### 4. Component Structure
- `SceneWrapper.tsx`: Handles parallax logic and layer rendering.
- `SeasonLayer.tsx`: Specialized layer component that reacts to the current season.
- `SeasonSwitcher.tsx`: Debug component for manual phase switching.
- `DeskCompanion.tsx`: Avatar placeholder for Spring.
- `HotWaterBottle.tsx`: Interactive element for Winter with "Warmth Mode".
- `WeatherEffects.tsx`: Seasonal particle systems (Snow, Pollen, Sun, Rain).

### 5. Weather Systems
- **Snow (Winter)**: 40-50 particles, vertical fall with X-drift.
- **Pollen (Spring)**: 20 particles, slow upward float with fading.
- **Sun (Summer)**: Rotating radial gradient overlay + blinking "sparkles".
- **Rain (Autumn)**: Fast vertical lines at an angle.

## Source Code Structure
```
src/
  components/
    parallax/
      SceneWrapper.tsx
      Layer.tsx
    seasons/
      BackgroundLayer.tsx
      MidgroundLayer.tsx
      ForegroundLayer.tsx
      WeatherEffects.tsx
    ui/
      SeasonSwitcher.tsx
      HotWaterBottle.tsx
      DeskCompanion.tsx
  store/
    useSeasonStore.ts
  hooks/
    useParallax.ts
  App.tsx
  main.tsx
  index.css
```

## Data Model / Interface Changes
- `Season`: `'winter' | 'spring' | 'summer' | 'autumn'`
- `LayerProps`: `{ depth: number; children: ReactNode }`

## Verification Approach
- **Visual Check**: Ensure parallax layers move correctly on scroll/drag.
- **State Check**: Verify season switcher updates all 3 layers simultaneously.
- **PWA Check**: Ensure manifest and service worker are scaffolded (future step).
- **Lint**: Run `eslint` via `npm run lint`.
