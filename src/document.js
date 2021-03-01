/* eslint-disable prefer-template */
/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const config = require("./config");
const markdown = require("./markdown");

function getWordRange(wordPattern) {
  const editor = vscode.window.activeTextEditor;
  const doc = editor.document;
  let { selection } = editor;
  let range;

  if (selection.isEmpty) {
    // @ts-ignore
    range = doc.getWordRangeAtPosition(selection.start, wordPattern);
  }

  if (range === undefined || range.isEmpty) {
    range = selection;
  }

  return range;
}

function getLineRange() {
  const editor = vscode.window.activeTextEditor;
  const doc = editor.document;
  let { selection } = editor;
  let range = selection;

  if (selection.isEmpty) {
    let lineNo = selection.start.line;
    // @ts-ignore
    range = doc.lineAt(lineNo).range;
  }

  return range;
}

function getEndOfLine() {
  const num = vscode.window.activeTextEditor.document.eol;
  let eol = "\n";

  if (num === 2) {
    eol = "\r\n";
  }

  return eol;
}

async function toggleEmphasis() {
  const editor = vscode.window.activeTextEditor;
  const markdownChar = config.getEmphasisCharacter();

  let wordRegex = /\**\w+\**/;
  if (markdownChar === "_") {
    wordRegex = /_*\w+_*/;
  }
  const range = getWordRange(wordRegex);

  const text = editor.document.getText(range);
  let regexString = /^\*.*\*$/;
  if (markdownChar === "_") {
    regexString = /^_.*_$/;
  }
  const markedDown = regexString.test(text);

  if (markedDown === true) {
    await removeEmphasis(range);
  } else {
    await addEmphasis(markdownChar, range);
  }
}

async function addEmphasis(markdownChar, range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    let snippet = markdownChar + "$1" + markdownChar + "$0";
    await editor.insertSnippet(new vscode.SnippetString(snippet), range);
  } else {
    let snippet = markdownChar + "${TM_SELECTED_TEXT}" + markdownChar + "$0";
    await editor.insertSnippet(new vscode.SnippetString(snippet), range);
  }
}

async function removeEmphasis(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const newText = text.substring(1, text.length - 1);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleStrongEmphasis() {
  const editor = vscode.window.activeTextEditor;
  const markdownChar = config.getEmphasisCharacter();

  let wordRegex = /\**\w+\**/;
  if (markdownChar === "_") {
    wordRegex = /_*\w+_*/;
  }
  const range = getWordRange(wordRegex);

  const text = editor.document.getText(range);
  let regexString = /^\*{2}.*\*{2}$/;
  if (markdownChar === "_") {
    regexString = /^_{2}.*_{2}$/;
  }
  const markedDown = regexString.test(text);

  if (markedDown) {
    await removeStrongEmphasis(range);
  } else {
    await addStrongEmphasis(markdownChar, range);
  }
}

async function addStrongEmphasis(markdownChar, range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    let snippet = markdownChar.repeat(2) + "$1" + markdownChar.repeat(2) + "$0";
    await editor.insertSnippet(new vscode.SnippetString(snippet), range);
  } else {
    let snippet =
      markdownChar.repeat(2) +
      "${TM_SELECTED_TEXT}" +
      markdownChar.repeat(2) +
      "$0";
    await editor.insertSnippet(new vscode.SnippetString(snippet), range);
  }
}

async function removeStrongEmphasis(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const newText = text.substring(2, text.length - 2);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleQuote() {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  const text = editor.document.getText(range);
  const markedDown = /^\s{0,3}>\s?.*/gm.test(text);

  if (markedDown) {
    await removeQuote(range);
  } else {
    await addQuote(range);
  }
}

async function addQuote(range) {
  const editor = vscode.window.activeTextEditor;
  const text = vscode.window.activeTextEditor.document.getText(range);
  const endOfLine = getEndOfLine();
  let newText = "";

  if (range.isEmpty) {
    await editor.insertSnippet(new vscode.SnippetString("> $0"), range);
  } else if (range.isSingleLine === true) {
    newText = `> ${text}`;
  } else {
    // multiline text
    let lines = text.split(endOfLine);
    let newLines = [];

    lines.forEach((line, i) => {
      newLines[i] = `> ${line}`;
    });
    newText = newLines.join(endOfLine);
  }

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function removeQuote(range) {
  const editor = vscode.window.activeTextEditor;
  const text = vscode.window.activeTextEditor.document.getText(range);
  const endOfLine = getEndOfLine();
  let newText = "";

  if (range.isSingleLine === true) {
    newText = text.replace(/^\s{0,3}>\s?/, "");
  } else {
    let lines = text.split(endOfLine);
    let newLines = [];

    lines.forEach((line, i) => {
      newLines[i] = line.replace(/^\s{0,3}>\s?/, "");
    });

    newText = newLines.join(endOfLine);
  }

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleInlineCode() {
  const editor = vscode.window.activeTextEditor;
  const wordOrCodeRegex = /`?\w+`?/;
  const range = getWordRange(wordOrCodeRegex);
  const text = editor.document.getText(range);
  const markedDown = /^`.*`$/.test(text);

  if (markedDown) {
    await removeInlineCode(range);
  } else {
    await addInlineCode(range);
  }
}

async function addInlineCode(range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    await editor.insertSnippet(new vscode.SnippetString("`$1`$0"), range);
  } else {
    await editor.insertSnippet(
      new vscode.SnippetString("`${TM_SELECTED_TEXT}`$0"),
      range
    );
  }
}

async function removeInlineCode(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const newText = text.substring(1, text.length - 1);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

function toggleCodeBlock() {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  const text = editor.document.getText(range);

  let markedDown = /^```.*```/s.test(text); // includes new lines

  if (markedDown) {
    removeCodeBlock(range);
  } else {
    addCodeBlock(range);
  }
}

async function addCodeBlock(range) {
  const editor = vscode.window.activeTextEditor;
  const endOfLine = getEndOfLine();
  const text = editor.document.getText(range);
  let snippet = new vscode.SnippetString(
    // eslint-disable-next-line prefer-template
    "```${1:language}" +
      endOfLine +
      "${2:code}" +
      endOfLine +
      "```" +
      endOfLine +
      "$0"
  );

  if (text.trim().length > 0) {
    snippet = new vscode.SnippetString(
      // eslint-disable-next-line prefer-template
      "```${1:language}" +
        endOfLine +
        "${TM_SELECTED_TEXT}$2" +
        endOfLine +
        "```" +
        endOfLine +
        "$0"
    );
  }

  await editor.insertSnippet(snippet, range);
}

async function removeCodeBlock(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const endOfLine = getEndOfLine();
  let newLines = [];

  let lines = text.split(endOfLine);
  lines.forEach((line, i) => {
    if (line.trimLeft().startsWith("```") === false) {
      newLines[i] = line;
    }
  });
  let newText = newLines.join(endOfLine);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleOrderedList() {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  const text = editor.document.getText(range);

  let markedDown = /^\d+\.\s.*/gm.test(text);

  if (markedDown) {
    await removeOrderedList(range);
  } else {
    await addOrderedList(range);
  }
}

async function addOrderedList(range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    await editor.edit((textEdit) => {
      textEdit.insert(range.start, "1. ");
    });
  } else {
    const text = editor.document.getText(range);
    const endOfLine = getEndOfLine();
    let newLines = [];

    let lines = text.split(endOfLine);

    lines.forEach((line, i) => {
      newLines[i] = `1. ${line}`;
    });
    let newText = newLines.join(endOfLine);

    await editor.edit((textEdit) => {
      textEdit.replace(range, newText);
    });
  }
}

async function removeOrderedList(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const endOfLine = getEndOfLine();
  let newLines = [];

  let lines = text.split(endOfLine);

  lines.forEach((line, i) => {
    newLines[i] = line.replace(/^\d+\.\s/, "");
  });
  let newText = newLines.join(endOfLine);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleUnorderedList() {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  const text = editor.document.getText(range);

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  let markdownChar = config.getUnorderedListCharacter();
  let regexString = `^${markdownChar}\\s.*`;
  if (markdownChar === "+" || markdownChar === "*") {
    // character must be escaped
    regexString = "^\\" + markdownChar + "\\s.*";
  }

  let regex = new RegExp(regexString, "gm");
  let markedDown = regex.test(text);

  if (markedDown) {
    if (markdown.isHorizontalRule(text) === false) {
      await removeUnorderedList(markdownChar, range);
    }
  } else {
    await addUnorderedList(markdownChar, range);
  }
}

async function addUnorderedList(markdownChar, range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    await editor.edit((textEdit) => {
      textEdit.insert(range.start, `${markdownChar} `);
    });
  } else {
    const text = editor.document.getText(range);
    const endOfLine = getEndOfLine();
    let newLines = [];

    let lines = text.split(endOfLine);
    lines.forEach((line, i) => {
      newLines[i] = `${markdownChar} ${line}`;
    });
    let newText = newLines.join(endOfLine);

    await editor.edit((textEdit) => {
      textEdit.replace(range, newText);
    });
  }
}

async function removeUnorderedList(markdownChar, range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const endOfLine = getEndOfLine();
  let newLines = [];

  let lines = text.split(endOfLine);
  let regexString = `^${markdownChar}\\s`;
  if (markdownChar === "+" || markdownChar === "*") {
    // must be escaped
    regexString = "^\\" + markdownChar + "\\s";
  }

  lines.forEach((line, i) => {
    newLines[i] = line.replace(new RegExp(regexString), "");
  });
  let newText = newLines.join(endOfLine);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleHeading(level) {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  const text = editor.document.getText(range);
  let regex = new RegExp(`^#{${level}}\\s.*`);
  const markedDown = regex.test(text);

  if (markedDown) {
    removeHeading(level, range);
  } else {
    addHeading(level, range);
  }
}

async function addHeading(level, range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);

  if (text.trim().length === 0) {
    await editor.insertSnippet(
      // eslint-disable-next-line prefer-template
      new vscode.SnippetString("#".repeat(level) + " ${1:title}"),
      range
    );
  } else {
    let newText = `${"#".repeat(level)} ${text}`;
    await editor.edit((textEdit) => {
      textEdit.replace(range, newText);
    });
  }
}

async function removeHeading(level, range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  let newText = text.replace(/^#+\s/, "");

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleLink() {
  const editor = vscode.window.activeTextEditor;
  const range = getWordRange(/\w+/);
  const text = editor.document.getText(range);

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  let markedDown = /^\[.*\]\(.*\)/.test(text);

  if (markedDown) {
    await removeLink(range);
  } else {
    await addLink(range);
  }
}

async function addLink(range) {
  const editor = vscode.window.activeTextEditor;
  await editor.insertSnippet(
    new vscode.SnippetString(
      "[${TM_SELECTED_TEXT:${1:text}}](${2:${CLIPBOARD:href}})$0"
    ),
    range
  );
}

async function removeLink(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const result = text.match(/^\[(?<linkText>.*)\]\(.*\)$/).groups;
  // @ts-ignore
  const newText = result.linkText;

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleImage() {
  const editor = vscode.window.activeTextEditor;
  const range = getWordRange(/\w+/);
  const text = editor.document.getText(range);

  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  let markedDown = /^!\[.*\]\(.*\)/.test(text);

  if (markedDown) {
    await removeImage(range);
  } else {
    await addImage(range);
  }
}

async function addImage(range) {
  const editor = vscode.window.activeTextEditor;
  await editor.insertSnippet(
    new vscode.SnippetString("![${TM_SELECTED_TEXT:${1:text}}](${2:link})$0"),
    range
  );
}

async function removeImage(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const result = text.match(/^!\[(?<altText>.*)\]\(.*\)$/).groups;
  // @ts-ignore
  const newText = result.altText;

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function toggleHorizontalRule() {
  const editor = vscode.window.activeTextEditor;
  const range = getLineRange();
  let text = editor.document.getText(range);
  // HR can be like 3 hypens with spaces, removing spaces makes it easier to identify
  text = text.replace(/\s/g, "");

  let markedDown = /(\s*-){3,}$/.test(text);

  if (markedDown) {
    await removeHorizontalRule(range);
  } else {
    await addHorizontalRule(range);
  }
}

async function addHorizontalRule(range) {
  const editor = vscode.window.activeTextEditor;
  const newText = `---`;

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

async function removeHorizontalRule(range) {
  const editor = vscode.window.activeTextEditor;

  await editor.edit((textEdit) => {
    textEdit.delete(range);
  });
}

async function toggleStrikethrough() {
  const editor = vscode.window.activeTextEditor;
  const wordRegex = /~{0,2}\w+~{0,2}/;
  const range = getWordRange(wordRegex);
  const text = editor.document.getText(range);
  const markedDown = /^~~.*~~$/.test(text);

  if (markedDown === true) {
    await removeStrikethrough(range);
  } else {
    await addStrikethrough(range);
  }
}

async function addStrikethrough(range) {
  const editor = vscode.window.activeTextEditor;

  if (range.isEmpty) {
    await editor.insertSnippet(new vscode.SnippetString("~~$1~~$0"), range);
  } else {
    await editor.insertSnippet(
      new vscode.SnippetString("~~${TM_SELECTED_TEXT}~~$0"),
      range
    );
  }
}

async function removeStrikethrough(range) {
  const editor = vscode.window.activeTextEditor;
  const text = editor.document.getText(range);
  const newText = text.substring(2, text.length - 2);

  await editor.edit((textEdit) => {
    textEdit.replace(range, newText);
  });
}

module.exports = {
  toggleStrongEmphasis,
  toggleEmphasis,
  toggleStrikethrough,
  toggleHeading,
  toggleLink,
  toggleImage,
  toggleInlineCode,
  toggleCodeBlock,
  toggleQuote,
  toggleHorizontalRule,
  toggleOrderedList,
  toggleUnorderedList,
};
