/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:53:32
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 18:47:35
 */
import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { Link, withRouter } from 'umi';
import { cookie } from 'project-libs';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.less';
const { Header, Content, Footer, Sider } = Layout;
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="home_page">
      <Layout>
        <div className="head_top">
          <div className="head_top1">
            <div className="bride">
              <Breadcrumb>
                <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Component</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">General</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Button</Breadcrumb.Item>
              </Breadcrumb>
              ,
            </div>
            <div className="header_login">
              {cookie.get('user') ? (
                <>
                  {' '}
                  cookie.get('user')
                  <Avatar size="large" icon={<UserOutlined />} />
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

        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{
              background: '#ffffff',
              padding: 25,
              borderRadius: 5,
              minHeight: 360,
            }}
          >
            活动管理
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
