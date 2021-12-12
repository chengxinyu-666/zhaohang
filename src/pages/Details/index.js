/*
 * @Author: chengxinyu
 * @Date: 2021-12-09 09:55:28
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-11 16:47:01
 */

import React, { useState, useEffect } from 'react';
import { message, Button, Form, Spin } from 'antd';
import { useLocation } from 'umi';
import ActiveInfo from './components/ActiveInfo';
import BasicInfo from './components/BasicInfo';
import { history } from 'umi';
import { useHttpHook } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import './index.less';

export default function (props) {
  const dispatch = useDispatch();
  const location = useLocation(); //获取url地址参数
  const [choseitem, setChoseitem] = useState(0); //记录选项卡下标

  const [backfill] = useHttpHook({
    url: '/activity/queryByUpdate',
    body: {
      activityBasicId: location.query.activityBasicId,
    },
  });

  // const huancha = () => {
  //   console.log('观察数据1', backfill);
  // }

  const topList = ['基本信息', '活动信息'];

  return (
    <div>
      {/* <Button onClick={huancha}>观察数据</Button> */}
      <div className="detail_Inner">
        <h2>详情</h2>
        <div className="list_top">
          <ul>
            {topList.map((item, idx) => {
              return (
                <li key={idx}>
                  <a
                    onClick={() => {
                      setChoseitem(idx);
                    }}
                    className={choseitem == idx ? 'a_act' : ''}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {backfill ? (
          <div className="components">
            {choseitem == 0 ? (
              <BasicInfo backfill={backfill} />
            ) : (
              <ActiveInfo backfill={backfill} />
            )}
          </div>
        ) : (
          <Spin />
        )}

        <div className="detail_foot">
          <Button onClick={() => history.go(-1)} type="primary">
            返回
          </Button>
        </div>
      </div>
    </div>
  );
}
