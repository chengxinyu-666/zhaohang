/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 17:08:16
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 18:03:33
 */
// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // /api 表示代理路径
  // target 表示目标服务器的地址
  app.use(
    createProxyMiddleware('/api', {
      // 地址只是示例，实际地址以项目为准
      target: 'http://cmb.beyondsofthz.com',
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      //   pathRewrite: {
      //      '^/api': '' // 这样处理后，最终得到的接口路径为： http://localhost:8080/xxx
      //   }
    }),
  );
};
