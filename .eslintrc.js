module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended','plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/typescript/recommended',
  '@vue/prettier',
  '@vue/prettier/@typescript-eslint',
  // 后面的配置会覆盖前面的配置 prettier覆盖eslint
  'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    // parser: 'babel-eslint',
    // sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'space-before-function-paren': [0, 'always'], // 函数定义时括号前面要不要有空格
    'prefer-const': 'off', // 建议使用const
    'brace-style': ['error', '1tbs'], // 大括号风格要求
    '@typescript-eslint/no-explicit-any': 'off',
    'no-useless-constructor': 'off', // 无用的构造函数
    'no-useless-return': 'off',
    'no-unreachable': 'off', // 禁止在 return、throw、continue 和 break 语句后出现不可达代码
    'no-new-object': 'off', // 禁止使用 Object 构造函数
    "vue/no-v-model-argument": "off",
    'no-prototype-builtins': 'off',
    'vue/no-mutating-props': 'off'
  },
  parser: 'vue-eslint-parser',
}
