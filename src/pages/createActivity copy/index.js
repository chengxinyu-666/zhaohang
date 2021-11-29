/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:53:32
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-29 13:51:46
 */
import React, { useState, useEffect } from 'react';
import { Layout, Select } from 'antd';

import HomeHeader from './Homeheader';
import Tablefilter from './Tablefilter';
import './index.less';
const { Header, Content } = Layout;
export default function (props) {
  useEffect(() => {}, []);

  return (
    <div className="home_page">
      <Layout>
        <HomeHeader></HomeHeader>

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
            <Tablefilter></Tablefilter>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
