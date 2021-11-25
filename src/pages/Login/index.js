/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:33:41
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 14:08:46
 */
/*
 * @Author: chengxinyu
 * @Date: 2021-11-23 11:33:41
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 09:49:40
 */

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { encrypt } from '@/utils/password';
import { cookie, urlGet } from 'project-libs';
import { history } from 'umi';
import './index.less';

import request from 'umi-request';

export default function (props) {
  console.log(cookie.get('user'));
  let onFinish = async (values) => {
    const { username, password } = values;
    let data = {
      userAccount: username,
      userPwd: encrypt(password),
    };
    console.log(data);

    request
      .post('/campus/campusweb/ipuser/login', {
        data,
      })
      .then(function (res) {
        console.log(res);
        if (res.code == 200) {
          cookie.set('user', res.data.userId);
          localStorage.setItem('userName', res.data.userName);
          message.info('登录成功！');
          history.push('./home');
        } else {
          message.info(res.message);
        }
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
