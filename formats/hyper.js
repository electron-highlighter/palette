module.exports = function render(p) {
  const { base, accents, roles } = p
  return `'use strict'

const black = '${base.background}'
const white = '${base.foreground}'
const red = '${accents.red}'
const green = '${accents.green}'
const yellow = '${accents.yellow}'
const blue = '${accents.blue}'
const magenta = '${accents.purple}'
const cyan = '${accents.cyan}'
const lightBlack = '${base.comment}'

const colors = {
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  lightBlack,
  lightRed: red,
  lightGreen: green,
  lightYellow: yellow,
  lightBlue: blue,
  lightMagenta: magenta,
  lightCyan: cyan,
  lightWhite: white
}

module.exports.decorateConfig = config => {
  const backgroundColor = colors.black
  const foregroundColor = colors.white
  const cursorColor = config.cursorColor || colors.white
  const cursorAccentColor = config.cursorAccentColor || colors.black
  const borderColor = '${roles.hyperBorder}'
  const selectionColor = 'rgba(54, 111, 240, 0.2)'
  const tabNavBg = '${roles.hyperTabNavBg}'
  const tabText = lightBlack
  const tabTextActive = '${roles.hyperTabTextActive}'
  const dividerBg = 'rgba(194,198,212,.5)'

  return Object.assign({}, config, {
    foregroundColor,
    backgroundColor,
    borderColor,
    cursorColor,
    cursorAccentColor,
    selectionColor,
    colors,
    termCSS: \`
      \${config.termCSS || ''}
      .terminal a {
        color: \${cyan};
      }
    \`,
    css: \`
      \${config.css || ''}
      .tabs_nav {
        background-color: \${tabNavBg};
        border-bottom: 1px solid \${borderColor};
      }
      /* hide the tab border shim, we are providing our own */
      .tabs_borderShim {
        border-bottom-width: 0px;
      }
      /* Hide title when only one tab */
      .tabs_title {
  			display: none !important;
  		}
      .tab_textInner {
        color: \${tabText};
        font-weight: 500;
      }
      .tab_tab.tab_active {
        background-color: \${backgroundColor};
      }
      .tab_tab.tab_active .tab_textInner {
        color: \${tabTextActive};
      }
      .splitpane_divider {
        background-color: \${dividerBg} !important;
      }
    \`
  })
}
`
}
