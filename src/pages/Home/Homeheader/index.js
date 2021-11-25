/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 10:26:54
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 14:13:33
 */
import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Select,
  Menu,
  Dropdown,
  Button,
  Space,
  message,
} from 'antd';

import { Link, withRouter } from 'umi';
import { cookie } from 'project-libs';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { history } from 'umi';

import '../index.less';
export default function (props) {
  const [state, setState] = useState();

  const handLogout = () => {
    console.log(234);
    request
      .post('/campus/campusweb/ipuser/logout ')
      .then(function (res) {
        if (res.code == 200) {
          cookie.remove('user');
          localStorage.removeItem('userName');
          message.info('退出成功！');
          history.push('./login');
        } else {
          message.info(res.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key={1}>
        <a rel="noopener noreferrer">修改密码</a>
      </Menu.Item>
      <Menu.Item key={2}>
        <a rel="noopener noreferrer" onClick={handLogout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {}, []);

  return (
    <div className="head_top">
      <div className="head_top1">
        <div className="bride">
          {/* 预留面包屑导航 */}
          {/* <Breadcrumb>
                        <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">Component</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="">General</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Button</Breadcrumb.Item>
                    </Breadcrumb> */}
        </div>
        <div className="header_login">
          {cookie.get('user') ? (
            <>
              {localStorage.getItem('userName')}
              <Space wrap>
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </>
          ) : (
            <>
              <Link to="/login">登录</Link>
            </>
          )}
        </div>
      </div>
      <div className="head_top2">
        <h3>活动管理</h3>
        <h2>活动管理</h2>
      </div>
    </div>
  );
}
