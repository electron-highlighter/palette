module.exports = function render(p) {
  const { ansi, base, accents, roles } = p
  const head = `# vim:ft=kitty

## name: ${p.name}
## license: MIT
## author: Mike McBride
## upstream: https://github.com/electron-highlighter/kitty

background ${base.background}
foreground ${base.foreground}
selection_background ${base.selection}
selection_foreground ${base.foreground}
url_color ${roles.hyperLink}
cursor ${base.cursor}
cursor_text_color ${base.cursorText}

# Tabs
active_tab_background ${accents.blue}
active_tab_foreground ${base.background}
inactive_tab_background ${roles.hyperTabNavBg}
inactive_tab_foreground ${roles.hyperTabText}

# Windows
active_border_color ${accents.blue}
inactive_border_color ${base.lightGray}
`
  const normal = ['\n# normal']
  for (let i = 0; i <= 7; i++) normal.push(`color${i} ${ansi[i]}`)
  const bright = ['\n# bright']
  for (let i = 8; i <= 15; i++) bright.push(`color${i} ${ansi[i]}`)
  const extended = ['\n# extended colors', `color16 ${ansi[16]}`, `color17 ${ansi[17]}`]
  return head + normal.join('\n') + '\n' + bright.join('\n') + '\n' + extended.join('\n') + '\n'
}
