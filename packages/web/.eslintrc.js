/** @type {import("eslint").Linter.Config} */
const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

  module.exports = {
    extends: [
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/react",
    ].map(require.resolve),
    parserOptions: {
      project,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
    globals: {
      JSX: true,
    },
    plugins: ["only-warn"],
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
    ignorePatterns: ["node_modules/", "dist/", ".eslintrc.js", "**/*.css"],
    // add rules configurations here
    rules: {
      "import/no-default-export": "off",
    },
  };