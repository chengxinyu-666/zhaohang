/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:33:41
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-23 18:39:17
 */

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { encrypt } from '@/utils/password';
import './index.less';

import { extend } from 'umi-request';
//  import Http from '@/utils/server'
import request from 'umi-request';

export default function (props) {
  // const [state, setState] = useState()

  const request = extend({
    prefix: 'http://cmb.beyondsofthz.com/campus/campusweb',
    suffix: '.json',
    timeout: 1000,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      //   token: "xxx" // 所有请求默认带上 token 参数
    },
    errorHandler: function (error) {
      /* 异常处理 */
    },
  });

  let onFinish = async (values) => {
    const { username, password } = values;
    let data = {
      userAccount: username,
      userPwd: encrypt(password),
    };
    console.log(data);

    // let header=['authorization',null]
    //    const {data: res} = await Http.post('/ipuser/login',data,header)
    request
      .post('/ipuser/login', {
        data,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="login_page">
      <div className="logform">
        <div className="inner_form">
          <h2>秦学后台管理</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入登录密码"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
          <p>使用手机小程序提示的账号密码登录</p>
        </div>
      </div>
    </div>
  );
}
