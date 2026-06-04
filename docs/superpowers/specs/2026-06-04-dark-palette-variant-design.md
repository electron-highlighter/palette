# Design: Add the regular (dark) Electron Highlighter palette to the generator

**Date:** 2026-06-04
**Status:** Proposed — awaiting review

## Problem

The palette repo and generator currently emit only **Electron Highlighter Day**
(light). The regular **dark** theme exists across the sibling terminal folders as
hand-maintained config files, but those files have drifted out of sync with each
other (e.g. red is `#f7768e` in alacritty/ghostty but `#ff5874` in kitty; bright
red is `#f7768e` / `#ff5874` / `#ff93a7` across three configs; bright black is
`#506686` vs `#414868`). This is the exact "stale palette" problem the Day
generator was built to eliminate.

## Goal

Make the dark theme a first-class variant of the generator: one canonical dark
palette as the single source of truth, emitted to every terminal format, with
golden-file tests — exactly as the Day variant works today.

## Canonical source

The **ghostty** dark config (`ghostty/config`) is the reference. Its values are
treated as authoritative; the generator will normalize the other dark files to
match (notably kitty's red, bright-red, bright-black, and white slots).

## Approach (chosen)

Add a second palette module in the same shape as `electron-day.js` and make the
generator variant-aware. Renderers already read everything from
`p.ansi` / `p.base` / `p.accents` / `p.roles`; the only hardcoded thing is the
theme **name** string, which becomes palette-driven.

Rejected alternatives:
- Single `palette.js` exporting `{day, dark}` — more churn to the existing file
  and tests, larger diffs.
- A separate dark generator — duplicative, defeats the single-source goal.

## Components

### 1. `electron-dark.js` (new)

Exports the dark palette in the identical shape to `electron-day.js`:
`{ name, slug, base, accents, ansi, roles }`.

- `name`: `"Electron Highlighter"`
- `slug`: `"electron-highlighter"`

Dark values, mapped from ghostty:

```
base:
  background  #24283b
  foreground  #a8b5d1
  selection   #283457
  cursor      #a8b5d1
  cursorText  #1a1b26
  comment     #7c8eac   # derived: hyper dark "lightBlack"
  dim         #545c7e   # derived: dark UI dim (committed kitty inactive_tab_fg)
  lightGray   #1b212c   # derived: tmux dark "black" surface

accents:
  red #f7768e  orange #ffbf7a  yellow #ffd9af  green #58ffc7
  cyan #57f9ff  blue #82aaff  purple #d2a6ef  pink #ff75a0*

ansi (from ghostty palette):
  0 #15161e   1 #f7768e   2 #58ffc7   3 #ffd9af
  4 #82aaff   5 #d2a6ef   6 #57f9ff   7 #7c8eac
  8 #506686   9 #ff93a7  10 #58ffc7  11 #ffd9af
 12 #82aaff  13 #d2a6ef  14 #57f9ff  15 #c5cee0
 16 #ffbf7a  17 #ffd9af

roles (from committed dark tmux + hyper configs, which agree):
  tmuxActive    #58ffc7   tmuxInactive  #82aaff   tmuxSession #ffd9af
  tmuxDir       #d2a6ef   tmuxTime      #57f9ff   tmuxMessage #34febb
  tmuxPaneBorder #3b4261
  hyperTabNavBg #1b212c   hyperTabText  #7c8eac   hyperTabTextActive #d5d9e2
  hyperBorder   #141820   hyperLink     #57f9ff
```

`*pink`: ghostty defines no pink, and **no renderer consumes `accents.pink`** —
it exists only so the validation test passes. Chosen as `#ff75a0`, a vivid pink
sitting between the dark red (`#f7768e`) and purple (`#d2a6ef`) and readable on
the `#24283b` background. Easily tunable later; it affects no output file.

### 2. `electron-day.js` (modified)

Add a `slug: "electron-highlighter-day"` field. No color changes. The Day
goldens must stay byte-identical.

### 3. Renderers (modified — name parameterization only)

Replace hardcoded `"Electron Highlighter Day"` strings with values read from the
palette, so each renderer emits the correct header per variant:

- `alacritty-toml`: `# Colors (${p.name})`
- `alacritty-yaml`: `# ${p.name} Alacritty Colors`
- `ghostty`: `# ${p.name}`
- `kitty`: `## name: ${p.name}`
- `gnome-terminal`: `${p.name} - ...` header; profile name/slug from `${p.slug}`
- `tmux`: `# ${p.slug.replace(/-/g, '_')} theme`
- `iterm`, `linux-console`, `hyper`: no name in output — unchanged logic.

With Day's `name`/`slug`, these expressions reproduce the current strings
exactly, so Day goldens are unchanged. No color/structure logic in any renderer
changes.

### 4. `targets.js` (modified)

Define formats once, then build a variant × format target list. Each entry
carries the palette to render and the destination path. Dark destinations:

| format | dark dest |
|---|---|
| alacritty-toml | `../alacritty/electron-highlighter.toml` |
| alacritty-yaml | `../alacritty/electron_highlighter.yml` |
| ghostty | `../ghostty/electron-highlighter` |
| kitty | `../kitty/electron_highlighter.conf` |
| tmux | `../tmux/electron_highlighter.conf` |
| hyper | `../hyper/electron-highlighter.js` |
| iterm | `../terminal/electron.itermcolors` |
| gnome-terminal | `../terminal/gnome-terminal.sh` |
| linux-console | `../terminal/linux-console.sh` |

The Day targets are unchanged. `module.exports` keeps exposing both palettes and
the combined target list.

### 5. `generate.js` (modified)

Loop over the combined (Day + dark) target list. Update the closing log line to
report the total count and both variants.

### 6. Stale file cleanup

Delete the superseded hand-written files once the `.sh` equivalents generate:
- `../terminal/gnome-terminal.txt`
- `../terminal/linux-console.txt`

(`ghostty/config` is a user-config sample referencing the theme, not the theme
file — left untouched. `hyper/index.js` is the published plugin entry — left
untouched; the generated dark file is a parallel `electron-highlighter.js`.)

## Testing

- `generate.test.js`: already iterates `targets` and asserts each against
  `expected/<name>`. With variant-suffixed target names (e.g. `kitty-day`,
  `kitty-dark`) it covers both variants automatically.
- `expected/`: add a golden per dark target (generated, then eyeballed against
  the ghostty reference before being committed as the baseline).
- `electron-day.test.js`: generalize/duplicate the palette-shape validation to
  also run against `electron-dark.js` (ANSI 0–17 valid hex, base keys present,
  eight accents, semantic roles). Drop or relax the `red === '#f52a65'`
  TokyoNight-Day assertion so it only applies to the Day palette.

## Out of scope

- Changing any Day colors.
- Touching VS Code / other (non-terminal) theme outputs.
- Choosing a final dark `pink` (cosmetic; unused by renderers).

## Repo layout & workflow

Each output folder is its **own git repo** with its own remote
(`electron-highlighter/{ghostty,kitty,alacritty,tmux,hyper,terminal}`); `palette`
is a separate repo holding only the generator, format modules, palettes, tests,
and this spec. No generated theme files live in `palette` — every emitted file
lands in its application's repo, exactly as the Day generator already does.

Implementation therefore spans up to 7 repos:

- **palette** — `electron-dark.js`, `electron-day.js` slug, renderer name
  parameterization, `targets.js`, `generate.js`, tests, `expected/` goldens, spec.
- **ghostty / kitty / alacritty / tmux / hyper / terminal** — receive the
  regenerated dark output files (and, for `terminal`, the deletion of the stale
  `gnome-terminal.txt` / `linux-console.txt`).

Per the repo workflow, each repo's changes go on a worktree/branch with its own
PR — never committed directly to a default branch. The plan will sequence this:
land the `palette` generator changes first, then run the build and open a PR per
application repo for its regenerated files.
