// Zed theme. One theme object built from the palette; Zed auto-discovers the
// file in themes/ and reads `appearance` to slot it into light/dark.
const a = (hex, alpha) => hex + alpha   // #rrggbb + "1a" -> #rrggbb1a
const opaque = (hex) => hex + 'ff'

module.exports = function render(p) {
  const { base, accents, ansi, ui } = p
  const appearance = p.slug.endsWith('-day') ? 'light' : 'dark'

  const theme = {
    name: p.name,
    appearance,
    style: {
      // --- Borders ---
      'border':                                    opaque(ui.border),
      'border.variant':                            opaque(ui.borderVariant),
      'border.focused':                            opaque(accents.blue),
      'border.selected':                           opaque(ui.infoBorder),
      'border.transparent':                        '#00000000',
      'border.disabled':                           opaque(ui.borderDisabled),

      // --- Surfaces / backgrounds ---
      'elevated_surface.background':               opaque(ui.surface),
      'surface.background':                        opaque(ui.surface),
      'background':                                opaque(base.background),
      'element.background':                        opaque(ui.elementBg),
      'element.hover':                             opaque(ui.elementHover),
      'element.active':                            opaque(ui.elementActive),
      'element.selected':                          opaque(ui.elementSelected),
      'element.disabled':                          opaque(ui.elementBg),
      'drop_target.background':                    a(base.dim, '80'),

      // --- Ghost elements ---
      'ghost_element.background':                  '#00000000',
      'ghost_element.hover':                       opaque(ui.elementHover),
      'ghost_element.active':                      opaque(ui.elementActive),
      'ghost_element.selected':                    opaque(ui.elementSelected),
      'ghost_element.disabled':                    opaque(ui.elementBg),

      // --- Text ---
      'text':                                      opaque(ui.textBright),
      'text.muted':                                opaque(base.foreground),
      'text.placeholder':                          opaque(base.comment),
      'text.disabled':                             opaque(base.comment),
      'text.accent':                               opaque(accents.blue),

      // --- Icons ---
      'icon':                                      opaque(ui.textBright),
      'icon.muted':                                opaque(base.foreground),
      'icon.disabled':                             opaque(base.comment),
      'icon.placeholder':                          opaque(base.dim),
      'icon.accent':                               opaque(accents.blue),

      // --- Bars / chrome ---
      'status_bar.background':                     opaque(base.background),
      'title_bar.background':                      opaque(base.background),
      'title_bar.inactive_background':             opaque(ui.titleBarInactive),
      'toolbar.background':                        opaque(base.background),
      'tab_bar.background':                        opaque(ui.surface),
      'tab.inactive_background':                   opaque(ui.surface),
      'tab.active_background':                     opaque(base.background),

      // --- Search ---
      'search.match_background':                   a(accents.blue, '66'),
      'search.active_match_background':            a(accents.orange, '66'),

      // --- Panels ---
      'panel.background':                          opaque(ui.surface),
      'panel.focused_border':                      opaque(accents.blue),
      'pane.focused_border':                       opaque(accents.blue),

      // --- Scrollbar ---
      'scrollbar.thumb.background':                a(base.dim, '4c'),
      'scrollbar.thumb.hover_background':          a(base.dim, '2f'),
      'scrollbar.thumb.border':                    opaque(ui.borderVariant),
      'scrollbar.track.background':                '#00000000',
      'scrollbar.track.border':                    opaque(ui.borderVariant),

      // --- Editor ---
      'editor.foreground':                         opaque(base.foreground),
      'editor.background':                         opaque(base.background),
      'editor.gutter.background':                  opaque(base.background),
      'editor.subheader.background':               opaque(ui.surface),
      'editor.active_line.background':             a(base.selection, 'bf'),
      'editor.highlighted_line.background':        opaque(ui.surface),
      'editor.line_number':                        opaque(ui.lineNumber),
      'editor.active_line_number':                 opaque(ui.activeLineNumber),
      'editor.hover_line_number':                  opaque(ui.activeLineNumber),
      'editor.invisible':                          opaque(ui.activeLineNumber),
      'editor.wrap_guide':                         a(base.dim, '0d'),
      'editor.active_wrap_guide':                  a(base.dim, '1a'),
      'editor.document_highlight.read_background': a(accents.blue, '1a'),
      'editor.document_highlight.write_background':a(base.dim, '66'),

      // --- Terminal ---
      'terminal.background':                       opaque(base.background),
      'terminal.foreground':                       opaque(base.foreground),
      'terminal.bright_foreground':                opaque(ui.textBright),
      'terminal.dim_foreground':                   opaque(ui.lineNumber),
      'terminal.ansi.black':                       opaque(ansi[0]),
      'terminal.ansi.bright_black':                opaque(ansi[8]),
      'terminal.ansi.dim_black':                   opaque(ansi[0]),
      'terminal.ansi.red':                         opaque(ansi[1]),
      'terminal.ansi.bright_red':                  opaque(ansi[9]),
      'terminal.ansi.dim_red':                     opaque(ansi[1]),
      'terminal.ansi.green':                       opaque(ansi[2]),
      'terminal.ansi.bright_green':                opaque(ansi[10]),
      'terminal.ansi.dim_green':                   opaque(ansi[2]),
      'terminal.ansi.yellow':                      opaque(ansi[3]),
      'terminal.ansi.bright_yellow':               opaque(ansi[11]),
      'terminal.ansi.dim_yellow':                  opaque(ansi[3]),
      'terminal.ansi.blue':                        opaque(ansi[4]),
      'terminal.ansi.bright_blue':                 opaque(ansi[12]),
      'terminal.ansi.dim_blue':                    opaque(ansi[4]),
      'terminal.ansi.magenta':                     opaque(ansi[5]),
      'terminal.ansi.bright_magenta':              opaque(ansi[13]),
      'terminal.ansi.dim_magenta':                 opaque(ansi[5]),
      'terminal.ansi.cyan':                        opaque(ansi[6]),
      'terminal.ansi.bright_cyan':                 opaque(ansi[14]),
      'terminal.ansi.dim_cyan':                    opaque(ansi[6]),
      'terminal.ansi.white':                       opaque(ansi[7]),
      'terminal.ansi.bright_white':                opaque(ansi[15]),
      'terminal.ansi.dim_white':                   opaque(ansi[7]),

      // --- Links ---
      'link_text.hover':                           opaque(accents.blue),

      // --- Version control ---
      'version_control.added':                     opaque(accents.green),
      'version_control.modified':                  opaque(accents.yellow),
      'version_control.word_added':                a(accents.green, '59'),
      'version_control.word_deleted':              a(accents.red, 'cc'),
      'version_control.deleted':                   opaque(accents.red),
      'version_control.conflict_marker.ours':      a(accents.green, '1a'),
      'version_control.conflict_marker.theirs':    a(accents.blue, '1a'),

      // --- Diagnostics / status: conflict ---
      'conflict':                                  opaque(accents.yellow),
      'conflict.background':                       a(accents.yellow, '1a'),
      'conflict.border':                           opaque(ui.gitModifiedBorder),

      // --- Diagnostics / status: created ---
      'created':                                   opaque(accents.green),
      'created.background':                        a(accents.green, '1a'),
      'created.border':                            opaque(ui.gitAddedBorder),

      // --- Diagnostics / status: deleted ---
      'deleted':                                   opaque(accents.red),
      'deleted.background':                        a(accents.red, '1a'),
      'deleted.border':                            opaque(ui.gitDeletedBorder),

      // --- Diagnostics / status: error ---
      'error':                                     opaque(accents.red),
      'error.background':                          a(accents.red, '1a'),
      'error.border':                              opaque(ui.gitDeletedBorder),

      // --- Diagnostics / status: hidden ---
      'hidden':                                    opaque(base.comment),
      'hidden.background':                         a(base.comment, '1a'),
      'hidden.border':                             opaque(ui.borderDisabled),

      // --- Diagnostics / status: hint ---
      'hint':                                      opaque(base.comment),
      'hint.background':                           a(base.comment, '1a'),
      'hint.border':                               opaque(base.background),

      // --- Diagnostics / status: ignored ---
      'ignored':                                   opaque(base.comment),
      'ignored.background':                        a(base.comment, '1a'),
      'ignored.border':                            opaque(ui.borderDisabled),

      // --- Diagnostics / status: info ---
      'info':                                      opaque(accents.blue),
      'info.background':                           a(accents.blue, '1a'),
      'info.border':                               opaque(ui.infoBorder),

      // --- Diagnostics / status: modified ---
      'modified':                                  opaque(accents.yellow),
      'modified.background':                       a(accents.yellow, '1a'),
      'modified.border':                           opaque(ui.gitModifiedBorder),

      // --- Diagnostics / status: predictive ---
      'predictive':                                opaque(base.comment),
      'predictive.background':                     a(base.comment, '1a'),
      'predictive.border':                         opaque(ui.border),

      // --- Diagnostics / status: renamed ---
      'renamed':                                   opaque(accents.blue),
      'renamed.background':                        a(accents.blue, '1a'),
      'renamed.border':                            opaque(ui.infoBorder),

      // --- Diagnostics / status: success ---
      'success':                                   opaque(accents.green),
      'success.background':                        a(accents.green, '1a'),
      'success.border':                            opaque(ui.gitAddedBorder),

      // --- Diagnostics / status: unreachable ---
      'unreachable':                               opaque(base.dim),
      'unreachable.background':                    a(base.dim, '1a'),
      'unreachable.border':                        opaque(ui.borderDisabled),

      // --- Diagnostics / status: warning ---
      'warning':                                   opaque(accents.yellow),
      'warning.background':                        a(accents.yellow, '1a'),
      'warning.border':                            opaque(ui.gitModifiedBorder),

      // --- Players (8) ---
      players: [
        { cursor: opaque(accents.blue),   background: opaque(accents.blue),   selection: a(accents.blue,   '3d') },
        { cursor: opaque(accents.red),    background: opaque(accents.red),    selection: a(accents.red,    '3d') },
        { cursor: opaque(accents.yellow), background: opaque(accents.yellow), selection: a(accents.yellow, '3d') },
        { cursor: opaque(accents.purple), background: opaque(accents.purple), selection: a(accents.purple, '3d') },
        { cursor: opaque(accents.cyan),   background: opaque(accents.cyan),   selection: a(accents.cyan,   '3d') },
        { cursor: opaque(accents.green),  background: opaque(accents.green),  selection: a(accents.green,  '3d') },
        { cursor: opaque(accents.pink),   background: opaque(accents.pink),   selection: a(accents.pink,   '3d') },
        { cursor: opaque(base.dim),       background: opaque(base.dim),       selection: a(base.dim,       '3d') },
      ],

      // --- Syntax tokens ---
      syntax: {
        'attribute':             { color: opaque(accents.cyan),       font_style: null, font_weight: null },
        'boolean':               { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'comment':               { color: opaque(base.comment),       font_style: null, font_weight: null },
        'comment.doc':           { color: opaque(base.comment),       font_style: null, font_weight: null },
        'constant':              { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'constructor':           { color: opaque(accents.blue),       font_style: null, font_weight: null },
        'embedded':              { color: opaque(ui.textBright),      font_style: null, font_weight: null },
        'emphasis':              { color: opaque(accents.blue),       font_style: null, font_weight: null },
        'emphasis.strong':       { color: opaque(accents.yellow),     font_style: null, font_weight: 700  },
        'enum':                  { color: opaque(accents.red),        font_style: null, font_weight: null },
        'function':              { color: opaque(accents.blue),       font_style: null, font_weight: null },
        'hint':                  { color: opaque(base.comment),       font_style: null, font_weight: null },
        'keyword':               { color: opaque(accents.purple),     font_style: null, font_weight: null },
        'label':                 { color: opaque(accents.blue),       font_style: null, font_weight: null },
        'link_text':             { color: opaque(accents.blue),       font_style: 'normal', font_weight: null },
        'link_uri':              { color: opaque(accents.cyan),       font_style: null, font_weight: null },
        'namespace':             { color: opaque(ui.textBright),      font_style: null, font_weight: null },
        'number':                { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'operator':              { color: opaque(accents.cyan),       font_style: null, font_weight: null },
        'predictive':            { color: opaque(base.comment),       font_style: 'italic', font_weight: null },
        'preproc':               { color: opaque(ui.textBright),      font_style: null, font_weight: null },
        'primary':               { color: opaque(base.foreground),    font_style: null, font_weight: null },
        'property':              { color: opaque(accents.cyan),       font_style: null, font_weight: null },
        'punctuation':           { color: opaque(base.dim),           font_style: null, font_weight: null },
        'punctuation.bracket':   { color: opaque(base.dim),           font_style: null, font_weight: null },
        'punctuation.delimiter': { color: opaque(base.dim),           font_style: null, font_weight: null },
        'punctuation.list_marker':{ color: opaque(accents.red),       font_style: null, font_weight: null },
        'punctuation.markup':    { color: opaque(accents.red),        font_style: null, font_weight: null },
        'punctuation.special':   { color: opaque(accents.red),        font_style: null, font_weight: null },
        'selector':              { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'selector.pseudo':       { color: opaque(accents.blue),       font_style: null, font_weight: null },
        'string':                { color: opaque(accents.green),      font_style: null, font_weight: null },
        'string.escape':         { color: opaque(base.foreground),    font_style: null, font_weight: null },
        'string.regex':          { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'string.special':        { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'string.special.symbol': { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'tag':                   { color: opaque(accents.red),        font_style: null, font_weight: null },
        'text.literal':          { color: opaque(accents.green),      font_style: null, font_weight: null },
        'title':                 { color: opaque(accents.red),        font_style: null, font_weight: 400  },
        'type':                  { color: opaque(accents.cyan),       font_style: null, font_weight: null },
        'variable':              { color: opaque(base.foreground),    font_style: null, font_weight: null },
        'variable.special':      { color: opaque(accents.yellow),     font_style: null, font_weight: null },
        'variant':               { color: opaque(accents.blue),       font_style: null, font_weight: null },
      },

      // --- Panel overlay (extra keys after syntax in the dark reference) ---
      'panel.overlay_background':                  opaque(ui.surface),
      'panel.overlay_hover':                       opaque(base.background),

      // --- Minimap ---
      'minimap.thumb.background':                  a(base.dim, '4c'),
      'minimap.thumb.hover_background':            a(base.dim, '2f'),
      'minimap.thumb.border':                      opaque(ui.borderVariant),

      // --- Version control extras (bottom of dark file) ---
      'version_control.renamed':                   opaque(accents.blue),
      'version_control.conflict':                  opaque(accents.yellow),
      'version_control.ignored':                   opaque(base.comment),
    },
  }

  return JSON.stringify({
    $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
    name: p.name,
    author: 'mikemcbride',
    themes: [theme],
  }, null, 2) + '\n'
}
