const fs = require('node:fs')
const path = require('node:path')
const { targets } = require('./targets')

for (const t of targets) {
  const out = t.render(t.palette)
  const dest = path.join(__dirname, t.dest)
  fs.writeFileSync(dest, out)
  console.log(`wrote ${t.dest}`)
}
console.log(`\nGenerated ${targets.length} theme files (Day + dark).`)
