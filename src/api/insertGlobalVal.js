/*
 * @Description:
 * @Author: zby
 * @Date: 2022-04-27 16:29:04
 * @FilePath: \tfl-client\src\api\insertGlobalVal.js
 * @LastEditors: zby
 * @Reference:
 */
import Vue from 'vue';
import store from '../store';
import packageConfig from '../../package.json';
import { getParam } from '@/utils/http-tools';

// 引入全局参数
console.log('引入全局参数');
const window_id = getParam('windowId'); //这里的window_id和define项目里面的uuid功能相同，都是为了区分不同的主窗口的
const serverUrlPort = getParam('port'); //服务器端口
const thisBrowserId = Number(getParam('thisBrowserId')); //electron当前的窗口id
let parentWinId = getParam('parentWinId'); //electron当前的窗口id
parentWinId = parentWinId !== 'null' ? Number(parentWinId) : null;

// 写入vuex
if (parentWinId === null) {
  store.commit('app/UPDATA_ISMAINWIN', true);
} else {
  store.commit('app/UPDATA_ISMAINWIN', false);
  store.commit('app/UPDATA_PARENTWINID', parentWinId);
}
store.commit('app/UPDATA_WINDOWID', window_id);
store.commit('app/UPDATA_THISBROWSERWINDOWID', thisBrowserId);
store.commit('app/UPDATA_SERVERURLPORT', serverUrlPort);
store.commit('app/UPDATA_APPVERSION', packageConfig.version);

// 写入原型
Vue.prototype.$windowId = window_id;
Vue.prototype.$thisBrowserId = thisBrowserId;
Vue.prototype.$parentWinId = parentWinId;
Vue.prototype.$appVersion = packageConfig.version;
