/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:34:44
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-07 22:47:03
 */

import React, { useState, useEffect } from 'react';
import { Menu, HomeHeader } from '@/components';
import './index.less';
// 状态
// import store from '@/store/index';
import { useLocation } from 'umi';
import { Provider } from 'react-redux';
import store from '../store/index';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configStore from '../store/index';
import { persistor } from '../store/index';

// const store = store();

function BasicLayout(props) {
  const location = useLocation();
  const paths = ['/login'];

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default BasicLayout;
