// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const vscode = require("vscode");
const assert = require("assert");
const config = require("../../src/config");

describe("config", function () {
  describe("getEmphasisCharacter()", function () {
    it("should get the emphasis character", () => {
      // @ts-ignore
      assert.strictEqual(config.getEmphasisCharacter(), "*");
    });
  });
  describe("getUnorderedListCharacter()", function () {
    it("should get the unoredered list character", () => {
      // @ts-ignore
      assert.strictEqual(config.getUnorderedListCharacter(), "-");
    });
  });
});
