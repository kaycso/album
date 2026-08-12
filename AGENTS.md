# AGENTS.md

## Stack

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4 + framer-motion. Path alias `@/*` → repo root.

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint`
- No test suite. No `typecheck` script — use `npx tsc --noEmit` (tsconfig has `noEmit`).
- Prettier isn't wired to a script; run `npx prettier --write .`. `prettier-plugin-tailwindcss` sorts utility classes — keep them in the plugin's canonical order.

## Tailwind v4

CSS-first config. There is **no `tailwind.config.js`** — theme tokens live in `app/globals.css` via `@theme`, and arbitrary values like `bg-[#FFF8E8]` are used directly. Do not add a JS config file.

## Architecture

- All code lives in the `(puzzle)` route group; since it's a route group, the page serves at `/`.
- Static scene data (bee/decor positions, correct answer) in `app/(puzzle)/_data/scene.ts`; shared visual constants (sizes, colors, title) in `app/(puzzle)/_data/constants.ts`. Prefer these over hardcoding values in components.
- UI is a state machine: `useReducer` (`hooks/use-puzzle.ts` + `reducer/puzzle-reducer.ts`) with stages from `PuzzleStage` in `types.ts`. Components dispatch actions; they do not mutate state directly.
- Client/server boundary: framer-motion components and anything stateful (`scene/*`, `hooks/`, `_components/`) are `"use client"`. `_data/*` and `types.ts` are shared server-safe modules. Any component that imports a hook or `motion` needs the directive.

## WIP: `_components/` → `scene/` refactor (uncommitted)

Components are being moved from `app/(puzzle)/_components/` to `app/(puzzle)/scene/` (files deleted on git, not yet committed). Only `_components/animated-decoration.tsx` remains. Reuse the `scene/*` paths; do not recreate the old ones.

## Conventions

- UI strings and git commit messages are in Portuguese (page title is "Kaymel", "Feito com muito amor"). Keep user-facing strings in Portuguese.
- Styling is inline Tailwind utilities; bee/decor positions are percentage-based via `style={{ top, left }}`.
