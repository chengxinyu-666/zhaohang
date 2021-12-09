/*
 * @Author: chengxinyu
 * @Date: 2021-12-09 10:50:52
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-09 16:10:08
 */
import React, { useState, useEffect } from 'react';
import { Select, Collapse, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
const { Panel } = Collapse;
import '../index.less';

export default function (props) {
  const backfill = useSelector((state) => {
    return state.backfill;
  });
  const [signUpdate, setSignUpdate] = useState({}); //报名
  const [robticketsdate, setRobticketsdate] = useState({}); //抢票
  const [signindate, setSignindate] = useState({}); //签到
  const [votedate, setVotedate] = useState({}); //投票
  const [luckydate, setLuckydate] = useState({}); //抽奖

  // console.log('仓库拿到的数据', backfill);
  const { isSignUp, isRobTickets, isSignIn, isVote, isLuckyDraw, activityVOS } =
    backfill;

  useEffect(() => {
    console.log('活动数据', activityVOS);
    if (isSignUp) {
      let obj = activityVOS.filter((item) => item.activityType == 1);
      setSignUpdate({ ...obj[0] });
    }
    if (isVote) {
      let obj2 = activityVOS.filter((item) => item.activityType == 2);
      setVotedate({ ...obj2[0] });
    }
  }, []);

  const lookdata = () => {
    console.log('观察数据', votedate);
  };

  return (
    <div className="activeinfo">
      <span onClick={lookdata}>观察数据</span>
      <Collapse
        bordered={false}
        defaultActiveKey={['1', '2']}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ color: '#50599b' }}
            rotate={isActive ? -90 : 90}
          />
        )}
        expandIconPosition="right"
        className="site-collapse-custom-collapse"
      >
        {/* 报名数据 */}
        {isSignUp ? (
          <Panel
            header={
              <div className="penel_item">
                <span className="sp1">报名</span>
              </div>
            }
            style={{
              backgroundColor: '#fff',
            }}
            key="1"
            className="site-collapse-custom-panel"
          >
            <div className="active_item">
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>基本信息</h2>
                </div>
                <div className="item_box">
                  <p className="p_txt">
                    活动时间:{signUpdate.startDate + '——' + signUpdate.endDate}
                  </p>
                  <p className="p_txt">报名人数:{signUpdate.numberLimit}</p>
                </div>
              </div>
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>活动参加者填写的信息</h2>
                </div>
                <div className="item_box_list">
                  <ul>
                    {signUpdate?.requiredEntryForms?.map((item) => {
                      return (
                        <li key={item.key}>
                          <a>{item.key}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>补充项目</h2>
                </div>
                <div className="item_box_list2">
                  <span className="item_name">项目名称：</span>
                  <div className="add_item">
                    {signUpdate?.optionalEntryForms?.map((item) => {
                      return <span key={item.key}> {item.key} </span>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        ) : null}
        {/* 投票 */}
        {isVote ? (
          <Panel
            header={
              <div className="penel_item">
                <span className="sp1">投票</span>
              </div>
            }
            style={{
              backgroundColor: '#fff',
            }}
            key="2"
            className="site-collapse-custom-panel"
          >
            <div className="active_item">
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>基本信息</h2>
                </div>
                <div className="item_box">
                  <p className="p_txt">
                    活动时间:{votedate.startDate + '——' + votedate.endDate}
                  </p>
                  <p className="p_txt">
                    投票方式:
                    {votedate.voteWay == 1 ? '只可投一次' : '每日均可投票'}{' '}
                    <span>
                      {votedate.voteWay == 2
                        ? ' 单日可投上限:' +
                          votedate.dayVoteLimit +
                          ' 重复投票上限:' +
                          votedate.singlePlayerLimit
                        : ''}
                    </span>
                  </p>
                </div>
              </div>
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>投票对象</h2>
                </div>
                <div className="vote_list">
                  {votedate.voteObjectVOS?.map((item, idx) => {
                    return (
                      <div className="item_j" key={idx}>
                        <div className="item_j_left">
                          <span className="item_name">姓名:</span>
                          <span className="item_session">{item?.name}</span>
                        </div>

                        <div className="item_j_left">
                          <span className="item_name">说明:</span>
                          <span className="item_session">
                            {item?.instructions}
                          </span>
                        </div>
                        <div className="item_j_left">
                          <span className="item_name">图片:</span>
                          <div className="pic_item">
                            <img src={item?.pictureUrl} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Panel>
        ) : null}
        {isRobTickets ? (
          <Panel
            header={
              <div className="penel_item">
                <span className="sp1">门票</span>
              </div>
            }
            style={{
              backgroundColor: '#fff',
            }}
            key="31"
            className="site-collapse-custom-panel"
          >
            <div className="active_item">
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>基本信息</h2>
                </div>
                <div className="item_box">
                  <p className="p_txt">
                    活动时间:2021-01-20 15:52-2021-01-20 15;78
                  </p>
                  <p className="p_txt">报名人数:12</p>
                </div>
              </div>
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>活动参加者填写的信息</h2>
                </div>
                <div className="item_box_list">
                  <ul>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                    <li>
                      <a>姓名</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="inner_action_item">
                <div className="item_top">
                  <h2>补充项目</h2>
                </div>
                <div className="item_box_list2">
                  <span className="item_name">项目名称：</span>
                  <div className="add_item">
                    <span>爱学习</span>
                    <span>爱学习</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        ) : null}
        {isSignIn ? (
          <Panel
            header={
              <div className="penel_item">
                <span className="sp1">签到</span>
              </div>
            }
            style={{
              backgroundColor: '#fff',
            }}
            key="4"
            className="site-collapse-custom-panel"
          >
            <div className="active_item">
              <div className="inner_action_item">报名列表</div>
            </div>
          </Panel>
        ) : null}
        {isLuckyDraw ? (
          <Panel
            header={
              <div className="penel_item">
                <span className="sp1">抽奖</span>
              </div>
            }
            style={{
              backgroundColor: '#fff',
            }}
            key="5"
            className="site-collapse-custom-panel"
          >
            <div className="active_item">
              <div className="inner_action_item">{/* <h3>基本信息</h3> */}</div>
            </div>
          </Panel>
        ) : null}
      </Collapse>
    </div>
  );
}
