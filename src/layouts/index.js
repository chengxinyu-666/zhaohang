/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:34:44
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-29 17:29:01
 */

import React, { useState, useEffect } from 'react';
import { Menu, HomeHeader } from '@/components';
import './index.less';
import { useLocation } from 'umi';

function BasicLayout(props) {
  const location = useLocation();

  const paths = ['/login'];

  return (
    <div>
      <div className="lay">
        <div className="left_container">
          <Menu
            show={paths.includes(location.pathname)}
            pathname={location.pathname}
          ></Menu>
        </div>

        <div className="right_container">
          <HomeHeader></HomeHeader>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
