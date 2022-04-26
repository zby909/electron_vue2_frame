/*
 * @Description:
 * @Author: zby
 * @Date: 2022-03-10 17:57:35
 * @FilePath: \tfl-client\src\router\definitionRoutes.js
 * @LastEditors: zby
 * @Reference:
 */
//默认始终添加的路由 constant-routes目录
const constantModulesFiles = require.context('./constant-routes', true, /\.constantRoutes\.js/);
const constantRoutes = constantModulesFiles.keys().reduce((modules, modulePath) => {
  const value = constantModulesFiles(modulePath).default;
  Array.isArray(value) ? modules.push(...value) : modules.push(value);
  return modules;
}, []);
// console.log('默认始终添加的路由', constantRoutes);

//未鉴权的路由 async-routers目录
// const asyncModulesFiles = require.context('./async-routers', true, /\.asyncRoutes\.js/);
// const asyncRoutes = asyncModulesFiles.keys().reduce((modules, modulePath) => {
//   const value = asyncModulesFiles(modulePath).default;
//   Array.isArray(value) ? modules.push(...value) : modules.push(value);
//   return modules;
// }, []);
// console.log('未鉴权的路由', asyncRoutes);

export { constantRoutes };
