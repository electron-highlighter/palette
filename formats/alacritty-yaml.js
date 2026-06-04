// Legacy Alacritty YAML uses 0x-prefixed hex. ANSI slots from palette.ansi[].
const x = (hex) => '0x' + hex.slice(1)

module.exports = function render(p) {
  const { ansi, base } = p
  return `# Electron Highlighter Day Alacritty Colors
colors:
  # Default colors
  primary:
    background: '${x(base.background)}'
    foreground: '${x(base.foreground)}'

  # Normal colors
  normal:
    black:   '${x(ansi[0])}'
    red:     '${x(ansi[1])}'
    green:   '${x(ansi[2])}'
    yellow:  '${x(ansi[3])}'
    blue:    '${x(ansi[4])}'
    magenta: '${x(ansi[5])}'
    cyan:    '${x(ansi[6])}'
    white:   '${x(ansi[7])}'

  # Bright colors
  bright:
    black:   '${x(ansi[8])}'
    red:     '${x(ansi[9])}'
    green:   '${x(ansi[10])}'
    yellow:  '${x(ansi[11])}'
    blue:    '${x(ansi[12])}'
    magenta: '${x(ansi[13])}'
    cyan:    '${x(ansi[14])}'
    white:   '${x(ansi[15])}'

  indexed_colors:
    - { index: 16, color: '${x(ansi[16])}' }
    - { index: 17, color: '${x(ansi[17])}' }
`
}
