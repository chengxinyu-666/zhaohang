/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 19:11:33
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-29 17:19:18
 */
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  message,
} from 'antd';
import Table from '../Table';
import { useHttpHook } from '@/hooks';
import { CommonEnum } from '@/enums';

import NewForm from '../NewForm';

export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [activityStatus, setActivityStatus] = useState([]);
  const [draft, setDraft] = useState(false);
  const [actitem, setActitem] = useState(0);

  const cRef = useRef(null);

  const Tablist = [
    {
      title: '全部',
      activityStatus: '0',
    },
    {
      title: '进行中',
      activityStatus: '2',
    },
    {
      title: '未开始',
      activityStatus: '3',
    },
    {
      title: '已结束',
      activityStatus: '6',
    },
    {
      title: '待审核',
      activityStatus: '1',
    },
    {
      title: '已驳回',
      activityStatus: '4',
    },
    {
      title: '草稿箱',
      activityStatus: '5',
    },
  ];
  // 头部切换
  function changeItem(idx) {
    if (cRef.current) {
      cRef.current.getData();
    }

    setActitem(idx);
    if (idx == 0) {
      setActivityStatus([]);
      setDraft(false);
    } else if (idx == 5) {
      setActivityStatus([]);
      setDraft(true);
    } else {
      setActivityStatus([idx]);
      setDraft(false);
    }
  }

  return (
    <div className="Tablefilter">
      <div className="Tablefilter1">
        <ul>
          {Tablist.map((item, idx) => {
            return (
              <li key={idx}>
                <a
                  className={item.activityStatus == actitem ? 'acta' : ''}
                  onClick={changeItem.bind(this, item.activityStatus)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <NewForm
        ref={cRef}
        draft={draft}
        actitemStatus={actitem}
        activityStatus={activityStatus}
      />
    </div>
  );
}
