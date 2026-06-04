module.exports = function render(p) {
  const { base, roles } = p
  const vars = `# ${p.slug.replace(/-/g, '_')} theme
tmux_thm_fg="${base.foreground}"
tmux_thm_bg="${base.background}"
tmux_thm_black="${base.lightGray}"
tmux_thm_gray="${roles.tmuxPaneBorder}"
tmux_thm_active="${roles.tmuxActive}"
tmux_thm_inactive="${roles.tmuxInactive}"
tmux_thm_session="${roles.tmuxSession}"
tmux_thm_dir="${roles.tmuxDir}"
tmux_thm_time="${roles.tmuxTime}"
tmux_thm_message="${roles.tmuxMessage}"
`
  const body = `
# status:
set -gq status "on"
set -gq status-bg "\${tmux_thm_bg}"
set -gq status-justify "left"
set -gq status-left-length "100"
set -gq status-right-length "100"
set -gq status-position bottom

# messages
set -gq message-style "fg=\${tmux_thm_bg},bg=\${tmux_thm_message},align=centre"
set -gq message-command-style "fg=\${tmux_thm_bg},bg=\${tmux_thm_message},align=centre"

# panes
set -gq pane-border-style "fg=\${tmux_thm_gray}"
set -gq pane-active-border-style "fg=\${tmux_thm_inactive}"

# windows
setw -gq window-status-activity-style "fg=\${tmux_thm_fg},bg=\${tmux_thm_bg},none"
setw -gq window-status-separator ""
setw -gq window-status-style "fg=\${tmux_thm_fg},bg=\${tmux_thm_bg},none"

# --------=== Statusline

# current session name
session_column="#[fg=\$tmux_thm_session,bg=\$tmux_thm_bg] #S "

# time
time_column="#[bg=\$tmux_thm_bg,fg=\$tmux_thm_time] %R"

# current directory name
current_dir_column="#[bg=\$tmux_thm_bg,fg=\$tmux_thm_dir]  #{b:pane_current_path} "

# inactive window
window_status_format="#[bg=\$tmux_thm_bg,fg=\$tmux_thm_inactive][#I] #W "

# active window
window_status_current_format="#[bg=\$tmux_thm_bg,fg=\$tmux_thm_active][#I] #W "

# Set the status items.
# left side gets the session name plus a list of windows.
# right side gets the current time and current directory.
set -gq status-left "\${session_column}"
set -gq status-right "\${current_dir_column} \${time_column}"
setw -gq window-status-format "\${window_status_format}"
setw -gq window-status-current-format "\${window_status_current_format}"

# make background color "default" - e.g., use the color of the terminal.
# I don't know why we also have to set this when we set the status-bg
set-option -g status-style bg="\${tmux_thm_bg}"
`
  return vars + body
}
