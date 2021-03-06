/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:39:19
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-01 14:26:31
 */
import React, { useState, useEffect } from 'react';
import { Steps, Popover } from 'antd';

const { Step } = Steps;

export default function (props) {
  const [state, setState] = useState();

  return (
    <div className="flowpath">
      <div className="innerFlowpath">
        <h2>创建活动</h2>
        <div className="steps">
          <Steps current={props.speed} progressDot>
            <Step title="基本信息" />
            <Step></Step>
            <Step title="活动信息" />
          </Steps>
        </div>
      </div>
    </div>
  );
}
