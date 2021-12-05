/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:42:04
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-06 01:07:16
 */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Select, Collapse, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import '../../index.less';
const { Panel } = Collapse;

import SignUp from './components/SignUp';
import Vote from './components/Vote';
import Ticket from './components/Ticket';

const FlowTwo = forwardRef((props, ref) => {
  const { actdata, setActdata } = props;
  const cRef = useRef(null);
  console.log('two组件的', props);
  const [selectedItems, setSelectedItems] = useState([]);

  const OPTIONS = ['报名', '投票', '门票', '签到', '抽奖']; //创建活动选项

  const choseActiveFun = (a) => {
    console.log(33, a);
    let obj = {
      isSignUp: false,
      isVote: false,
      isRobTickets: false,
      isSignIn: false,
      isLuckyDraw: false,
    };
    if (a.includes('报名')) {
      obj.isSignUp = true;
    }
    if (a.includes('投票')) {
      obj.isVote = true;
    }
    if (a.includes('门票')) {
      obj.isRobTickets = true;
    }
    if (a.includes('签到')) {
      obj.isSignIn = true;
    }
    if (a.includes('抽奖')) {
      obj.isLuckyDraw = true;
    }
    setSelectedItems(a);
    setActdata({
      ...actdata,
      ...obj,
    });
  };

  const filteredOptions = OPTIONS.filter((o) => {
    return !selectedItems.includes(o);
  });

  useEffect(() => {}, []);
  return (
    <div className="flow_two">
      <div className="item1">
        <h2>
          选择你想要创建的活动<span>(可多选)</span>
        </h2>
        <div className="item_list">
          <Select
            mode="multiple"
            placeholder="选择你想要创建的活动可多选"
            value={selectedItems}
            onChange={choseActiveFun}
            style={{ width: '100%' }}
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="item2">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              style={{ color: '#50599b' }}
              rotate={isActive ? -90 : 90}
            />
          )}
          expandIconPosition="right"
          className="site-collapse-custom-collapse"
        >
          {selectedItems.includes('报名') ? (
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
                  <SignUp
                    ref={cRef}
                    actdata={actdata}
                    setActdata={setActdata}
                  />
                </div>
              </div>
            </Panel>
          ) : (
            ''
          )}

          {selectedItems.includes('投票') ? (
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
                  <Vote ref={cRef} />
                </div>
              </div>
            </Panel>
          ) : (
            ''
          )}
          {selectedItems.includes('门票') ? (
            <Panel
              header={
                <div className="penel_item">
                  <span className="sp1">门票</span>
                </div>
              }
              style={{
                backgroundColor: '#fff',
              }}
              key="3"
              className="site-collapse-custom-panel"
            >
              <div className="active_item">
                <div className="inner_action_item">
                  <Ticket />
                </div>
              </div>
            </Panel>
          ) : (
            ''
          )}
        </Collapse>
      </div>
    </div>
  );
});
export default FlowTwo;
