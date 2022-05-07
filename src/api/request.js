/* 已与后端约定 200的result必有值*/
import axios from 'axios';
import Qs from 'qs';
import store from '../store';
import { Message, Loading } from 'element-ui';
import generateUUID from '@/utils/guid';
import '@/api/insertGlobalVal'; //必须写入 不然无法获取更改的端口号

const osUserInfo = require('os').userInfo();
const IS_PROD_OR_TEST = ['production', 'test'].includes(process.env.VUE_APP_MODE);
const IS_PROD = ['production'].includes(process.env.VUE_APP_MODE);

let g_showMsg = []; //记录需要错误提示的接口
let g_showLoadingApiNames = []; //记录需要loading提示的接口 (为了保证需要loading时间最长的那个接口完成后再close)
let g_showLoadingStatus;

function toLoading(msg = 'Loading...') {
  g_showLoadingStatus = Loading.service({ lock: true, text: msg, spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.6)' });
}

//插入后端要求的公共参数
function toInsertCommonParams(params) {
  params = { params };
  params.window_id = store.state.app.windowId;
  params.uuid = generateUUID(); //这里的uuid只为了确定是哪一个接口 方便查日志
  params.user = osUserInfo.username;
  params.project_id = store.state.app.studyDesc.project || '';
  params.fver = store.state.app.appVersion;
  return params;
}

const BaseServiceApi = IS_PROD_OR_TEST
  ? `${process.env.VUE_APP_SERVICE_BASE_URL}:${store.state.app.serverUrlPort}/api/`
  : process.env.VUE_APP_SERVICE_BASE_URL;
// 一个axios请求实例
const BaseService = axios.create({
  baseURL: BaseServiceApi, // url = base url + request url
  timeout: 600 * 60 * 1000, // request timeout
});

BaseService.getReq = async (url, params = {}, { insertCommonParams = true, showMsg = true, loading = false, loadingTxt } = {}) => {
  showMsg && !g_showMsg.includes(url) && g_showMsg.push(url);
  loading && g_showLoadingApiNames.push(url) && toLoading(loadingTxt);
  insertCommonParams && (params = toInsertCommonParams(params));
  try {
    const res = await BaseService.get(url, { params });
    return [res?.data?.result, res?.data, res];
  } catch (error) {
    return [null, error?.data, error];
  }
};

BaseService.postReq = async (url, params = {}, { insertCommonParams = true, isJson = true, showMsg = true, loading = false, loadingTxt } = {}) => {
  showMsg && !g_showMsg.includes(url) && g_showMsg.push(url);
  loading && g_showLoadingApiNames.push(url) && toLoading(loadingTxt);
  insertCommonParams && (params = toInsertCommonParams(params));
  try {
    const res = await BaseService.post(url, isJson ? params : Qs.stringify(params));
    return [res?.data?.result, res?.data, res];
  } catch (error) {
    return [null, error?.data, error];
  }
};

// 添加请求拦截器
BaseService.interceptors.request.use(
  config => {
    // console.log('请求拦截BaseService', config); // 请求发送前进行处理
    // config.headers['Authorization'] = '123';//后续可以在这进行token的传递
    return config;
  },
  error => {
    console.log(error); // 请求错误处理
    return Promise.reject(error); // return error;
  },
);

// 添加响应拦截器
BaseService.interceptors.response.use(
  response => {
    console.log('响应拦截BaseService', response);
    //需要loading的接口加载完成就从数组删掉这个记录
    const loadingApiNameIdx = g_showLoadingApiNames.findIndex(i => i === response.config.url);
    if (loadingApiNameIdx !== -1) {
      g_showLoadingApiNames.splice(loadingApiNameIdx, 1);
      !g_showLoadingApiNames.length && g_showLoadingStatus && g_showLoadingStatus.close();
    }
    //通知错误信息
    if (g_showMsg.includes(response.config.url) && response.data.status_code !== 200) {
      Message({ showClose: true, message: response?.data?.msg || 'Unknown error message', type: 'error', duration: 5 * 1000 });
      setTimeout(() => {
        !IS_PROD && response?.data?.debugInfo && Message({ showClose: true, message: response?.data?.debugInfo, type: 'error', duration: 5 * 1000 });
      }, 300);
    }
    return response;
  },
  error => {
    //需要loading的接口加载完成就从数组删掉这个记录
    const loadingApiNameIdx = g_showLoadingApiNames.findIndex(i => i === error.config.url);
    if (loadingApiNameIdx !== -1) {
      g_showLoadingApiNames.splice(loadingApiNameIdx, 1);
      !g_showLoadingApiNames.length && g_showLoadingStatus && g_showLoadingStatus.close();
    }
    //通知错误信息
    if (g_showMsg.includes(error.config.url)) {
      Message({ showClose: true, message: error.message || 'Request error', type: 'error', duration: 5 * 1000 });
    }
    //处理错误信息
    console.log(error.request);
    console.log(error.response);
    console.log(error.message);
    console.log(error.config);
    return Promise.reject(error.response); // return error;
  },
);

//----------------------------------下一个服务器请求实例----------------------------------

export { BaseService };
