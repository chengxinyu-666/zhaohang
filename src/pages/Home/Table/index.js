import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import '../index.less';
const data = [
  {
    key: '1',
    active_name: '活动名称',
    creator: '创建人',
    creation_time: '2020-1-1',
    active_time: '2010-10-10 08:50 ~ 2010-10-10 08:50',
    active_state: '待审核',
  },
  {
    key: '2',
    active_name: '活动名称',
    creator: '创建人',
    creation_time: '2020-1-1',
    active_time: '2010-10-10 08:50 ~ 2010-10-10 08:50',
    active_state: '待审核',
  },
  {
    key: '3',
    active_name: '活动名称',
    creator: '创建人',
    creation_time: '2020-1-1',
    active_time: '2010-10-10 08:50 ~ 2010-10-10 08:50',
    active_state: '待审核',
  },
  {
    key: '4',
    active_name: '活动名称',
    creator: '创建人',
    creation_time: '2020-1-1',
    active_time: '2010-10-10 08:50 ~ 2010-10-10 08:50',
    active_state: '待审核',
  },
];

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: '活动名称',
        dataIndex: 'active_name',
        key: 'active_name',
        ellipsis: true,
        // width:260,
        align: 'right',
        className: 'fs',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
        ellipsis: true,
        // width:180,
        align: 'center',
        className: 'fs',
      },
      {
        title: '创建时间',
        dataIndex: 'creation_time',
        key: 'creation_time',

        onFilter: (value, record) => record.creation_time.includes(value),
        sorter: (a, b) => a.creation_time.length - b.creation_time.length,
        sortOrder: sortedInfo.columnKey === 'creation_time' && sortedInfo.order,
        ellipsis: true,
        // width:180,
        align: 'center',
        className: 'fs',
      },
      {
        title: '活动时间',
        dataIndex: 'active_time',
        key: 'active_time',

        onFilter: (value, record) => record.active_time.includes(value),
        sorter: (a, b) => a.active_time.length - b.active_time.length,
        sortOrder: sortedInfo.columnKey === 'active_time' && sortedInfo.order,
        ellipsis: true,
        // width:380,
        align: 'center',
        className: 'fs',
      },
      {
        title: '状态',
        dataIndex: 'active_state',
        key: 'active_state',
        // width:180,
        align: 'center',
        className: 'fs',
        // ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'key',
        key: 'key',
        render: () => (
          <div>
            <a> 详情</a> <a>通过</a> <a>驳回</a>
          </div>
        ),
        ellipsis: true,
        className: 'fs',
        align: 'center',
      },
    ];
    return (
      <>
        <Table
          columns={columns}
          bordered={false}
          dataSource={data}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

export default App;
// ReactDOM.render(< />, mountNode);
