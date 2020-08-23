// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const assert = require("assert");
const doc = require("../../src/document");
const util = require("./util");

describe("document", function () {
  describe("toggleQuote()", function () {
    it("should make the selected text a quote", (done) => {
      let lines = ["oft the remedy lies within", "william shakespeare"];
      let expectedLines = [
        "> oft the remedy lies within",
        "william shakespeare",
      ];
      let selection = new vscode.Selection(0, 0, 0, 26);
      let expectedSelection = new vscode.Selection(0, 0, 0, 28);

      util
        .testCommand(
          "marky-shortcuts.toggleQuote",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a quote block for a selection with multiple lines", (done) => {
      let lines = [
        "oft the remedy lies within",
        "william shakespeare",
        "",
        "Text after",
      ];
      let expectedLines = [
        "> oft the remedy lies within",
        "> william shakespeare",
        "",
        "Text after",
      ];
      let selection = new vscode.Selection(0, 0, 1, 19);
      let expectedSelection = new vscode.Selection(0, 0, 1, 21);

      util
        .testCommand(
          "marky-shortcuts.toggleQuote",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a quote block that includes the text on the current line when there is no selection", (done) => {
      let lines = ["mwah mwah"];
      let expectedLines = ["> mwah mwah"];
      let selection = new vscode.Selection(0, 5, 0, 5);
      let expectedSelection = new vscode.Selection(0, 5, 0, 5);

      util
        .testCommand(
          "marky-shortcuts.toggleQuote",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove a quote for a selection", (done) => {
      let lines = ["> mwah mwah"];
      let expectedLines = ["mwah mwah"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 7);

      util
        .testCommand(
          "marky-shortcuts.toggleQuote",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove a quote for a multi-line selection", (done) => {
      let lines = ["> mwah mwah", "> ah ah", "finito"];
      let expectedLines = ["mwah mwah", "ah ah", "finito"];
      let selection = new vscode.Selection(0, 0, 1, 6);
      let expectedSelection = new vscode.Selection(0, 0, 1, 4);

      util
        .testCommand(
          "marky-shortcuts.toggleQuote",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleStrongEmphasis()", function () {
    it("should make the selected text bold", (done) => {
      let lines = ["blah blah"];
      let expectedLines = ["**blah** blah"];
      let selection = new vscode.Selection(0, 0, 0, 4);
      let expectedSelection = new vscode.Selection(0, 8, 0, 8);
      util
        .testCommand(
          "marky-shortcuts.toggleStrongEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a bold snippet when the cursor is positioned over a blank and there is no selection", (done) => {
      let lines = [" blah"];
      let expectedLines = ["**** blah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 2, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleStrongEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a word bold when no selection is made but the cursor is positioned in a word", (done) => {
      let lines = ["blah blah"];
      let expectedLines = ["**blah** blah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 8, 0, 8);
      util
        .testCommand(
          "marky-shortcuts.toggleStrongEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove bold from selected text", (done) => {
      let lines = ["**ab** blah"];
      let expectedLines = ["ab blah"];
      let selection = new vscode.Selection(0, 0, 0, 6);
      let expectedSelection = new vscode.Selection(0, 0, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleStrongEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove bold for a word when no selection is made but the cursor is positioned in a emboldened word", (done) => {
      let lines = ["**blah** blah"];
      let expectedLines = ["blah blah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleStrongEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleEmphasis()", function () {
    it("should make the selected text italic", (done) => {
      let lines = ["dyah dyah"];
      let expectedLines = ["*dy*ah dyah"];
      let selection = new vscode.Selection(0, 0, 0, 2);
      let expectedSelection = new vscode.Selection(0, 4, 0, 4);

      util
        .testCommand(
          "marky-shortcuts.toggleEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create an italic snippet when the cursor is positioned over a blank and there is no selection", (done) => {
      let lines = [" dyah"];
      let expectedLines = ["** dyah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 1, 0, 1);

      util
        .testCommand(
          "marky-shortcuts.toggleEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a word italic when no selection is made but the cursor is positioned in a word", (done) => {
      let lines = ["dyah dyah"];
      let expectedLines = ["*dyah* dyah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 6, 0, 6);

      util
        .testCommand(
          "marky-shortcuts.toggleEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
    it("should remove italic from selected text", (done) => {
      let lines = ["*dy*ah dyah"];
      let expectedLines = ["dyah dyah"];
      let selection = new vscode.Selection(0, 0, 0, 4);
      let expectedSelection = new vscode.Selection(0, 0, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove italic for a word when no selection is made but the cursor is positioned in a italicised word", (done) => {
      let lines = ["*dyah* dyah"];
      let expectedLines = ["dyah dyah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleEmphasis",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleStrikethrough()", function () {
    it("should strikethrough the selected text", (done) => {
      let lines = ["abcd efgh"];
      let expectedLines = ["~~ab~~cd efgh"];
      let selection = new vscode.Selection(0, 0, 0, 2);
      let expectedSelection = new vscode.Selection(0, 6, 0, 6);

      util
        .testCommand(
          "marky-shortcuts.toggleStrikethrough",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a default strikethrough snippet when the cursor is positioned over a blank and there is no selection", (done) => {
      let lines = [" abcd"];
      let expectedLines = ["~~~~ abcd"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 2, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleStrikethrough",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should strikethrough the current word when there is no selection", (done) => {
      let lines = ["abcd e"];
      let expectedLines = ["~~abcd~~ e"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 8, 0, 8);

      util
        .testCommand(
          "marky-shortcuts.toggleStrikethrough",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
    it("should remove strikethrough from the selected text", (done) => {
      let lines = ["~~abc~~ d"];
      let expectedLines = ["abc d"];
      let selection = new vscode.Selection(0, 0, 0, 7);
      let expectedSelection = new vscode.Selection(0, 0, 0, 3);

      util
        .testCommand(
          "marky-shortcuts.toggleStrikethrough",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove strikethrough for the current word when no selection is made", (done) => {
      let lines = ["~~abcd~~ ef"];
      let expectedLines = ["abcd ef"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleStrikethrough",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleHeading()", function () {
    it("should make the selected text a heading level 1", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["# blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 11);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading1",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the current line without a selection a heading level 1", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["# blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading1",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the selected text a heading level 2", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["## blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 12);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading2",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the selected text a heading level 3", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["### blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 13);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading3",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the selected text a heading level 4", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["#### blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 14);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading4",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the selected text a heading level 5", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["##### blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 15);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading5",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make the selected text a heading level 6", (done) => {
      let lines = ["blah blah", "some text"];
      let expectedLines = ["###### blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 9);
      let expectedSelection = new vscode.Selection(0, 0, 0, 16);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading6",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove the heading markdown from selected text", (done) => {
      let lines = ["###### blah blah", "some text"];
      let expectedLines = ["blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 16);
      let expectedSelection = new vscode.Selection(0, 0, 0, 9);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading6",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove the heading markdown from the current line without a selection", (done) => {
      let lines = ["###### blah blah", "some text"];
      let expectedLines = ["blah blah", "some text"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);
      util
        .testCommand(
          "marky-shortcuts.toggleHeading6",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleLink()", function () {
    it("should create a link snippet for the selected text", (done) => {
      let lines = ["rah"];
      let expectedLines = ["[rah](link)"];
      let selection = new vscode.Selection(0, 0, 0, 3);
      let expectedSelection = new vscode.Selection(0, 6, 0, 10);
      util
        .testCommand(
          "marky-shortcuts.toggleLink",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a link snippet that includes the current word (when cursor is inside a word) when there is no selection", (done) => {
      let lines = ["rah"];
      let expectedLines = ["[rah](link)"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 6, 0, 10);
      util
        .testCommand(
          "marky-shortcuts.toggleLink",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a default link snippet when there is no selection or current word", (done) => {
      let lines = [""];
      let expectedLines = ["[text](link)"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 1, 0, 5);
      util
        .testCommand(
          "marky-shortcuts.toggleLink",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove a link for selected text", (done) => {
      let lines = ["[text](/img/logo.svg)"];
      let expectedLines = ["text"];
      let selection = new vscode.Selection(0, 0, 0, 21);
      let expectedSelection = new vscode.Selection(0, 0, 0, 4);
      util
        .testCommand(
          "marky-shortcuts.toggleLink",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleImage()", function () {
    it("should create an image snippet and use the selected text as the alt text", (done) => {
      let lines = ["rah"];
      let expectedLines = ["![rah](link)"];
      let selection = new vscode.Selection(0, 0, 0, 3);
      let expectedSelection = new vscode.Selection(0, 7, 0, 11);
      util
        .testCommand(
          "marky-shortcuts.toggleImage",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create an image snippet using the current word (cursor inside a word) as alt text when there is no selection", (done) => {
      let lines = ["rah"];
      let expectedLines = ["![rah](link)"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 7, 0, 11);
      util
        .testCommand(
          "marky-shortcuts.toggleImage",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a default image snippet when there is no selection or current word", (done) => {
      let lines = [""];
      let expectedLines = ["![text](link)"];
      let selection = new vscode.Selection(0, 0, 0, 3);
      let expectedSelection = new vscode.Selection(0, 2, 0, 6);
      util
        .testCommand(
          "marky-shortcuts.toggleImage",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove image markdown for the selected text", (done) => {
      let lines = ["![text](/img/logo.svg)"];
      let expectedLines = ["text"];
      let selection = new vscode.Selection(0, 0, 0, 22);
      let expectedSelection = new vscode.Selection(0, 0, 0, 4);
      util
        .testCommand(
          "marky-shortcuts.toggleImage",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleInlineCode()", function () {
    it("should make the selected text inline code", (done) => {
      let lines = ["mwah mwah"];
      let expectedLines = ["`mw`ah mwah"];
      let selection = new vscode.Selection(0, 0, 0, 2);
      let expectedSelection = new vscode.Selection(0, 4, 0, 4);

      util
        .testCommand(
          "marky-shortcuts.toggleInlineCode",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create an inline code snippet when the cursor is positioned over a blank and there is no selection", (done) => {
      let lines = [" mwah"];
      let expectedLines = ["`` mwah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 1, 0, 1);

      util
        .testCommand(
          "marky-shortcuts.toggleInlineCode",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a word inline code when no selection is made but the cursor is positioned in a word", (done) => {
      let lines = ["mwah mwah"];
      let expectedLines = ["`mwah` mwah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 6, 0, 6);

      util
        .testCommand(
          "marky-shortcuts.toggleInlineCode",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove inline code from selected text", (done) => {
      let lines = ["`mw`ah mwah"];
      let expectedLines = ["mwah mwah"];
      let selection = new vscode.Selection(0, 0, 0, 4);
      let expectedSelection = new vscode.Selection(0, 0, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleInlineCode",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove inline code for a word when no selection is made but the cursor is positioned in a inline code fragment", (done) => {
      let lines = ["`mwah` mwah"];
      let expectedLines = ["mwah mwah"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleInlineCode",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleCodeBlock()", function () {
    it("should make the selected text a code block", (done) => {
      let lines = ["console.log('hack the planet!')"];
      let expectedLines = [
        "```language",
        "console.log('hack the planet!')",
        "```",
        "",
      ];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 3, 0, 11);

      util
        .testCommand(
          "marky-shortcuts.toggleCodeBlock",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create a code block snippet including text on the current line when there is no selection", (done) => {
      let lines = ["mwah"];
      let expectedLines = ["```language", "mwah", "```", ""];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 3, 0, 11);

      util
        .testCommand(
          "marky-shortcuts.toggleCodeBlock",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a default code block when no selection and the current line is empty", (done) => {
      let lines = [""];
      let expectedLines = ["```language", "code", "```", ""];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 3, 0, 11);

      util
        .testCommand(
          "marky-shortcuts.toggleCodeBlock",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove a selected code block leaving text", (done) => {
      let lines = [
        "```javascript",
        "console.log('hack the planet!')",
        "```",
        "",
        "word",
      ];
      let expectedLines = ["", "console.log('hack the planet!')", "", "word"];
      let selection = new vscode.Selection(0, 0, 2, 3);
      let expectedSelection = new vscode.Selection(0, 0, 1, 31);

      util
        .testCommand(
          "marky-shortcuts.toggleCodeBlock",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleHorizontalRule()", function () {
    it("should make the current line a horizontal rule and overwrite any text", (done) => {
      let lines = ["console.log('hack the planet!')", "line 2"];
      let expectedLines = ["---", "line 2"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleHorizontalRule",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should make a multi-line selection into a single horizontal rule", (done) => {
      let lines = [
        "console.log('hack the planet!')",
        "line 2",
        "line 3",
        "line 4",
      ];
      let expectedLines = ["---", "line 4"];
      let selection = new vscode.Selection(0, 0, 2, 6);
      let expectedSelection = new vscode.Selection(0, 0, 0, 3);

      util
        .testCommand(
          "marky-shortcuts.toggleHorizontalRule",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove a horizontal rule from the current line", (done) => {
      let lines = ["---", "line 2"];
      let expectedLines = ["", "line 2"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleHorizontalRule",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should detect and remove a horizontal rule with spaces from the current line", (done) => {
      let lines = [" - - -", "line 2"];
      let expectedLines = ["", "line 2"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleHorizontalRule",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleUnorderedList()", function () {
    it("should make the selected text an unordered list", (done) => {
      let lines = ["console.log('hack the planet!')"];
      let expectedLines = ["- console.log('hack the planet!')"];
      let selection = new vscode.Selection(0, 0, 0, 30);
      let expectedSelection = new vscode.Selection(0, 0, 0, 32);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create an unordered list snippet including the text on the current line when there is no selection", (done) => {
      let lines = ["hip hop"];
      let expectedLines = ["- hip hop"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should insert an unordered list snippet when no selection and the current line is empty", (done) => {
      let lines = [""];
      let expectedLines = ["- "];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 2);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove an unordered list leaving text", (done) => {
      let lines = ["- first item"];
      let expectedLines = ["first item"];
      let selection = new vscode.Selection(0, 0, 0, 11);
      let expectedSelection = new vscode.Selection(0, 0, 0, 9);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should add an unordered list for a multi-line selection", (done) => {
      let lines = ["item 1", "item 2", "text after"];
      let expectedLines = ["- item 1", "- item 2", "text after"];
      let selection = new vscode.Selection(0, 0, 1, 5);
      let expectedSelection = new vscode.Selection(0, 0, 1, 7);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove an unordered list from a multi-line selection leaving the text", (done) => {
      let lines = ["- item 1", "- item 2", "text after"];
      let expectedLines = ["item 1", "item 2", "text after"];
      let selection = new vscode.Selection(0, 0, 1, 7);
      let expectedSelection = new vscode.Selection(0, 0, 1, 5);

      util
        .testCommand(
          "marky-shortcuts.toggleUnorderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  describe("toggleOrderedList()", function () {
    it("should make the selected text an ordered list", (done) => {
      let lines = ["text"];
      let expectedLines = ["1. text"];
      let selection = new vscode.Selection(0, 0, 0, 4);
      let expectedSelection = new vscode.Selection(0, 0, 0, 7);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should create an ordered list snippet including the text on the current line when there is no selection", (done) => {
      let lines = ["hip hop"];
      let expectedLines = ["1. hip hop"];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 0);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should insert an ordered list snippet when no selection and the current line is empty", (done) => {
      let lines = [""];
      let expectedLines = ["1. "];
      let selection = new vscode.Selection(0, 0, 0, 0);
      let expectedSelection = new vscode.Selection(0, 0, 0, 3);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove an ordered list for a selection", (done) => {
      let lines = ["1. first item"];
      let expectedLines = ["first item"];
      let selection = new vscode.Selection(0, 0, 0, 11);
      let expectedSelection = new vscode.Selection(0, 0, 0, 8);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should add an ordered list for a multi-line selection", (done) => {
      let lines = ["item 1", "item 2", "text after"];
      let expectedLines = ["1. item 1", "1. item 2", "text after"];
      let selection = new vscode.Selection(0, 0, 1, 5);
      let expectedSelection = new vscode.Selection(0, 0, 1, 8);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });

    it("should remove an ordered list from a multi-line selection", (done) => {
      let lines = ["1. item 1", "1. item 2", "text after"];
      let expectedLines = ["item 1", "item 2", "text after"];
      let selection = new vscode.Selection(0, 0, 1, 9);
      let expectedSelection = new vscode.Selection(0, 0, 1, 6);

      util
        .testCommand(
          "marky-shortcuts.toggleOrderedList",
          lines,
          selection,
          expectedLines,
          expectedSelection
        )
        .then(done, done);
    });
  });

  after(async () => {
    await vscode.commands.executeCommand("workbench.action.closeAllEditors");
  });
});
