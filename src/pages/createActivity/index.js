/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:53:32
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-07 17:26:37
 */
import React, { useState, useEffect } from 'react';
import { Layout, Select } from 'antd';

import Tablefilter from './Tablefilter';
import './index.less';

// import { useDispatch, useSelector } from 'react-redux';

const { Header, Content } = Layout;

export default function (props) {
  // const dispatch = useDispatch();

  // const menuName = useSelector((state) => {
  //   return state.menuName;
  // });

  // dispatch({
  //   type: 'SWITCH_CURRENT',
  //   menuName: txt,
  // });

  return (
    <div className="home_page">
      <Layout>
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
