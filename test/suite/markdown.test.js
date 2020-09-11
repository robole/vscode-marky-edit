// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const assert = require("assert");
const markdown = require("../../src/markdown");

describe("markdown", function () {
  describe("isHorizontalRule()", function () {
    it("should return true if the text has a sequence of three or more matching hyphens with optional spaces in between", () => {
      let text1 = "---";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text1), true, "exact");
      let text2 = "- item";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text2), false, "list item");
      let text3 = "- - -";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text3), true, "with spaces");
    });

    it("should return true if the text has a sequence of three or more matching underscores with optional spaces in between", () => {
      let text1 = "___";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text1), true, "exact");
      let text2 = "_ text _ _";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text2), false, "text");
      let text3 = "_ _ _";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text3), true, "with spaces");
    });

    it("should return true if the text has a sequence of three or more matching asterisks with optional spaces in between", () => {
      let text1 = "***";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text1), true, "exact");
      let text2 = "* text * *";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text2), false, "text");
      let text3 = "* * *";
      // @ts-ignore
      assert.strictEqual(markdown.isHorizontalRule(text3), true, "with spaces");
    });
  });
});
