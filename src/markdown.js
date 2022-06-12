/**
 * Check if a block of text contains a markdown horiztonal rule.
 *
 * @param {string} text A block of text
 * @returns {boolean}
 */
function isHorizontalRule(text) {
  let str = text.replace(/\s/g, "");

  if (str.startsWith("---") || str.startsWith("___") || str.startsWith("***")) {
    return true;
  }
  return false;
}

module.exports = {
  isHorizontalRule,
};
