const palette = require('./electron-day')

const targets = [
  { name: 'alacritty-toml', dest: '../alacritty/electron-highlighter-day.toml', render: require('./formats/alacritty-toml') },
  { name: 'alacritty-yaml', dest: '../alacritty/electron_highlighter_day.yml', render: require('./formats/alacritty-yaml') },
  { name: 'ghostty', dest: '../ghostty/electron-highlighter-day', render: require('./formats/ghostty') },
  { name: 'kitty', dest: '../kitty/electron_highlighter_day.conf', render: require('./formats/kitty') },
  { name: 'tmux', dest: '../tmux/electron_highlighter_day.conf', render: require('./formats/tmux') },
]

module.exports = { palette, targets }
