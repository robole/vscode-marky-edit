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

let defaultConfig = {
  "markyMarkdown.edit.emphasisCharacter": "*",
  "markyMarkdown.edit.unorderedListCharacter": "-",
};

let testFile = path.join(__dirname, "..", "..", "test", "test.md");

/**
 *
 * @param {string} command The name of the command to be tested.
 * @param {Array} lines The lines to add to the active document.
 * @param {vscode.Selection} selection The selection of the active document.
 * @param {Array} expLines The expected lines after the command has been run.
 * @param {vscode.Selection} expSelection The expected selection in the active document after the command has been run.
 * @param {vscode.WorkspaceConfiguration} config The temporary configuration settings for this test.
 */
async function testCommand(
  command,
  lines,
  selection,
  expLines,
  expSelection,
  config = {}
) {
  await updateConfig(config);

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

/**
 * Update the configuration for the extension. If a configuration is not provided, it will return the configuration to the default state.
 * @param {object} config Temp configuration settings for this extension
 */
async function updateConfig(config) {
  let tempConfig = { ...defaultConfig };

  // eslint-disable-next-line no-restricted-syntax
  for (let key of Object.keys(config)) {
    tempConfig[key] = config[key];
  }

  let updates = [];
  // eslint-disable-next-line no-restricted-syntax
  for (let key of Object.keys(tempConfig)) {
    updates.push(
      workspace.getConfiguration().update(key, tempConfig[key], true)
    );
  }
  await Promise.all(updates);
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
/**
 * It will concatenate the elements of the array provided into a single string. The elements are joined with a platform-specific line break.
 * @param {array} lines The lines of document.
 */
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
