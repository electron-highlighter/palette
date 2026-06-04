module.exports = function render(p) {
  const { ansi } = p
  const lines = ['#!/bin/sh', 'if [ "$TERM" = "linux" ]; then', '  /bin/echo -e "']
  for (let i = 0; i <= 15; i++) {
    const slot = i.toString(16).toUpperCase() // 0-9, A-F
    lines.push(`  \\e]P${slot}${ansi[i].slice(1)}`)
  }
  lines.push('  "', '  # get rid of artifacts', '  clear', 'fi')
  return lines.join('\n') + '\n'
}
