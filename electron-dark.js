// Canonical palette for Electron Highlighter (regular / dark). Single source of
// truth for every terminal emitter's dark output. Values mirror the ghostty
// reference config; the other terminals' dark files are normalized to match.

const base = {
  background: '#24283b',
  foreground: '#a8b5d1',
  comment: '#7c8eac',   // hyper dark "lightBlack"
  dim: '#545c7e',       // dark UI dim
  lightGray: '#1b212c', // tmux dark surface / hyper tab-nav background
  selection: '#283457',
  cursor: '#a8b5d1',
  cursorText: '#1a1b26',
}

const accents = {
  red: '#f7768e',
  orange: '#ffbf7a',
  yellow: '#ffd9af',
  green: '#58ffc7',
  cyan: '#57f9ff',
  blue: '#82aaff',
  purple: '#d2a6ef',
  pink: '#ff007c', // emitted by the fish theme (keyword/escape); the project's dark pink
}

// ANSI 0-17, from the ghostty reference palette. Conventional dark mapping:
// "black" slots hold dark colors, "white" slots hold light readable colors.
const ansi = {
  0: '#15161e', 1: accents.red, 2: accents.green, 3: accents.yellow,
  4: accents.blue, 5: accents.purple, 6: accents.cyan, 7: '#7c8eac',
  8: '#506686', 9: '#ff93a7', 10: accents.green, 11: accents.yellow,
  12: accents.blue, 13: accents.purple, 14: accents.cyan, 15: '#c5cee0',
  16: accents.orange, 17: accents.yellow,
}

const roles = {
  tmuxActive: accents.green,
  tmuxInactive: accents.blue,
  tmuxSession: accents.yellow,
  tmuxDir: accents.purple,
  tmuxTime: accents.cyan,
  tmuxMessage: '#34febb',
  tmuxPaneBorder: '#3b4261',
  hyperTabNavBg: '#1b212c',
  hyperTabText: '#7c8eac',
  hyperTabTextActive: '#d5d9e2',
  hyperBorder: '#141820',
  hyperLink: accents.cyan,
}

module.exports = { name: 'Electron Highlighter', slug: 'electron-highlighter', base, accents, ansi, roles }
