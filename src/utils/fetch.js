import axios from 'axios';
import { message } from 'antd';
// import history from './history';
import { localDb } from '@/utils/localDb';
import { removeAllCookie } from '@/utils/index';
import { history } from 'umi';

const baseUrl = process.env.NODE_ENV === 'development' ? '/campus' : '/campus';
const service = axios.create({ baseURL: baseUrl, timeout: 10000 });
const publicUrl = process.env.PUBLIC_URL || '';

class Http {
  /* eslint-disable */
  get(url, params) {
    // GET请求
    const newUrl = params ? this.build(url, params) : url;
    return this.request(newUrl, {
      method: 'GET',
    });
  }

  post(url, body, hasMessage, responseType, fileBol) {
    // POST请求
    let options = {
      method: 'POST',
    };
    if (body) {
      if (fileBol) {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }
    }
    return this.request(url, options, hasMessage, responseType);
  }

  postFormData(url, body, hasMessage, responseType) {
    // POST请求
    let options = {
      method: 'POST',
    };
    if (body) {
      options.body = this.buildFormData(body);
    }
    return this.request(url, options, hasMessage, responseType, 'form-data');
  }

  put(url, body) {
    // PUT请求
    let options = {
      method: 'PUT',
    };
    if (body) options.body = JSON.stringify(body);
    return this.request(url, options);
  }
  delete(url, body) {
    // DELETE请求
    let options = {
      method: 'DELETE',
    };
    if (body) options.body = JSON.stringify(body);
    return this.request(url, options);
  }
  patch(url, body) {
    // PATCH请求
    let options = {
      method: 'patch',
    };
    if (body) options.body = JSON.stringify(body);
    return this.request(url, options);
  }

  downloadFile(resp, fileName) {
    // 下载文件
    console.log(resp);
    if (!resp) {
      return false;
    } else {
      const blob = new Blob([resp], { type: resp.type });
      this.downFile(blob, fileName);
    }
  }
  downFile(blob, fileName) {
    // 非IE下载
    if ('download' in document.createElement('a')) {
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob); // 创建下载的链接
      link.download = fileName; // 下载后文件名
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click(); // 点击下载
      window.URL.revokeObjectURL(link.href); // 释放掉blob对象
      document.body.removeChild(link); // 下载完成移除元素
    } else {
      // IE10+下载
      window.navigator.msSaveBlob(blob, fileName);
    }
  }
  uploadFile(file, val, callback) {
    let suffix = val.substr(val.indexOf('.'));
    // let storeAs = "file/" + new Date() * 1 + suffix + Math.random().toString(36).substr(2);
    let storeAs = 'file/' + new Date() * 1 + '/' + val;
    return client.multipartUpload(storeAs, file, callback).then((result) => {
      // console.log(result)
      let obj = {};
      obj.key = result.name;
      obj.name = result.name;
      obj.uid = result.name;
      obj.url = client.signatureUrl(result.name);
      console.log(obj.url);
      return Promise.resolve(obj);
    });
  }

  request(url, options, hasMessage, responseType = 'json', contentType) {
    options.headers = this.defaultHeader(); //默认headers
    console.log(url, 8899);
    return service({
      responseType,
      method: options.method,
      url: url,
      data: options.body,
      headers: {
        'Content-Type': contentType
          ? 'multipart/form-data'
          : 'application/json;charset=UTF-8',
        Authorization: localDb.get('jwtTokenClient') || '',
      },
    })
      .then(function (res) {
        //console.log(res, '5555666655666')
        /* if (res && res.data && res.status === 200) {
          if (hasMessage) {
            if (res.data.code == 200) {
              message.destroy();
              message.success(res.data.message);
            } else {
              message.destroy();
              message.error(res.data.message);
            }
          }
          return Promise.resolve(res.data);
        } else if (responseType === 'blob') {
          return Promise.resolve(res);
        } else {
          return Promise.reject({
            message: '服务器返回错误',
          });
        } */
        if (res && res.data && res.status === 200) {
          if (responseType === 'blob') {
            console.log('jinlaile');
            return Promise.resolve(res);
          } else {
            //无权限处理
            if (res.data.code === 1002) {
              document.cookie = 'initUrl=' + '/404';
              history.push(publicUrl + '/404');
            }
            // 未登录跳转到首页
            if (res.data.code === 302) {
              removeAllCookie();
              history.push(publicUrl + '/user/login');
              return Promise.reject({ message: '请重新登录' });
            }
            if (res.data.code === 303) {
              removeAllCookie();
              history.push(publicUrl) + '/user/login';
            } else if (res.data.code !== 200) {
              return Promise.reject({ res });
            } else {
              if (hasMessage) {
                message.success(res.data.message);
              }
              return Promise.resolve(res.data);
            }
          }
        } else {
          return Promise.reject({
            message: '服务器返回错误',
          });
        }
      })
      .catch((err) => {
        let data = {
          message: '网络异常',
        };
        console.log(err, 'err-----------');
        if (err.res && err.res.data && err.res.data.message) {
          data = { message: err.res.data.message };
        } else if (err.message) {
          data = err.message;
        } else {
          data = { message: '未知错误' };
        }
        if (err.message == 'timeout of 10000ms exceeded') {
          data = { message: '请求超时' };
        }
        if (err.message == 'Network Error') {
          data = { message: '请求超时' };
        }
        console.log(data.message, 'data.message');
        message.destroy();
        message.error(data.message);
        return Promise.reject(data);
      });
  }

  defaultHeader() {
    // 默认头
    const header = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };
    return header;
  }

  build(url, params) {
    // URL构建方法
    const ps = [];
    if (params) {
      for (let p in params) {
        if (p) {
          ps.push(p + '=' + encodeURIComponent(params[p]));
        }
      }
    }
    return url + '?' + ps.join('&');
  }

  buildFormData(params) {
    if (params) {
      const data = new FormData();
      for (let p in params) {
        if (p) {
          if (Object.prototype.toString.call(params[p]) === '[object Array]') {
            params[p].forEach((item, index) => {
              data.append(`${p}[${index}]`, item);
            });
          } else {
            data.append(p, params[p]);
          }
        }
      }
      return data;
    }
  }
}
/* eslint-disable */
export default new Http();
