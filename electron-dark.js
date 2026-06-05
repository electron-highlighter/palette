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
  orange: '#ffd1ad', // warm orange (H26), lightened for brightness on the dark bg
  yellow: '#ffecb8', // true yellow (H44), lightened to match; completes the warm ramp
  green: '#58ffc7',
  cyan: '#5ce1ff', // sky-cyan (H191) sitting evenly between the mint green and blue
  blue: '#82aaff',
  purple: '#d2a6ef',
  pink: '#f4a8d8', // emitted by the fish theme (keyword/escape); soft orchid pink that matches the pastel dark accents
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

const ui = {
  surface: '#222537',
  elementBg: '#202334',
  elementHover: '#2a2f45',
  elementActive: '#2f354e',
  elementSelected: '#2f385e',
  border: '#141620',
  borderVariant: '#2f344d',
  borderDisabled: '#383f5d',
  titleBarInactive: '#292d43',
  lineNumber: '#4e5b88',
  activeLineNumber: '#7586b3',
  textBright: '#c5cde0',
  gitAddedBorder: '#3bd19b',
  gitModifiedBorder: '#a17d57',
  gitDeletedBorder: '#a6374a',
  infoBorder: '#293b5b',
}

module.exports = { name: 'Electron Highlighter', slug: 'electron-highlighter', base, accents, ansi, roles, ui }
