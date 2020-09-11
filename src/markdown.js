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
