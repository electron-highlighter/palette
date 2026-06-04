// Alacritty TOML. ANSI slots read from palette.ansi[0..15] (the canonical slot
// map); ansi[0]/[7]/[8]/[15] = lightGray/dim/comment/foreground per the
// light-terminal convention. base.* drives the non-ANSI primary/cursor/selection.
module.exports = function render(p) {
  const { ansi, base } = p
  return `# Colors (${p.name})

[colors.bright]
black = '${ansi[8]}'
blue = '${ansi[12]}'
cyan = '${ansi[14]}'
green = '${ansi[10]}'
magenta = '${ansi[13]}'
red = '${ansi[9]}'
white = '${ansi[15]}'
yellow = '${ansi[11]}'

[colors.cursor]
cursor = '${base.cursor}'
text = '${base.cursorText}'

[colors.normal]
black = '${ansi[0]}'
blue = '${ansi[4]}'
cyan = '${ansi[6]}'
green = '${ansi[2]}'
magenta = '${ansi[5]}'
red = '${ansi[1]}'
white = '${ansi[7]}'
yellow = '${ansi[3]}'

[colors.primary]
background = '${base.background}'
foreground = '${base.foreground}'

[colors.selection]
background = '${base.selection}'
text = '${base.foreground}'
`
}
