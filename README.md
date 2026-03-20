# Endless Runner

A browser-based endless runner built with React, TypeScript, Vite, Three.js, and React Three Fiber.

The player runs across three lanes, dodges randomly spawned obstacles, collects coins, and survives as the game speed ramps up. The project also includes a HUD, pause/game-over states, mobile controls, persistent best-score storage, and a centralized theme system for the game colors.

## What This Project Includes

- 3D endless runner gameplay rendered with `three` through `@react-three/fiber`
- Three-lane movement system
- Jump physics with configurable gravity and jump force
- Random obstacle and coin spawning
- Collision detection for obstacles and coin pickups
- Score, coins, best score, and best coin tracking
- Difficulty scaling based on score
- Keyboard controls and mobile on-screen controls
- Pause, idle, and game-over overlays
- Local storage persistence for player settings and best results
- Centralized visual theme for UI and scene colors

## Tech Stack

- React 19
- TypeScript
- Vite
- Three.js
- React Three Fiber
- React Three Drei
- Tailwind CSS 4
- ESLint

## How The Game Works

### Core flow

The app mounts from `src/main.tsx`, renders `src/App.tsx`, and then loads the main game screen from `src/pages/game/game.tsx`.

The game screen owns the full gameplay state:

- current game state: `idle`, `playing`, `paused`, or `game_over`
- player lane
- player vertical position for jumping
- score
- coin count
- best score and best coin count
- sound toggle
- settings modal visibility
- obstacle list
- coin list

### Frame updates

`src/pages/game/_components/game-canvas.tsx` runs a render loop with `useFrame`. On every frame it:

- calls the `on_tick` callback from `game.tsx`
- updates world progression using `delta`
- checks obstacle collisions
- checks coin collection

The actual gameplay updates happen in `update_game` inside `src/pages/game/game.tsx`.

That function:

- applies jump physics
- updates spawn timers
- spawns new obstacles and coins
- moves existing world objects toward the player
- removes despawned items
- increases score over time

### Movement and controls

Keyboard controls are handled by `src/hooks/use-game-controls.ts`.

Supported controls:

- `A` or `Left Arrow`: move left
- `D` or `Right Arrow`: move right
- `W`, `Up Arrow`, or `Space`: jump
- `P` or `Escape`: pause/resume
- `Enter` or `Space`: start or restart depending on game state

Mobile players get on-screen buttons from `src/pages/game/_components/mobile-controls.tsx`.

### Physics and tuning

Key gameplay constants live in `src/lib/constants.ts`.

Important values:

- `BASE_SPEED`: starting forward speed
- `MAX_SPEED`: speed cap
- `SPEED_RAMP`: how fast difficulty increases
- `GRAVITY`: downward acceleration
- `JUMP_FORCE`: jump launch force
- `OBSTACLE_SPAWN_INTERVAL`: base obstacle spawn rate
- `COIN_SPAWN_INTERVAL`: coin spawn rate
- `SPAWN_Z`: where new items appear
- `DESPAWN_Z`: when items are removed

If you want the player to jump higher, lower gravity, or change pacing, this is the first file to edit.

### Difficulty system

Difficulty labels are derived from score in `src/lib/game.utils.ts`.

Current tiers:

- `easy`: score below 100
- `medium`: score below 250
- `hard`: score below 450
- `insane`: score 450 and above

Obstacle spawn timing also tightens as score increases.

## Rendering and Scene Structure

The 3D scene is built from small reusable components:

- `src/pages/game/_components/game-canvas.tsx`
  Main canvas and scene loop

- `src/pages/game/ground.tsx`
  Road, lane markers, grass, buildings, and lights

- `src/pages/game/player.tsx`
  Main player model used in the active scene

- `src/pages/game/obtascles.tsx`
  Obstacle meshes for the three obstacle types

- `src/pages/game/_components/coin.tsx`
  Rotating collectible coin

- `src/pages/game/_components/sky-decor.tsx`
  Sun and cloud decorations

## UI Structure

The game UI is handled by `src/pages/game/_components/hud.tsx`.

It contains:

- top HUD stats
- run progress bar
- settings panel
- idle screen
- pause overlay
- game-over overlay

The HUD reads values from the main game screen and only handles presentation and button callbacks.

## State Persistence

`src/hooks/use-local-storage.ts` provides a small reusable hook for saving state to `localStorage`.

This project uses it for:

- `runner_best_score`
- `runner_best_coins`
- `runner_sound_enabled`

That means best results and sound preference survive page reloads.

## Theme and Colors

All active scene and UI colors are centralized in:

- `src/lib/theme.ts`

This file controls:

- 3D scene colors
- HUD colors
- overlay colors
- button colors
- difficulty badge colors
- gradient values

If you want to rebrand the project or restyle the game, start there instead of editing multiple components.

## Project Structure

```text
src/
  App.tsx
  main.tsx
  index.css
  interfaces/
    game.interface.ts
  hooks/
    use-game-controls.ts
    use-local-storage.ts
  lib/
    constants.ts
    game.utils.ts
    theme.ts
  pages/
    game/
      game.tsx
      ground.tsx
      obtascles.tsx
      player.tsx
      _components/
        coin.tsx
        game-canvas.tsx
        hud.tsx
        mobile-controls.tsx
        player.tsx
        sky-decor.tsx
```

## Available Scripts

Install dependencies first:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## How To Customize The Project

Common starting points:

- Change gameplay feel: `src/lib/constants.ts`
- Change spawn rules or scoring: `src/lib/game.utils.ts` and `src/pages/game/game.tsx`
- Change controls: `src/hooks/use-game-controls.ts`
- Change colors and gradients: `src/lib/theme.ts`
- Change UI layout: `src/pages/game/_components/hud.tsx`
- Change 3D models: `src/pages/game/ground.tsx`, `src/pages/game/player.tsx`, `src/pages/game/obtascles.tsx`

## Notes

- There is no backend in this project.
- There is no multiplayer.
- Persistence is local to the browser.
- The project is currently focused on a single polished gameplay loop.

## Summary

This project is a self-contained 3D endless runner with a clear separation between gameplay logic, rendering, UI, theme configuration, and persistent settings. It is a good base for adding:

- sound effects
- animations
- power-ups
- new obstacle types
- character skins
- multiple environments
- leaderboards
