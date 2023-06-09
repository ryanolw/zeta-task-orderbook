module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'standard-with-typescript',
    'plugin:react/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
