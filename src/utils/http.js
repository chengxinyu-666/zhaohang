/*
 * @Author: chengxinyu
 * @Date: 2021-11-19 16:52:10
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-26 16:17:10
 */

export default function Http({
  url,
  method = 'post',
  headers,
  body = {},
  setResult,
}) {
  const defaultHeader = {
    'Content-type': 'application/json',
  };

  let params;
  if (method.toUpperCase() === 'GET') {
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        headers,
      },
      method,
      body: JSON.stringify(body),
    };
  }

  return new Promise((resolve, reject) => {
    fetch('/campus/campusweb' + url, params)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          resolve(res.data);
          setResult && setResult(res.data);
        } else {
          reject(res.errMsg);
        }
      })
      .catch((err) => {
        // Toast.fail(err);
        console.log(err);
        reject(err);
      })
      .finally(() => {});
  });
}
