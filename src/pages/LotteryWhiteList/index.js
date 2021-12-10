/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-10 17:23:15
 */
import React, { useState, useEffect, useRef } from 'react';

import { message, Button, Form } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
export default function (props) {
  const [speed, setSpeed] = useState(1);

  const dispatch = useDispatch();

  // 仓库数据
  const backfill = useSelector((state) => {
    return state.backfill;
  });
  const menulist = useSelector((state) => {
    return state.menulist;
  });
  const current = useSelector((state) => {
    return state.current;
  });

  const guancha = async () => {
    console.log('全部总数据', menulist);
    console.log('单挑数据', backfill);
    console.log('测试', current);
  };

  return (
    <div className="wrap">
      <Button onClick={guancha}>观察数据</Button>
    </div>
  );
}
