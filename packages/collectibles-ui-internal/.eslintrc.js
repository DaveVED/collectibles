/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@collectibles/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};