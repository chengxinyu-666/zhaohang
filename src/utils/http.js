/*
 * @Author: chengxinyu
 * @Date: 2021-11-19 16:52:10
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 18:36:07
 */

import { extend } from 'umi-request';

const request = extend({
  prefix: '/api/v1',
  suffix: '.json',
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  params: {
    token: 'xxx', // 所有请求默认带上 token 参数
  },
  errorHandler: function (error) {
    /* 异常处理 */
  },
});
