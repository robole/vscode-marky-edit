// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const document = require("./document");

function activate(context) {
  context.subscriptions.push(
    // vscode.languages.setLanguageConfiguration("markdown", {
    //   wordPattern: /(-?\d*\.\d\w*)|([!@#%&-=|;:'",.<>\s，。《》？；：‘“’”、\^\(\)\（\）\+\[\]\【\】\{\}\\\?\/]+)/g,
    // }),
    vscode.commands.registerCommand("marky-edit.toggleEmphasis", () => {
      document.toggleEmphasis();
    }),
    vscode.commands.registerCommand("marky-edit.toggleStrongEmphasis", () => {
      document.toggleStrongEmphasis();
    }),
    vscode.commands.registerCommand("marky-edit.toggleQuote", () => {
      document.toggleQuote();
    }),
    vscode.commands.registerCommand("marky-edit.toggleInlineCode", () => {
      document.toggleInlineCode();
    }),
    vscode.commands.registerCommand("marky-edit.toggleCodeBlock", () => {
      document.toggleCodeBlock();
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading1", () => {
      document.toggleHeading(1);
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading2", () => {
      document.toggleHeading(2);
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading3", () => {
      document.toggleHeading(3);
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading4", () => {
      document.toggleHeading(4);
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading5", () => {
      document.toggleHeading(5);
    }),
    vscode.commands.registerCommand("marky-edit.toggleHeading6", () => {
      document.toggleHeading(6);
    }),
    vscode.commands.registerCommand("marky-edit.toggleOrderedList", () => {
      document.toggleOrderedList();
    }),
    vscode.commands.registerCommand("marky-edit.toggleUnorderedList", () => {
      document.toggleUnorderedList();
    }),
    vscode.commands.registerCommand("marky-edit.toggleLink", () => {
      document.toggleLink();
    }),
    vscode.commands.registerCommand("marky-edit.toggleImage", () => {
      document.toggleImage();
    }),
    vscode.commands.registerCommand("marky-edit.toggleHorizontalRule", () => {
      document.toggleHorizontalRule();
    }),
    vscode.commands.registerCommand("marky-edit.toggleDelete", () => {
      document.toggleStrikethrough();
    })
  );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
