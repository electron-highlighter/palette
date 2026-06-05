# Dark Palette Variant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the regular (dark) Electron Highlighter theme as a first-class generator variant, with ghostty as the canonical source, emitting dark files to every terminal app repo.

**Architecture:** Add `electron-dark.js` (same shape as `electron-day.js`), make the renderers read the theme name/slug from the palette instead of hardcoding "Day", expand `targets.js` to a day+dark target list, regenerate, and add per-variant golden tests. Generated files land in each app's own repo; `palette` holds only the generator.

**Tech Stack:** Node.js (v25), `node:test`, pure `render(palette) => string` modules. No external deps.

---

## Part A — Palette repo (foundation)

All Part A work happens in the **`palette`** repo. Tests read only `palette/expected/` (no sibling access), so a worktree is fine here. `npm test` runs the golden + shape tests.

### File structure (Part A)

- Create: `palette/electron-dark.js` — canonical dark palette.
- Modify: `palette/electron-day.js` — add `slug`.
- Modify: `palette/formats/{alacritty-toml,alacritty-yaml,ghostty,kitty,gnome-terminal,tmux}.js` — name/slug parameterization only.
- Unchanged: `palette/formats/{iterm,linux-console,hyper}.js` — no name in output.
- Modify: `palette/targets.js` — day+dark target list.
- Modify: `palette/generate.js` — log line only.
- Modify: `palette/electron-day.test.js` — validate both palettes.
- Create: `palette/expected/<format>-dark` — nine dark goldens.

---

### Task 1: Parameterize theme name in renderers (Day output stays byte-identical)

The existing Day goldens are the safety net: after these edits, `npm test` must still pass with **zero** golden changes, proving the refactor is behavior-preserving for Day.

**Files:**
- Modify: `palette/formats/alacritty-toml.js`
- Modify: `palette/formats/alacritty-yaml.js`
- Modify: `palette/formats/ghostty.js`
- Modify: `palette/formats/kitty.js`
- Modify: `palette/formats/gnome-terminal.js`
- Modify: `palette/formats/tmux.js`

- [ ] **Step 1: Confirm the baseline is green**

Run: `cd palette && npm test`
Expected: all golden tests PASS (current Day-only state).

- [ ] **Step 2: Edit `alacritty-toml.js`**

Change the header line:

```js
// before
  return `# Colors (Electron Highlighter Day)
// after
  return `# Colors (${p.name})
```

- [ ] **Step 3: Edit `alacritty-yaml.js`**

```js
// before
  return `# Electron Highlighter Day Alacritty Colors
// after
  return `# ${p.name} Alacritty Colors
```

- [ ] **Step 4: Edit `ghostty.js`**

```js
// before
  const lines = ['# Electron Highlighter Day',
// after
  const lines = [`# ${p.name}`,
```

- [ ] **Step 5: Edit `kitty.js`**

```js
// before
## name: Electron Highlighter Day
// after
## name: ${p.name}
```

(This line sits inside the existing `head` template literal — only the name token changes.)

- [ ] **Step 6: Edit `gnome-terminal.js`** (three lines)

```js
// before
# Electron Highlighter Day - Gnome Terminal color scheme install script
// after
# ${p.name} - Gnome Terminal color scheme install script
```

```js
// before
[[ -z "$PROFILE_NAME" ]] && PROFILE_NAME="electron-highlighter-day"
[[ -z "$PROFILE_SLUG" ]] && PROFILE_SLUG="electron-highlighter-day"
// after
[[ -z "$PROFILE_NAME" ]] && PROFILE_NAME="${p.slug}"
[[ -z "$PROFILE_SLUG" ]] && PROFILE_SLUG="${p.slug}"
```

- [ ] **Step 7: Edit `tmux.js`**

```js
// before
  const vars = `# electron_highlighter_day theme
// after
  const vars = `# ${p.slug.replace(/-/g, '_')} theme
```

- [ ] **Step 8: Add `slug` to `electron-day.js`**

```js
// before
module.exports = { name: 'Electron Highlighter Day', base, accents, ansi, roles }
// after
module.exports = { name: 'Electron Highlighter Day', slug: 'electron-highlighter-day', base, accents, ansi, roles }
```

- [ ] **Step 9: Verify Day output is unchanged**

Run: `cd palette && npm test`
Expected: all golden tests PASS, no `expected/` file edited. If any Day golden fails, a substituted string didn't reproduce the original — fix the renderer, do not touch the golden.

- [ ] **Step 10: Commit**

```bash
git -C palette add formats/alacritty-toml.js formats/alacritty-yaml.js formats/ghostty.js formats/kitty.js formats/gnome-terminal.js formats/tmux.js electron-day.js
git -C palette commit -m "refactor: read theme name/slug from palette in renderers"
```

---

### Task 2: Add the dark palette module

**Files:**
- Create: `palette/electron-dark.js`
- Modify: `palette/electron-day.test.js`

- [ ] **Step 1: Write failing palette-shape tests for both palettes**

Replace the contents of `palette/electron-day.test.js` with:

```js
const test = require('node:test')
const assert = require('node:assert')
const day = require('./electron-day')
const dark = require('./electron-dark')

for (const palette of [day, dark]) {
  test(`[${palette.name}] every ANSI slot 0-17 is a valid #rrggbb`, () => {
    for (let i = 0; i <= 17; i++) {
      assert.match(palette.ansi[i], /^#[0-9a-f]{6}$/, `ansi[${i}] invalid`)
    }
  })

  test(`[${palette.name}] base keys are present and valid hex`, () => {
    for (const key of ['background', 'foreground', 'comment', 'dim', 'lightGray', 'selection', 'cursor', 'cursorText']) {
      assert.match(palette.base[key], /^#[0-9a-f]{6}$/, `base.${key} invalid`)
    }
  })

  test(`[${palette.name}] all eight accents are present and valid hex`, () => {
    for (const key of ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink']) {
      assert.match(palette.accents[key], /^#[0-9a-f]{6}$/, `accents.${key} invalid`)
    }
  })

  test(`[${palette.name}] semantic roles are present and valid hex`, () => {
    for (const key of ['tmuxActive', 'tmuxInactive', 'tmuxSession', 'tmuxDir', 'tmuxTime', 'tmuxMessage', 'tmuxPaneBorder', 'hyperTabNavBg', 'hyperTabText', 'hyperTabTextActive', 'hyperBorder', 'hyperLink']) {
      assert.match(palette.roles[key], /^#[0-9a-f]{6}$/, `roles.${key} invalid`)
    }
  })

  test(`[${palette.name}] exposes a kebab-case slug`, () => {
    assert.match(palette.slug, /^[a-z0-9-]+$/)
  })
}

test('Day red is keyed to TokyoNight Day', () => {
  assert.strictEqual(day.accents.red, '#f52a65')
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd palette && node --test electron-day.test.js`
Expected: FAIL with `Cannot find module './electron-dark'`.

- [ ] **Step 3: Create `palette/electron-dark.js`**

```js
// Canonical palette for Electron Highlighter (regular / dark). Single source of
// truth for every terminal emitter's dark output. Values mirror the ghostty
// reference config; the other terminals' dark files are normalized to match.

const base = {
  background: '#24283b',
  foreground: '#a8b5d1',
  comment: '#7586b3',   // unified neutral ramp (bg H230 -> fg H221)
  dim: '#4d5a85',       // unified neutral ramp
  lightGray: '#1b1e2c', // unified neutral ramp
  selection: '#2b3254',
  cursor: '#a8b5d1',
  cursorText: '#181b28',
}

const accents = {
  red: '#f7768e',
  orange: '#ffd1ad',
  yellow: '#ffecb8',
  green: '#58ffc7',
  cyan: '#5ce1ff',
  blue: '#82aaff',
  purple: '#d2a6ef',
  pink: '#f4a8d8', // soft orchid pink; consumed by the fish + zed themes
}

// ANSI 0-17, from the ghostty reference palette. Conventional dark mapping:
// "black" slots hold dark colors, "white" slots hold light readable colors.
const ansi = {
  0: '#15161e', 1: accents.red, 2: accents.green, 3: accents.yellow,
  4: accents.blue, 5: accents.purple, 6: accents.cyan, 7: '#7586b3',
  8: '#4e5b88', 9: '#ff93a7', 10: accents.green, 11: accents.yellow,
  12: accents.blue, 13: accents.purple, 14: accents.cyan, 15: '#c5cde0',
  16: accents.orange, 17: accents.yellow,
}

const roles = {
  tmuxActive: accents.green,
  tmuxInactive: accents.blue,
  tmuxSession: accents.yellow,
  tmuxDir: accents.purple,
  tmuxTime: accents.cyan,
  tmuxMessage: '#34febb',
  tmuxPaneBorder: '#3a4262',
  hyperTabNavBg: '#1b1e2c',
  hyperTabText: '#7586b3',
  hyperTabTextActive: '#d0d7e7',
  hyperBorder: '#141620',
  hyperLink: accents.cyan,
}

module.exports = { name: 'Electron Highlighter', slug: 'electron-highlighter', base, accents, ansi, roles }
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd palette && node --test electron-day.test.js`
Expected: PASS for both `[Electron Highlighter Day]` and `[Electron Highlighter]` groups.

- [ ] **Step 5: Commit**

```bash
git -C palette add electron-dark.js electron-day.test.js
git -C palette commit -m "feat: add canonical dark palette (electron-dark)"
```

---

### Task 3: Wire dark into targets and the generator

**Files:**
- Modify: `palette/targets.js`
- Modify: `palette/generate.js`
- Modify: `palette/generate.test.js`

- [ ] **Step 1: Replace `palette/targets.js`**

```js
const day = require('./electron-day')
const dark = require('./electron-dark')

// One entry per format. `dest` maps each variant to its output path in that
// terminal's repo (paths are relative to this file via generate.js).
const formats = [
  { name: 'alacritty-toml', render: require('./formats/alacritty-toml'),
    dest: { day: '../alacritty/electron-highlighter-day.toml', dark: '../alacritty/electron-highlighter.toml' } },
  { name: 'alacritty-yaml', render: require('./formats/alacritty-yaml'),
    dest: { day: '../alacritty/electron_highlighter_day.yml', dark: '../alacritty/electron_highlighter.yml' } },
  { name: 'ghostty', render: require('./formats/ghostty'),
    dest: { day: '../ghostty/electron-highlighter-day', dark: '../ghostty/electron-highlighter' } },
  { name: 'kitty', render: require('./formats/kitty'),
    dest: { day: '../kitty/electron_highlighter_day.conf', dark: '../kitty/electron_highlighter.conf' } },
  { name: 'tmux', render: require('./formats/tmux'),
    dest: { day: '../tmux/electron_highlighter_day.conf', dark: '../tmux/electron_highlighter.conf' } },
  { name: 'hyper', render: require('./formats/hyper'),
    dest: { day: '../hyper/electron-highlighter-day.js', dark: '../hyper/electron-highlighter.js' } },
  { name: 'iterm', render: require('./formats/iterm'),
    dest: { day: '../terminal/electron-day.itermcolors', dark: '../terminal/electron.itermcolors' } },
  { name: 'gnome-terminal', render: require('./formats/gnome-terminal'),
    dest: { day: '../terminal/gnome-terminal-day.sh', dark: '../terminal/gnome-terminal.sh' } },
  { name: 'linux-console', render: require('./formats/linux-console'),
    dest: { day: '../terminal/linux-console-day.sh', dark: '../terminal/linux-console.sh' } },
]

const variants = { day, dark }

// Build the flat target list. Day targets keep their bare format name (so the
// existing goldens are unchanged); dark targets get a `-dark` suffix.
const targets = []
for (const f of formats) {
  targets.push({ name: f.name, render: f.render, palette: day, dest: f.dest.day })
  targets.push({ name: `${f.name}-dark`, render: f.render, palette: dark, dest: f.dest.dark })
}

module.exports = { day, dark, targets }
```

- [ ] **Step 2: Update `palette/generate.test.js` to render each target with its own palette**

```js
const test = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { targets } = require('./targets')

for (const t of targets) {
  test(`${t.name} matches its golden file`, () => {
    const expected = fs.readFileSync(path.join(__dirname, 'expected', t.name), 'utf8')
    assert.strictEqual(t.render(t.palette), expected)
  })
}
```

- [ ] **Step 3: Update the log line in `palette/generate.js`**

```js
// before
console.log(`\nGenerated ${targets.length} Day theme files.`)
// after
console.log(`\nGenerated ${targets.length} theme files (Day + dark).`)
```

(The loop body already uses `t.render(palette)` against a single import — change it to render each target with its own palette:)

```js
// before
const { palette, targets } = require('./targets')

for (const t of targets) {
  const out = t.render(palette)
// after
const { targets } = require('./targets')

for (const t of targets) {
  const out = t.render(t.palette)
```

- [ ] **Step 4: Run tests — Day goldens still pass, dark goldens missing**

Run: `cd palette && npm test`
Expected: the 9 Day `*` tests PASS; the 9 `*-dark` tests FAIL with `ENOENT ... expected/<format>-dark` (goldens not created yet). This confirms dark targets are wired.

- [ ] **Step 5: Commit**

```bash
git -C palette add targets.js generate.js generate.test.js
git -C palette commit -m "feat: add dark variant targets to the generator"
```

---

### Task 4: Generate, review, and freeze the dark goldens

The dark goldens are produced by the render functions, so they cannot be "asserted into existence" — they must be **eyeballed against the ghostty reference and diffed against the committed dark configs** before being frozen, otherwise the test is tautological.

**Files:**
- Create: `palette/expected/{alacritty-toml,alacritty-yaml,ghostty,kitty,tmux,hyper,iterm,gnome-terminal,linux-console}-dark`

- [ ] **Step 1: Write each dark target's rendered output into `expected/`**

Run from the `palette` dir:

```bash
cd palette && node -e '
const fs = require("node:fs"), path = require("node:path");
const { targets } = require("./targets");
for (const t of targets.filter(t => t.name.endsWith("-dark"))) {
  fs.writeFileSync(path.join("expected", t.name), t.render(t.palette));
  console.log("wrote expected/" + t.name);
}'
```

- [ ] **Step 2: Review the dark ANSI values against the ghostty reference**

Run: `diff <(grep '^palette' ../ghostty/config) <(grep '^palette' expected/ghostty-dark)`
Expected: identical ANSI lines (both list `palette = N=#hex` for 0–17). The `ghostty-dark` golden additionally has the `# Electron Highlighter` header and `background`/`foreground`/etc. — confirm those match `../ghostty/config`'s primary block.

- [ ] **Step 3: Diff each new golden against the committed dark file and confirm only intended normalizations changed**

For each pair below, run a diff and confirm every difference is either (a) a color drift correction toward ghostty, (b) a theme-name string, or (c) a role value now sourced from the canonical palette — and nothing else:

```bash
diff ../alacritty/electron-highlighter.toml expected/alacritty-toml-dark
diff ../alacritty/electron_highlighter.yml  expected/alacritty-yaml-dark
diff ../kitty/electron_highlighter.conf     expected/kitty-dark
diff ../tmux/electron_highlighter.conf      expected/tmux-dark
diff ../terminal/electron.itermcolors       expected/iterm-dark
```

Known/expected differences to verify, not fix:
- kitty: `color1`/`color9` `#ff5874` → `#f7768e`/`#ff93a7`; `color7` `#99a3b8` → `#7c8eac`; `color8` `#414868` → `#506686`; `inactive_tab_*`/`inactive_border` now from canonical roles.
- tmux: `# electron_highlighter theme` header preserved; values identical to committed (roles were sourced from it).
- hyper / ghostty / gnome / linux-console: no committed dark file at the new path (hyper uses `index.js`, gnome/linux were `.txt`) — review the rendered output directly for sanity instead.

If a diff shows an **unintended** change, fix `electron-dark.js` (not the golden), re-run Step 1, and re-review.

- [ ] **Step 4: Run the full suite — everything green**

Run: `cd palette && npm test`
Expected: all 18 golden tests PASS + all palette-shape tests PASS.

- [ ] **Step 5: Commit**

```bash
git -C palette add expected/alacritty-toml-dark expected/alacritty-yaml-dark expected/ghostty-dark expected/kitty-dark expected/tmux-dark expected/hyper-dark expected/iterm-dark expected/gnome-terminal-dark expected/linux-console-dark
git -C palette commit -m "test: add dark variant golden files"
```

- [ ] **Step 6: Update `palette/README.md`**

Change the opening description and the build/usage notes to mention both **Day** (light) and the regular (dark) variant, and that `npm run build` now emits both. Replace "every Day theme file" wording with "every Day and dark theme file". Commit:

```bash
git -C palette add README.md
git -C palette commit -m "docs: document the dark variant"
```

- [ ] **Step 7: Open the palette PR**

Push the branch and open a PR for the `palette` repo. This must merge before Part B, because Part B regenerates app files from this generator.

---

## Part B — Distribution to app repos (fan-out)

Once the palette PR is merged, regenerate and land each app repo's files via its own PR. **The generator uses relative `../<app>` paths, so `npm run build` must run from the peer checkout** `/Users/mike/personal/electron-highlighter/palette` (not a worktree). The six app repos are independent — their PRs can be opened in parallel.

- [ ] **Step 1: Regenerate all files from the peer checkout**

```bash
cd /Users/mike/personal/electron-highlighter/palette && git pull && npm run build
```

Expected: 18 `wrote ...` lines. The dark files now exist in each app's working tree.

- [ ] **Step 2: Remove the superseded stale files in the `terminal` repo**

```bash
git -C ../terminal rm gnome-terminal.txt linux-console.txt
```

- [ ] **Step 3: One PR per app repo** (fan out — independent)

For each repo, create a branch, stage **only** the generated dark file(s) for that repo, commit, push, and open a PR. Per-repo file lists:

| repo | files to stage |
|---|---|
| `alacritty` | `electron-highlighter.toml`, `electron_highlighter.yml` |
| `ghostty` | `electron-highlighter` |
| `kitty` | `electron_highlighter.conf` |
| `tmux` | `electron_highlighter.conf` |
| `hyper` | `electron-highlighter.js` |
| `terminal` | `electron.itermcolors`, `gnome-terminal.sh`, `linux-console.sh`, removed `gnome-terminal.txt`, `linux-console.txt` |

Commit message per repo: `feat: regenerate dark theme from canonical palette`.

- [ ] **Step 4: Sanity-check each PR diff**

Confirm each PR contains only the intended generated file(s) for that repo and matches the reviewed goldens from Part A Task 4.

---

## Self-review notes

- **Spec coverage:** dark palette (Task 2), name parameterization (Task 1), targets/paths (Task 3), goldens + tests (Task 4), stale `.txt` deletion (Part B Step 2), multi-repo distribution (Part B), README (Task 4 Step 6). All spec sections covered.
- **Type/name consistency:** `slug` added to both palettes and consumed identically in `gnome-terminal.js`/`tmux.js`; target objects carry `{name, render, palette, dest}` and `generate.test.js`/`generate.js` both use `t.render(t.palette)`.
- **Out of scope (flagged):** orphan `expected/fish` golden (no matching format/target) — pre-existing, not addressed here. Final dark `pink` is cosmetic and unused by renderers.
