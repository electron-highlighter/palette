# Electron Highlighter — Palette & Generator

Canonical color palette for **Electron Highlighter Day** (light) and the generator that emits
each terminal's config from it.

## Usage

```bash
npm test       # validate the palette and that committed outputs match the generator
npm run build  # regenerate every Day theme file into the sibling platform folders
```

## Files

- `electron-day.js` — the single source of truth (base, accents, ANSI 0–17, semantic roles).
- `formats/*.js` — one pure `render(palette) => string` per terminal format.
- `targets.js` — maps each format to its output path.
- `generate.js` — writes all Day files.
- `expected/` — golden outputs; `npm test` asserts the generator still matches them.

To change a color, edit `electron-day.js`, run `npm run build`, eyeball the result, then
re-run `npm test` (update goldens for any intended change).
