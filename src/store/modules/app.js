import { getLanguage } from '@/lang/index';

const state = () => {
  return {
    language: getLanguage(),
    isMainWin: true, //是否是主窗口
    parentWinId: null, //electron当前窗口的父窗口id
    thisBrowserId: null, //electron当前的窗口id
    windowId: '', //这里的window_id和define项目里面的uuid功能相同，都是为了区分不同的主窗口的
    serverUrlPort: '', //服务器的端口号
    appVersion: '', //当前前端程序的版本号
  };
};

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language;
    localStorage.setItem('language', language);
  },
  UPDATA_ISMAINWIN: (state, val) => {
    state.isMainWin = val;
  },
  UPDATA_PARENTWINID: (state, val) => {
    state.parentWinId = val;
  },
  UPDATA_THISBROWSERWINDOWID: (state, val) => {
    state.thisBrowserId = val;
  },
  UPDATA_WINDOWID: (state, val) => {
    state.windowId = val;
  },
  UPDATA_SERVERURLPORT: (state, val) => {
    state.serverUrlPort = val;
  },
  UPDATA_APPVERSION: (state, val) => {
    state.appVersion = val;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
