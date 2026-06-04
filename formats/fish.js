// fish shell color palette. fish uses bare hex (no leading #). Named palette
// colors map to fish_color_*/fish_pager_color_* roles, mirroring the dark theme.
// Note: `$foo` in the output is a fish variable reference (literal here) — only
// `${...}` is JS interpolation, so no escaping is needed.
const h = (hex) => hex.slice(1)

module.exports = function render(p) {
  const { base, accents } = p
  return `# ${p.name} Color Palette
set -l foreground ${h(base.foreground)}
set -l selection ${h(base.selection)}
set -l comment ${h(base.comment)}
set -l red ${h(accents.red)}
set -l orange ${h(accents.orange)}
set -l yellow ${h(accents.yellow)}
set -l green ${h(accents.green)}
set -l blue ${h(accents.blue)}
set -l purple ${h(accents.purple)}
set -l cyan ${h(accents.cyan)}
set -l pink ${h(accents.pink)}

# Syntax Highlighting Colors
set -g fish_color_normal $foreground
set -g fish_color_command $green
set -g fish_color_keyword $pink
set -g fish_color_quote $yellow
set -g fish_color_redirection $foreground
set -g fish_color_end $orange
set -g fish_color_error $red
set -g fish_color_param $foreground
set -g fish_color_comment $comment
set -g fish_color_selection --background=$selection
set -g fish_color_search_match --background=$selection
set -g fish_color_operator $green
set -g fish_color_escape $pink
set -g fish_color_autosuggestion $comment

# Completion Pager Colors
set -g fish_pager_color_progress $comment
set -g fish_pager_color_prefix $cyan
set -g fish_pager_color_completion $foreground
set -g fish_pager_color_description $comment
`
}
