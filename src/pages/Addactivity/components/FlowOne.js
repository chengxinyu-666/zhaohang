/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:41:59
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-29 18:29:52
 */

import React, { useState, useEffect } from 'react';

export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="flow_one">
      <div className="innerFlowpath">
        <h3>请填写活动的基本信息</h3>
        <div className="active_box1"></div>
      </div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
    </div>
  );
}
