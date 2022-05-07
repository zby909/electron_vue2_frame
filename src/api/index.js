// 自动引入api (弃用 因为这种写入原型链的使用方式会造成 无法方便的跳转到相关的接口文件、无法悬浮查看所需的参数的问题)
// const modulesFiles = require.context('./modules', true, /\.api\.js/);
// const apiModules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/([A-Za-z]+).*$/, '$1');
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});
// console.log(apiModules);
// export default apiModules;
