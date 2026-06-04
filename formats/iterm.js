// iTerm2 .itermcolors: XML plist, each color is a dict of 0..1 sRGB components.
const comp = (hex, i) => String(parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255)

function colorDict(hex) {
  return `	<dict>
		<key>Alpha Component</key>
		<real>1</real>
		<key>Blue Component</key>
		<real>${comp(hex, 2)}</real>
		<key>Color Space</key>
		<string>sRGB</string>
		<key>Green Component</key>
		<real>${comp(hex, 1)}</real>
		<key>Red Component</key>
		<real>${comp(hex, 0)}</real>
	</dict>`
}

module.exports = function render(p) {
  const { ansi, base } = p
  const entries = []
  for (let i = 0; i <= 15; i++) {
    entries.push(`	<key>Ansi ${i} Color</key>\n${colorDict(ansi[i])}`)
  }
  entries.push(`	<key>Background Color</key>\n${colorDict(base.background)}`)
  entries.push(`	<key>Foreground Color</key>\n${colorDict(base.foreground)}`)
  entries.push(`	<key>Cursor Color</key>\n${colorDict(base.cursor)}`)
  entries.push(`	<key>Cursor Text Color</key>\n${colorDict(base.cursorText)}`)
  entries.push(`	<key>Selection Color</key>\n${colorDict(base.selection)}`)
  entries.push(`	<key>Selected Text Color</key>\n${colorDict(base.foreground)}`)
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries.join('\n')}
</dict>
</plist>
`
}
