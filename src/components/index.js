// 自动注册common下的全局组件

import Vue from 'vue';
const modulesFiles = require.context('./common', true, /\.vue/);
const components = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath).default;
  modules.push({ name: value.name, instance: value });
  return modules;
}, []);
components.forEach(v => {
  Vue.component(v.name, v.instance);
});
