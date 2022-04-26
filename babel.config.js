const IS_PROD = ['production'].includes(process.env.VUE_APP_MODE);
const prodPlugins = [];

//remove console.log
if (IS_PROD) {
  prodPlugins.push('transform-remove-console');
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
    [
      'import',
      {
        libraryName: 'vxe-table',
        style: true, // 样式是否也按需加载
      },
    ],
    // 发布产品时候的插件数组
    ...prodPlugins,
  ],
};
