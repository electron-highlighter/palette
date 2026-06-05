// VS Code palette module (config/colors.js for dark, config/colors-light.js
// for Day). Emits the pure-data `module.exports = { ... }` color map consumed
// by @two-beards/vscode-theme-builder. Brand accents come straight from the
// palette; the neutral ramp is derived per-appearance:
//   black     darkest chrome      -> ui.surface (light) / ui.border (dark)
//   background editor background  -> base.background
//   darkGray  comments            -> base.comment
//   gray      secondary UI text   -> base.dim
//   lightGray editor foreground   -> base.foreground
//   white     brightest text      -> base.background (light) / ui.textBright (dark)
module.exports = function render(p) {
  const { base, accents, ui } = p
  const light = p.slug.endsWith('-day')

  const black = light ? ui.surface : ui.border
  const white = light ? base.background : ui.textBright

  const colors = {
    red: accents.red,
    orange: accents.orange,
    yellow: accents.yellow,
    green: accents.green,
    cyan: accents.cyan,
    blue: accents.blue,
    purple: accents.purple,
    pink: accents.pink,
    black,
    background: base.background,
    darkGray: base.comment,
    gray: base.dim,
    lightGray: base.foreground,
    white,
  }

  const lines = Object.entries(colors).map(([k, v]) => `  ${k}: '${v}',`)
  return `// Generated from electron-highlighter/palette (${p.name}). Do not edit by hand.\n` +
    `// Run \`npm run build\` in the palette repo to regenerate.\n` +
    `module.exports = {\n${lines.join('\n')}\n}\n`
}
