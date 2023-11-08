module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended", // Make sure this is the last element in the array.
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier", // Enables ESLint to show prettier errors as ESLint errors. Make sure this is last in the plugins array.
  ],
  rules: {
    // Place to specify ESLint rules - can be used to overwrite rules specified from the extended configurations
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }], // Allow jsx syntax in .tsx files
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ], // Ignore file extensions for import
    "react/react-in-jsx-scope": "off", // Not required in new JSX transform
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
  },
  settings: {
    react: {
      version: "detect", // Detect react version
    },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
};
