/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:11:04
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-29 17:33:35
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
          component: './createActivity/index',
          title: '首页',
          auth: true,
        },
        {
          path: '/login',
          component: './login/index',
          title: '登录',
        },
        {
          path: '/createActivity',
          component: './createActivity/index',
          title: '首页',
          auth: true,
        },
        {
          path: '/addactivity',
          component: './Addactivity/index',
          title: '创建活动',
          auth: true,
        },
        {
          path: '/activityComment',
          component: './activityComment/index',
          title: '活动评论',
          auth: true,
        },
        {
          path: '/lotteryWhiteList',
          component: './lotteryWhiteList/index',
          title: '抽奖白名单',
          auth: true,
        },
      ],
    },
  ],
  fastRefresh: {},
});
