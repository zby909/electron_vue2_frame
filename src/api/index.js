/*
 * @Description:
 * @Author: zby
 * @Date: 2022-03-10 17:57:35
 * @FilePath: \tfl-client\src\api\index.js
 * @LastEditors: zby
 * @Reference:
 */
import packageConfig from '../../package.json';
import Vue from 'vue';
import store from '../store';
import { getParam } from '@/utils/http-tools';

const windowId = getParam('windowId'); //这里的windowId和define项目里面的uuid功能相同，都是为了区分不同的主窗口的
const thisBrowserId = getParam('thisBrowserId'); //electron当前的窗口id
const serverUrlPort = getParam('port'); //服务器端口

store.commit('app/UPDATA_WINDOWID', windowId);
store.commit('app/UPDATA_THISBROWSERWINDOWID', Number(thisBrowserId));
store.commit('app/UPDATA_SERVERURLPORT', serverUrlPort);
store.commit('app/UPDATA_APPVERSION', packageConfig.version);

Vue.prototype.$windowId = windowId;
Vue.prototype.$thisBrowserId = Number(thisBrowserId);
Vue.prototype.$appVersion = packageConfig.version;

import '@/api/request';

// 自动引入api
const modulesFiles = require.context('./modules', true, /\.api\.js/);
const apiModules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/([A-Za-z]+).*$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});
console.log(apiModules);
export default apiModules;
