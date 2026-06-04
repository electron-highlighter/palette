// Canonical palette for Electron Highlighter Day. Single source of truth for
// every terminal emitter. Light variant: red keyed to TokyoNight Day, tuned
// accents, lightened cool blue-gray background.

const base = {
  background: '#eef0f5',
  foreground: '#2f3b54',
  comment: '#7b88a8',
  dim: '#59647e',
  lightGray: '#c2c6d4',
  selection: '#d6def5',
  cursor: '#2f3b54',
  cursorText: '#eef0f5',
}

const accents = {
  red: '#f52a65',
  orange: '#f0633c',
  yellow: '#d18a16',
  green: '#10a877',
  cyan: '#0a9fbf',
  blue: '#366ff0',
  purple: '#8b4fe0',
  pink: '#e62b86',
}

// ANSI 0-17. Light-terminal convention: "black" slots hold light grays,
// "white" slots hold the dark readable colors.
const ansi = {
  0: base.lightGray, 1: accents.red, 2: accents.green, 3: accents.yellow,
  4: accents.blue, 5: accents.purple, 6: accents.cyan, 7: base.dim,
  8: base.comment, 9: accents.red, 10: accents.green, 11: accents.yellow,
  12: accents.blue, 13: accents.purple, 14: accents.cyan, 15: base.foreground,
  16: accents.orange, 17: accents.red,
}

const roles = {
  tmuxActive: accents.green,
  tmuxInactive: accents.blue,
  tmuxSession: accents.yellow,
  tmuxDir: accents.purple,
  tmuxTime: accents.cyan,
  tmuxMessage: accents.green,
  tmuxPaneBorder: base.lightGray,
  hyperTabNavBg: '#e4e7ee',
  hyperTabText: base.dim,
  hyperTabTextActive: base.foreground,
  hyperBorder: '#d3d8e3',
  hyperLink: accents.cyan,
}

module.exports = { name: 'Electron Highlighter Day', slug: 'electron-highlighter-day', base, accents, ansi, roles }
