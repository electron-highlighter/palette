const fs = require('node:fs')
const path = require('node:path')
const { palette, targets } = require('./targets')

for (const t of targets) {
  const out = t.render(palette)
  const dest = path.join(__dirname, t.dest)
  fs.writeFileSync(dest, out)
  console.log(`wrote ${t.dest}`)
}
console.log(`\nGenerated ${targets.length} Day theme files.`)
