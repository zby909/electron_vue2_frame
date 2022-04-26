module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'no-console': process.env.VUE_APP_MODE === 'production' ? 1 : 0,
    'no-debugger': process.env.VUE_APP_MODE === 'production' ? 2 : 0,
    'no-control-regex': 0, //禁止在正则表达式中使用控制字符
    'no-useless-escape': 0, //禁用不必要的转义字符
  },
};
