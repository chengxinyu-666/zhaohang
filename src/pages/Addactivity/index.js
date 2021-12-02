/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-02 18:26:19
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
  // 创建活动参数
  const [actdata, setActdata] = useState({
    activityName: '', //String	是	活动名称
    activityContent: '', //String	否	活动内容
    activitySite: '', //	String	否	活动地点
    activityOrganizers: '', //String	否	活动主办方
    startDate: '', //Date	是	活动开始时间（2021-7-15 14:00）
    endDate: '', //	Date	是	活动结束时间（2021-7-15 14:00）
    pictureKey: '', //	String	是	活动图片key
    pictureUrl: '', //String	是	活动图片Url
    thumbnailPictureUrl: '', //	String	是	缩略图Url
    thumbnailPictureKey: '', //String	是	缩略图key
    provinceCode: '', //	String	是	省编码
    cityCode: '', //	String	是	市编码
    isSignUp: '', //	Bit	是	是否有报名活动 1-是0-否
    isRobTickets: '', //	Bit	是	是否有抢票活动 1-是0-否
    isSignIn: '', //	Bit	是	是否有签到活动 1-是0-否
    isVote: '', //	Bit	是	是否有投票活动 1-是0-否
    isLuckyDraw: '', //	Bit	是	是否有抽奖活动 1-是0-否
    scheduleVOS: [], //	List<Object>	否	日程对象集合
    activitys: {}, //	List<Object>	是	活动对象集合报名、投票、抢票、签到、抽奖
  });

  useEffect(() => {}, []);

  const nextSpeed = () => {
    speed == 1 ? setSpeed(2) : setSpeed(1);
  };
  const saveDraft = () => {
    console.log(2, actdata);
  };

  return (
    <div className="wrap">
      <div className="flow_head">
        <Flowpath speed={speed}></Flowpath>
      </div>
      <div className="flow_content">
        {speed == 1 ? (
          <FlowOne actdata={actdata} setActdata={setActdata}></FlowOne>
        ) : (
          <FlowTwo></FlowTwo>
        )}

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
          <Button onClick={saveDraft}>保存草稿</Button>
        </div>
      </div>
    </div>
  );
}
