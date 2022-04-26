export default [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '路径错误',
    },
  },

  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    meta: {
      title: '没有权限',
    },
  },
];
