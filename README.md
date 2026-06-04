# Electron Highlighter — Palette & Generator

Canonical color palettes for **Electron Highlighter** (regular / dark) and **Electron
Highlighter Day** (light), plus the generator that emits each terminal's config from them.

## Usage

```bash
npm test       # validate both palettes and that committed outputs match the generator
npm run build  # regenerate every Day and dark theme file into the sibling platform folders
```

## Files

- `electron-dark.js` — the dark palette (canonical source: the ghostty config).
- `electron-day.js` — the light/Day palette.
  Each palette is a single source of truth: `name`, `slug`, `base`, `accents`, ANSI 0–17, semantic roles.
- `formats/*.js` — one pure `render(palette) => string` per terminal format (variant-agnostic).
- `targets.js` — maps each format to its per-variant output path.
- `generate.js` — writes all Day and dark files.
- `expected/` — golden outputs (`<format>` for Day, `<format>-dark` for dark); `npm test`
  asserts the generator still matches them.

To change a color, edit the relevant palette (`electron-dark.js` or `electron-day.js`), run
`npm run build`, eyeball the result, then re-run `npm test` (update goldens for any intended
change).
