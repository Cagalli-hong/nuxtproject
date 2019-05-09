module.exports = {
  root: true,
  env: {
    browser: false,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    // parser: 'babel-eslint'
    sourceType: 'module'
  },
  // extends: 'standard',
  extends: [
    'eslint:recommended',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    // 'plugin:prettier/recommended', // 代码格式化
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 关闭语句强制分号结尾
    // 'semi': [0]
    // new - > semi
    // 'semi': [2, 'never'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    // 'prettier/prettier': ['error', { 'semi': false }]
  },
  globals: {
    App: true,
    Page: true,
    wx: true,
    getApp: true,
    getPage: true,
    requirePlugin: true
  }
}
