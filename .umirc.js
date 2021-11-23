/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:11:04
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 18:16:37
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  proxy: {
    //请求代理在这里配置
    '/campus': {
      target: 'http://cmb.beyondsofthz.com',
      changeOrigin: true,
      // pathRewrite: { '^/rate': '' },
    },
  },

  routes: [
    {
      path: '/',
      component: '@/pages/index',
    },

    {
      path: '/login',
      component: './login/index',
      title: '登录',
    },
  ],
  fastRefresh: {},
});
