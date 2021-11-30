/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-30 16:37:47
 */
import React, { useState, useEffect } from 'react';
import FlowOne from './components/FlowOne/index';
import FlowTwo from './components/FlowTwo/index';
import Flowpath from './components/Flowpath/index';

import './index.less';
export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div>
      <div className="flow_head">
        <Flowpath></Flowpath>
      </div>
      <div className="flow_content">
        <FlowOne></FlowOne>
        <FlowTwo></FlowTwo>
      </div>
      <div className="flow_foot"></div>
    </div>
  );
}
