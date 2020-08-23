const {
  commands,
  window,
  workspace,
  Position,
  Range,
  Selection,
  // eslint-disable-next-line node/no-missing-require, import/no-unresolved
} = require("vscode");
const os = require("os");
const assert = require("assert");
const path = require("path");

let defaultConfigs = {
  "markdown.extension.toc.levels": "1..6",
  "editor.insertSpaces": true,
  "editor.tabSize": 4,
};

let testFile = path.join(__dirname, "..", "..", "test", "test.md");

async function testCommand(
  command,
  lines,
  selection,
  expLines,
  expSelection,
  configs = {}
) {
  // let tempConfigs = Object.assign({}, defaultConfigs);

  // for (let key of Object.keys(configs)) {
  // 		tempConfigs[key] = configs[key];
  // }

  // for (let key of Object.keys(tempConfigs)) {
  // 		await workspace.getConfiguration().update(key, tempConfigs[key], true);
  // }

  return workspace.openTextDocument(testFile).then((doc) => {
    return window.showTextDocument(doc).then(() => {
      return updateContents(lines).then(() => {
        window.activeTextEditor.selection = selection;
        return commands.executeCommand(command).then(() => {
          return doc.save().then(() => {
            let actualText = window.activeTextEditor.document.getText();
            let actualSelection = window.activeTextEditor.selection;
            // @ts-ignore
            assert.strictEqual(actualText, join(expLines));
            // @ts-ignore
            assert.deepStrictEqual(actualSelection, expSelection);
          });
        });
      });
    });
  });
}

async function updateContents(lines) {
  const editor = window.activeTextEditor;
  await editor.edit((editBuilder) => {
    let fullRange = new Range(
      new Position(0, 0),
      editor.document.positionAt(editor.document.getText().length)
    );
    editBuilder.delete(fullRange);
    editBuilder.insert(new Position(0, 0), join(lines));
  });
}

function join(lines) {
  let eol = "\n";
  if (os.platform() === "win32") {
    eol = "\r\n";
  }
  return lines.join(eol) + eol;
}

module.exports = {
  testCommand,
};
