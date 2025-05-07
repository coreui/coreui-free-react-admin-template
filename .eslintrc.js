module.exports = {
  env: {
    browser: true, // Enables browser global variables
    es2021: true, // Enables ES2021 global variables
    node: true, // Enables Node.js global variables
    jest: true, // Enables Jest global variables
  },
  extends: [
    'eslint:recommended', // Uses the recommended rules from ESLint
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react-hooks/recommended', // Enforces the Rules of Hooks
  ],
  // parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    console: 'off', // Disables the no-console rule
    'no-unused-vars': 'warn', // Warns about unused variables
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  },
}
