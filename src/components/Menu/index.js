/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 12:59:15
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 18:18:04
 */
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  BarChartOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { useStoreHook } from 'think-react-store';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function (props) {
  const [state, setState] = useState();
  const {
    menu: { menu, getMenuAsync, resetData },
  } = useStoreHook();

  useEffect(() => {
    getMenuAsync({});
  }, []);

  return (
    <div className="menu">
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            width: '300px',
          }}
        >
          <div className="logo">
            <h2>招行-秦学后台管理</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<BarChartOutlined />}>
              nav 4
            </Menu.Item>
            <SubMenu key="sub2" icon={<UserOutlined />} title="User">
              <Menu.Item key="7">Tom</Menu.Item>
              <Menu.Item key="8">Bill</Menu.Item>
              <Menu.Item key="9">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
}
