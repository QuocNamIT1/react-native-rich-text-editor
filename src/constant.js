export const actions = {
  content: 'content',

  updateHeight: 'UPDATE_HEIGHT',

  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  heading1: 'heading1',
  heading2: 'heading2',
  heading3: 'heading3',
  heading4: 'heading4',
  heading5: 'heading5',
  heading6: 'heading6',
  insertLine: 'line',
  setParagraph: 'paragraph',
  removeFormat: 'removeFormat',
  alignLeft: 'justifyLeft',
  alignCenter: 'justifyCenter',
  alignRight: 'justifyRight',
  alignFull: 'justifyFull',
  insertBulletsList: 'bullet',
  insertOrderedList: 'ordered',
  checkboxList: 'checkboxList',
  insertLink: 'link',
  insertText: 'text',
  insertHTML: 'html',
  insertImage: 'image',
  insertVideo: 'video',
  fontSize: 'fontSize',
  fontName: 'fontName',
  setSubscript: 'subscript',
  setSuperscript: 'superscript',
  setStrikethrough: 'strikeThrough',
  indent: 'indent',
  outdent: 'outdent',
  undo: 'undo',
  redo: 'redo',
  code: 'code',
  table: 'table',
  line: 'line',
  blockquote: 'quote',
};

export const defaultActions = [
  actions.bold,
  actions.italic,
  actions.underline,
  actions.removeFormat,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.indent,
  actions.outdent,
  actions.insertLink,
  actions.undo,
  actions.redo,
];

export const messages = {
  CONTENT_HTML_RESPONSE: 'CONTENT_HTML_RESPONSE',
  LOG: 'LOG',
  CONTENT_FOCUSED: 'CONTENT_FOCUSED',
  CONTENT_BLUR: 'CONTENT_BLUR',
  SELECTION_CHANGE: 'SELECTION_CHANGE',
  CONTENT_CHANGE: 'CONTENT_CHANGE',
  CONTENT_PASTED: 'CONTENT_PASTED',
  CONTENT_KEYUP: 'CONTENT_KEYUP',
  CONTENT_KEYDOWN: 'CONTENT_KEYDOWN',
  SELECTED_TEXT_RESPONSE: 'SELECTED_TEXT_RESPONSE',
  LINK_TOUCHED: 'LINK_TOUCHED',
  SELECTED_TEXT_CHANGED: 'SELECTED_TEXT_CHANGED',
  OFFSET_HEIGHT: 'OFFSET_HEIGHT',
  OFFSET_Y: 'OFFSET_Y',
  ON_INPUT: 'ON_INPUT',
};
