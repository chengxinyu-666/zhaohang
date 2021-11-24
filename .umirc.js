/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:11:04
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 12:31:00
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
    },
  },

  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页',
          auth: true,
        },
        {
          path: '/login',
          component: './login/index',
          title: '登录',
        },
        {
          path: '/home',
          component: './home/index',
          title: '首页',
          auth: true,
        },
      ],
    },
  ],
  fastRefresh: {},
});
