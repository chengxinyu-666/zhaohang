/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 19:11:33
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-10 17:50:21
 */

import NewForm from '../NewForm';
import React, { Component } from 'react';
import Table from '../Table';
// import { CommonEnum } from '@/enums';

export default class Tablefilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Tablist: [
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
      ],
      activityStatus: [],
      draft: false,
      actitem: 0,
    };
  }
  changeItem = (idx) => {
    if (idx == 0) {
      this.setState({
        ...this.state,
        actitem: idx,
        activityStatus: [],
        draft: false,
      });
    } else if (idx == 5) {
      this.setState({
        ...this.state,
        actitem: idx,
        activityStatus: [],
        draft: true,
      });
    } else {
      this.setState({
        ...this.state,
        actitem: idx,
        activityStatus: [idx],
        draft: false,
      });
    }
  };

  static getDerivedStateFromError(error) {
    return {};
  }

  componentDidCatch(error, errorInfo) {}

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}
  render() {
    const { Tablist, actitem } = this.state;
    return (
      <div>
        <div className="Tablefilter">
          <div className="Tablefilter1">
            <ul>
              {Tablist.map((item, idx) => {
                return (
                  <li key={idx}>
                    <a
                      className={item.activityStatus == actitem ? 'acta' : ''}
                      onClick={this.changeItem.bind(this, item.activityStatus)}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <NewForm
            //  ref={cRef}
            draft={this.state.draft}
            actitem={this.state.actitem}
            activityStatus={this.state.activityStatus}
          />
        </div>
      </div>
    );
  }
}
