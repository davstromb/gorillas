require([
  "../node_modules/codemirror/lib/codemirror",
  "../node_modules/codemirror/mode/javascript/javascript", "../node_modules/codemirror/addon/hint/show-hint",
  "../node_modules/codemirror/addon/hint/javascript-hint", "../node_modules/codemirror/addon/edit/closebrackets",
  "../node_modules/codemirror/addon/edit/matchbrackets", "../node_modules/codemirror/addon/lint/lint.js",
  "../node_modules/codemirror/addon/lint/javascript-lint.js"], function (CodeMirror) {
  textareaPlayerCode = CodeMirror.fromTextArea(document.getElementById("textarea_player_code"), {
    mode : 'javascript',
    theme: '3024-night',
    tabSize : 2,
    lint : true,
    autofocus : true,
    lineNumbers : true,
    matchBrackets : true,
    autoCloseBrackets : true,
    gutters: ['CodeMirror-lint-markers'],
    extraKeys: {
      'Ctrl-Space': 'autocomplete'
    }
  });
  textareaPlayerCode.setValue(templateStartCode);
});
