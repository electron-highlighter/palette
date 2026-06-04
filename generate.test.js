const test = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { palette, targets } = require('./targets')

for (const t of targets) {
  test(`${t.name} matches its golden file`, () => {
    const expected = fs.readFileSync(path.join(__dirname, 'expected', t.name), 'utf8')
    assert.strictEqual(t.render(palette), expected)
  })
}
