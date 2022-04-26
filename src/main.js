import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'normalize.css';
import '@/styles/index.scss';
import '@/styles/font/iconfont.css';
import '@/styles/font/iconfont.js';

import i18n from './lang'; // internationalization
import '@/plugins/element';
import '@/plugins/vxe-table';
// import echarts from '@/plugins/echarts';

import '@/directive/directives';
import '@/components/index';
import apiModules from '@/api/index';

Vue.prototype.$API = apiModules;
// Vue.prototype.$Echarts = echarts;
Vue.config.productionTip = false;

let vm = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
});
vm.$mount('#app');

export default vm;
