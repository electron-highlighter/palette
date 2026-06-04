module.exports = function render(p) {
  const { ansi, base, accents } = p
  return `# Colors (Electron Highlighter Day)

[colors.bright]
black = '${ansi[8]}'
blue = '${accents.blue}'
cyan = '${accents.cyan}'
green = '${accents.green}'
magenta = '${accents.purple}'
red = '${accents.red}'
white = '${ansi[15]}'
yellow = '${accents.yellow}'

[colors.cursor]
cursor = '${base.cursor}'
text = '${base.cursorText}'

[colors.normal]
black = '${ansi[0]}'
blue = '${accents.blue}'
cyan = '${accents.cyan}'
green = '${accents.green}'
magenta = '${accents.purple}'
red = '${accents.red}'
white = '${ansi[7]}'
yellow = '${accents.yellow}'

[colors.primary]
background = '${base.background}'
foreground = '${base.foreground}'

[colors.selection]
background = '${base.selection}'
text = '${base.foreground}'
`
}
