const palette = require('./electron-day')

const targets = [
  { name: 'alacritty-toml', dest: '../alacritty/electron-highlighter-day.toml', render: require('./formats/alacritty-toml') },
]

module.exports = { palette, targets }
