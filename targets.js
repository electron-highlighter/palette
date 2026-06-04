const day = require('./electron-day')
const dark = require('./electron-dark')

// One entry per format. `dest` maps each variant to its output path in that
// terminal's repo (paths are relative to this file via generate.js).
const formats = [
  { name: 'alacritty-toml', render: require('./formats/alacritty-toml'),
    dest: { day: '../alacritty/electron-highlighter-day.toml', dark: '../alacritty/electron-highlighter.toml' } },
  { name: 'alacritty-yaml', render: require('./formats/alacritty-yaml'),
    dest: { day: '../alacritty/electron_highlighter_day.yml', dark: '../alacritty/electron_highlighter.yml' } },
  { name: 'ghostty', render: require('./formats/ghostty'),
    dest: { day: '../ghostty/electron-highlighter-day', dark: '../ghostty/electron-highlighter' } },
  { name: 'kitty', render: require('./formats/kitty'),
    dest: { day: '../kitty/electron_highlighter_day.conf', dark: '../kitty/electron_highlighter.conf' } },
  { name: 'tmux', render: require('./formats/tmux'),
    dest: { day: '../tmux/electron_highlighter_day.conf', dark: '../tmux/electron_highlighter.conf' } },
  { name: 'hyper', render: require('./formats/hyper'),
    dest: { day: '../hyper/electron-highlighter-day.js', dark: '../hyper/electron-highlighter.js' } },
  { name: 'iterm', render: require('./formats/iterm'),
    dest: { day: '../terminal/electron-day.itermcolors', dark: '../terminal/electron.itermcolors' } },
  { name: 'gnome-terminal', render: require('./formats/gnome-terminal'),
    dest: { day: '../terminal/gnome-terminal-day.sh', dark: '../terminal/gnome-terminal.sh' } },
  { name: 'linux-console', render: require('./formats/linux-console'),
    dest: { day: '../terminal/linux-console-day.sh', dark: '../terminal/linux-console.sh' } },
]

const variants = { day, dark }

// Build the flat target list. Day targets keep their bare format name (so the
// existing goldens are unchanged); dark targets get a `-dark` suffix.
const targets = []
for (const f of formats) {
  targets.push({ name: f.name, render: f.render, palette: day, dest: f.dest.day })
  targets.push({ name: `${f.name}-dark`, render: f.render, palette: dark, dest: f.dest.dark })
}

module.exports = { day, dark, targets }
