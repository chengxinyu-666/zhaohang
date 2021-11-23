/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 16:59:54
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 18:04:54
 */
import axios from 'axios';

// import qs from 'qs'
axios.defaults.baseURL = 'http://cmb.beyondsofthz.com';
axios.interceptors.request.use((config) => {
  //如果项目中有将token绑定在请求数据的头部，服务器可以有选择的返回数据，只对有效的请求返回数据，这样写
  //这里是用户登录的时候，将token写入了sessionStorage中了，之后进行其他的接口操作时，进行身份验证。
  // config.headers.Authorization = window.sessionStorage.getItem("token");
  config.headers[config[0]] = config[1];
  console.log(config);
  return config;
});
//在response中
axios.interceptors.response.use((config) => {
  console.log(config);
  return config;
});

const http = {
  post: '',
  get: '',
  // put:'',
  // del:''
};

http.post = function (api, data, header) {
  //let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.post(api, data, header).then((response) => {
      resolve(response);
    });
  });
};

http.get = function (api, data) {
  //let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.get(api, data).then((response) => {
      resolve(response);
    });
  });
};

http.delete = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.delete(api, data).then((response) => {
      resolve(response);
    });
  });
};

http.put = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.put(api, data).then((response) => {
      resolve(response);
    });
  });
};

export default http;
