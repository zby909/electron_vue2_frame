import { BaseService } from '@/api/request';

const api = {};

/**
 * @description: 测试get请求 获取网易云指定歌曲 如423407947
 * @param  {*id 	歌曲id}
 * @return {*data[]}
 */
api.getTest = function (params = {}) {
  return BaseService.getReq('song/url', params, { showMsg: false, insertCommonParams: false });
};

export default api;
