const palette = require('./electron-day')

const targets = [
  { name: 'alacritty-toml', dest: '../alacritty/electron-highlighter-day.toml', render: require('./formats/alacritty-toml') },
  { name: 'alacritty-yaml', dest: '../alacritty/electron_highlighter_day.yml', render: require('./formats/alacritty-yaml') },
  { name: 'ghostty', dest: '../ghostty/electron-highlighter-day', render: require('./formats/ghostty') },
  { name: 'kitty', dest: '../kitty/electron_highlighter_day.conf', render: require('./formats/kitty') },
  { name: 'tmux', dest: '../tmux/electron_highlighter_day.conf', render: require('./formats/tmux') },
  { name: 'hyper', dest: '../hyper/electron-highlighter-day.js', render: require('./formats/hyper') },
  { name: 'iterm', dest: '../terminal/electron-day.itermcolors', render: require('./formats/iterm') },
  { name: 'gnome-terminal', dest: '../terminal/gnome-terminal-day.sh', render: require('./formats/gnome-terminal') },
  { name: 'linux-console', dest: '../terminal/linux-console-day.sh', render: require('./formats/linux-console') },
  { name: 'fish', dest: '../fish/electron-highlighter-day.fish', render: require('./formats/fish') },
]

module.exports = { palette, targets }
