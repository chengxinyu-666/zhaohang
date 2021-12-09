/*
 * @Author: chengxinyu
 * @Date: 2021-12-09 09:55:28
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-09 12:26:12
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Button, Form } from 'antd';
import { useLocation } from 'umi';
import ActiveInfo from './components/ActiveInfo';
import BasicInfo from './components/BasicInfo';
import { history } from 'umi';
import './index.less';

export default function (props) {
  const location = useLocation(); //获取url地址参数
  const [choseitem, setChoseitem] = useState(0); //记录选项卡下标

  const backfill = useSelector((state) => {
    return state.backfill;
  });

  useEffect(() => {
    if (location.query.activityBasicId != backfill.activityBasicId) {
      return message.error('数据错误，请联系管理员！');
    }
  }, []);

  const topList = ['基本信息', '活动信息'];

  return (
    <div>
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

        <div className="components">
          {choseitem == 0 ? <BasicInfo /> : <ActiveInfo />}
        </div>
        <div className="detail_foot">
          <Button onClick={() => history.go(-1)} type="primary">
            返回
          </Button>
        </div>
      </div>
    </div>
  );
}
