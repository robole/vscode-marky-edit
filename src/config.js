const vscode = require("vscode");
const configName = "markyMarkdown.edit";

function getEmphasisCharacter() {
  let config = vscode.workspace.getConfiguration(configName);
  return config.get("emphasisCharacter");
}

function getUnorderedListCharacter() {
  let config = vscode.workspace.getConfiguration(configName);
  return config.get("unorderedListCharacter");
}

module.exports = {
  getEmphasisCharacter,
  getUnorderedListCharacter,
};
