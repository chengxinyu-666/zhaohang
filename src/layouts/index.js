/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:34:44
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-04 03:36:09
 */

import React, { useState, useEffect } from 'react';
import { Menu, HomeHeader } from '@/components';
import './index.less';
// 状态
// import store from '@/store/index';
import { useLocation } from 'umi';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'

function BasicLayout(props) {
  const location = useLocation();
  const paths = ['/login'];

  return (
    // <Provider store={store}>
    <div className="lay">
      <div className="left_container">
        <Menu
          show={paths.includes(location.pathname)}
          pathname={location.pathname}
        ></Menu>
      </div>

      <div className="right_container">
        <HomeHeader
          show={paths.includes(location.pathname)}
          pathname={location.pathname}
        ></HomeHeader>
        {props.children}
      </div>
    </div>
    // </Provider>
  );
}

export default BasicLayout;
