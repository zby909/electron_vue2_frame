import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import { constantRoutes } from '@/router/definitionRoutes';

const routes = [...constantRoutes];
const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.addRoute({ path: '*', redirect: '/401' });

export default router;
