/*
 * @Description:
 * @Author: zby
 * @Date: 2022-04-26 14:05:42
 * @FilePath: \electron_vue2\src\router\constant-routes\pages.constantRoutes.js
 * @LastEditors: zby
 * @Reference:
 */
import Home from '@/views/home/home.vue';
import Container from '@/components/Container/Container.vue';
const GlobalSetting = () => import(/* webpackChunkName: "global-setting" */ '@/views/global-setting/global-setting.vue');
const TFLList = () => import(/* webpackChunkName: "tfl-list" */ '@/views/tfl-list/tfl-list.vue');
const TestChildWin = () => import(/* webpackChunkName: "TestChildWin" */ '@/components/WinModal/TestChildWin.vue');
export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/project',
    component: Container,
    redirect: '/project/global-setting',
    children: [
      {
        path: 'global-setting',
        name: 'GlobalSetting',
        component: GlobalSetting,
      },
      {
        path: 'tfl-list',
        name: 'TflList',
        component: TFLList,
      },
    ],
  },

  {
    path: '/testChildWin',
    name: 'TestChildWin',
    component: TestChildWin,
  },
];
