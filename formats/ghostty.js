module.exports = function render(p) {
  const { ansi, base } = p
  const lines = ['# Electron Highlighter Day',
    `background = ${base.background}`,
    `foreground = ${base.foreground}`,
    `selection-background = ${base.selection}`,
    `selection-foreground = ${base.foreground}`,
    `cursor-color = ${base.cursor}`,
    `cursor-text = ${base.cursorText}`,
    '']
  for (let i = 0; i <= 17; i++) lines.push(`palette = ${i}=${ansi[i]}`)
  return lines.join('\n') + '\n'
}
