import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import getters from './getters';

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  //据这个路径获取该文件
  const value = modulesFiles(modulePath);
  //取出这个文件的名字
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  //以文件名命名model对象的其中一个参数内含导出的vuex项
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters,
  modules,
});
