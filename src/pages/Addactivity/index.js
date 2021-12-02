/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-01 14:38:54
 */
import React, { useState, useEffect } from 'react';
import FlowOne from './components/FlowOne/index';
import FlowTwo from './components/FlowTwo/index';
import Flowpath from './components/Flowpath/index';
import { Button } from 'antd';

import './index.less';
export default function (props) {
  const [state, setState] = useState();
  const [speed, setSpeed] = useState(1);

  useEffect(() => {}, []);

  const nextSpeed = () => {
    speed == 1 ? setSpeed(2) : setSpeed(1);
  };

  return (
    <div className="wrap">
      <div className="flow_head">
        <Flowpath speed={speed}></Flowpath>
      </div>
      <div className="flow_content">
        {speed == 1 ? <FlowOne></FlowOne> : <FlowTwo></FlowTwo>}

        <div className="flow_tab">
          {speed == 1 ? (
            <>
              {' '}
              <Button type="primary" onClick={nextSpeed}>
                下一步
              </Button>
            </>
          ) : (
            <>
              {' '}
              <Button type="primary">发布</Button>
              <Button onClick={nextSpeed}>上一步</Button>
            </>
          )}
          <Button>预览</Button>
          <Button>保存草稿</Button>
        </div>
      </div>
    </div>
  );
}
