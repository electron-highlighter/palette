// Neovim colorscheme palette (lua/electron_highlighter/colors.lua). Unlike the
// other formats this file holds THREE variants in one output, so it receives
// the combined `{ day, dark }` palette (see targets.js).
//
// Canonical brand colors (bg, fg, comment, the 8 accents, git roles) come from
// the palette. Neovim-specific supporting shades (bg_dark, blue0-7, dark3/5,
// terminal_black, etc.) have no palette equivalent and live here as the nvim
// adapter's own ramp. `default` and `night` share one dark ramp and differ only
// in their background pair.

// nvim-specific derived shades for the dark variants (default + night).
const darkExtra = {
  bg_highlight: '#37435C',
  terminal_black: '#414868',
  fg_dark: '#99a3b8',
  fg_gutter: '#3b4261',
  dark3: '#545c7e',
  dark5: '#737aa2',
  blue0: '#3d59a1',
  blue1: '#22d3ee',
  blue2: '#06b6d4',
  blue5: '#7dd3fc',
  blue6: '#a5f3fc',
  blue7: '#375574',
  magenta2: '#ff007c',
  teal: '#14b8a6',
  green1: '#34febb',
  green2: '#34febb',
  red1: '#ff5874',
}

// nvim-specific derived shades for the light (Day) variant.
const dayExtra = {
  bg_highlight: '#dde3ee',
  terminal_black: '#c2c6d4',
  fg_dark: '#59647e',
  fg_gutter: '#aab4c6',
  dark3: '#aab4c6',
  dark5: '#8b95aa',
  blue0: '#c4d4f5',
  blue1: '#0a9fbf',
  blue2: '#2f6ee6',
  blue5: '#5f86e0',
  blue6: '#9bb5f5',
  blue7: '#b6c2e8',
  magenta2: '#e62b86',
  teal: '#0e9488',
  green1: '#0c9b6e',
  green2: '#10a877',
  red1: '#e11d48',
}

// Build the canonical block shared by the table builder. `bg`/`bg_dark` are
// passed in because `default` and `night` use different background pairs.
function variant(p, extra, bg, bgDark, dayComment) {
  const { base, accents } = p
  const a = accents
  return `  none = "NONE",
  bg = "${bg}",
  bg_dark = "${bgDark}",
  bg_highlight = "${extra.bg_highlight}",
  terminal_black = "${extra.terminal_black}",
  fg = "${base.foreground}",
  fg_dark = "${extra.fg_dark}",
  fg_gutter = "${extra.fg_gutter}",
  comment = "${base.comment}",
  blue = "${a.blue}",
  cyan = "${a.cyan}",
  orange = "${a.orange}",
  yellow = "${a.yellow}",
  green = "${a.green}",
  red = "${a.red}",
  git = {
    add = "${a.green}",
    change = "${a.yellow}",
    delete = "${a.red}",
  },
  gitSigns = {
    add = "${a.green}",
    change = "${a.yellow}",
    delete = "${a.red}",
  },
  dark3 = "${extra.dark3}",
  dark5 = "${extra.dark5}",
  blue0 = "${extra.blue0}",
  blue1 = "${extra.blue1}",
  blue2 = "${extra.blue2}",
  blue5 = "${extra.blue5}",
  blue6 = "${extra.blue6}",
  blue7 = "${extra.blue7}",
  magenta = "${a.purple}",
  magenta2 = "${extra.magenta2}",
  teal = "${extra.teal}",
  green1 = "${extra.green1}",
  green2 = "${extra.green2}",
  red1 = "${extra.red1}",`
}

// Verbatim setup() logic; this file owns the palette tables only.
const SETUP = `---@return ColorScheme
function M.setup(opts)
  opts = opts or {}
  local config = require("electron_highlighter.config")

  local style = config.options.style
  local palette = M[style] or {}
  if type(palette) == "function" then
    palette = palette()
  end

  -- Color Palette
  ---@class ColorScheme: Palette
  local colors = vim.tbl_deep_extend("force", vim.deepcopy(M.default), palette)

  util.bg = colors.bg
  util.fg = config.options.style == "day" and colors.fg or "#ffffff"
  util.day_brightness = config.options.day_brightness

  colors.diff = {
    add = util.darken(colors.green2, 0.15),
    delete = util.darken(colors.red1, 0.15),
    change = util.darken(colors.blue7, 0.15),
    text = colors.blue7,
  }

  colors.git.ignore = colors.dark3
  local is_day = config.options.style == "day"
  colors.black = is_day and "#1f2733" or util.darken(colors.bg, 0.8, "#000000")
  colors.border_highlight = is_day and "#366ff0" or util.darken(colors.blue1, 0.8)
  colors.border = is_day and "#d3d8e3" or colors.black

  -- Popups and statusline always get a dark background
  colors.bg_popup = colors.bg_dark
  colors.bg_statusline = colors.bg

  -- Sidebar and Floats are configurable
  colors.bg_sidebar = config.options.styles.sidebars == "transparent" and colors.none
      or config.options.styles.sidebars == "dark" and colors.bg_dark
      or colors.bg

  colors.bg_float = config.options.styles.floats == "transparent" and colors.none
      or config.options.styles.floats == "dark" and colors.bg_dark
      or colors.bg
  colors.bg_visual = util.darken(colors.blue0, 0.4)
  colors.bg_search = colors.blue0
  colors.fg_sidebar = colors.fg_dark
  -- colors.fg_float = config.options.styles.floats == "dark" and colors.fg_dark or colors.fg
  colors.fg_float = colors.fg

  colors.error = colors.red1
  colors.warning = colors.yellow
  colors.info = colors.blue2
  colors.hint = colors.teal

  colors.delta = {
    add = util.darken(colors.green2, 0.45),
    delete = util.darken(colors.red1, 0.45),
  }

  config.options.on_colors(colors)
  return colors
end

return M`

module.exports = function render(p) {
  const { day, dark } = p
  return `local util = require("electron_highlighter.util")

local M = {}

---@class Palette
M.default = {
${variant(dark, darkExtra, dark.base.background, '#1f2335')}
}

M.night = {
${variant(dark, darkExtra, '#1b212c', '#141820')}
}

-- Light variant — Electron Highlighter Day. Values from the canonical palette
-- (electron-highlighter/palette: electron-day.js). Light-appropriate supporting
-- shades (blue0-7, dark3/5) are tuned for a light background.
M.day = {
${variant(day, dayExtra, day.base.background, day.ui.surface)}
}

${SETUP}
`
}
