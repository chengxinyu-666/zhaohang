/*
 * @Author: chengxinyu
 * @Date: 2021-12-09 10:50:38
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-09 16:15:05
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function (props) {
  const backfill = useSelector((state) => {
    return state.backfill;
  });

  //   console.log('仓库拿到的数据', backfill);
  const {
    activityName,
    activityContent,
    activitySite,
    activityOrganizers,
    startDate,
    endDate,
    pictureKey,
    pictureUrl,
    thumbnailPictureKey,
    thumbnailPictureUrl,
    provinceCode,
    activityStatus,
    scheduleVOS,
  } = backfill;

  //活动地点数据需要特殊处理
  useEffect(() => {}, []);

  return (
    <div className="basicinfo">
      <div>
        <ul>
          <li>
            <div className="mes">
              <span className="name">活动名称：</span>
              <span className="its"> {activityName}</span>
            </div>
            {/* 这块地方根据不同进度，渲染不同颜色的组件 */}
            {activityStatus == 1 ? (
              <span className="shnhe">待审核</span>
            ) : activityStatus == 2 ? (
              <span className="jinxin">进行中</span>
            ) : activityStatus == 3 ? (
              <span className="jieshu">未开始</span>
            ) : activityStatus == 4 ? (
              <span className="bohi">已驳回</span>
            ) : (
              <span className="jieshu">已结束</span>
            )}
          </li>
          <li>
            <div className="mes">
              <span className="name">活动地点：</span>
              <span className="its">{activitySite}</span>
            </div>
          </li>
          <li>
            <div className="mes">
              <span className="name">活动时间：</span>
              <span className="its"> {startDate + '-' + endDate}</span>
            </div>
          </li>
          <li>
            <div className="mes">
              <span className="name">活动内容：</span>
              <span className="its">{activityContent}</span>
            </div>
          </li>
          <li>
            <div className="mes">
              <span className="name">日程安排：</span>
              <div className="daily_plan">
                {scheduleVOS.map((item, idx) => {
                  return (
                    <div className="plan_item" key={idx}>
                      <span className="its">{item.scheduleDate}</span>
                      <span className="daily_jihua">{item.scheduleName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
