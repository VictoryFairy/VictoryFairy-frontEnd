module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Prettier의 포맷팅 규칙을 ESLint 규칙으로 사용할 수 있게 해줌
    "plugin:react/jsx-runtime", // import React from 'react'를 해야 jsx를 사용할 수 있게 해주는데 이를 없애기 위해 사용
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"], // '@.'를 './src/...'로 매핑
        ],
        extensions: [".ts", ".tsx"], // 허용할 확장자
      },
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.app.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "prettier"],
  rules: {
    complexity: ["error", { max: 10 }],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-use-before-define": ["error", { variables: false }],
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-array-index-key": "off",
    "no-return-assign": "off",
    "consistent-return": "off",
    "jsx-a11y/alt-text": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "@typescript-eslint/return-await": "off",
    "no-param-reassign": ["error", { props: false }],
    "no-console": "off",
    "no-new": "off",
    "react-hooks/exhaustive-deps": "off",
    "import/no-cycle": "off",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-alert": "off",
  },
};
