/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 10:35:34
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 10:52:17
 */
import React, { useState, useEffect } from 'react';

export default function (props) {
  const [state, setState] = useState();

  useEffect(() => {}, []);

  return (
    <div className="tablefilter">
      <div className="choseitem">
        <ul>
          <li>
            <a>全部</a>
          </li>
          <li>
            <a>待审核</a>
          </li>
          <li>
            <a>进行中</a>
          </li>
          <li>
            <a>未开始</a>
          </li>
          <li>
            <a>已驳回</a>
          </li>
          <li>
            <a>已结束</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
