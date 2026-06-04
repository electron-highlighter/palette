const test = require('node:test')
const assert = require('node:assert')
const palette = require('./electron-day')

test('every ANSI slot 0-17 is a valid #rrggbb', () => {
  for (let i = 0; i <= 17; i++) {
    assert.match(palette.ansi[i], /^#[0-9a-f]{6}$/, `ansi[${i}] invalid`)
  }
})

test('base keys are present and valid hex', () => {
  for (const key of ['background', 'foreground', 'comment', 'dim', 'lightGray', 'selection', 'cursor', 'cursorText']) {
    assert.match(palette.base[key], /^#[0-9a-f]{6}$/, `base.${key} invalid`)
  }
})

test('all eight accents are present and valid hex', () => {
  for (const key of ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink']) {
    assert.match(palette.accents[key], /^#[0-9a-f]{6}$/, `accents.${key} invalid`)
  }
})

test('semantic roles are present and valid hex', () => {
  for (const key of ['tmuxActive', 'tmuxInactive', 'tmuxSession', 'tmuxDir', 'tmuxTime', 'tmuxMessage', 'tmuxPaneBorder', 'hyperTabNavBg', 'hyperTabText', 'hyperTabTextActive', 'hyperBorder', 'hyperLink']) {
    assert.match(palette.roles[key], /^#[0-9a-f]{6}$/, `roles.${key} invalid`)
  }
})

test('red is keyed to TokyoNight Day', () => {
  assert.strictEqual(palette.accents.red, '#f52a65')
})
