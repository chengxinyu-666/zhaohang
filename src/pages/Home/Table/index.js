import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import '../index.less';
export default function (props) {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });
  console.log(2, props);
  // state = {
  //   filteredInfo: null,
  //   sortedInfo: null,
  // };
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
      ellipsis: true,
      align: 'center',
      className: 'fs',
    },
    {
      title: '创建人',
      dataIndex: 'activityOrganizers',
      key: 'id',
      ellipsis: true,
      align: 'center',
      className: 'fs',
    },
    {
      title: '创建时间',
      dataIndex: 'startDate',
      key: 'id',

      // onFilter: (value, record) => record.startDate.includes(value),
      // sorter: (a, b) => a.startDate.length - b.startDate.length,
      // sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
      ellipsis: true,
      align: 'center',
      className: 'fs',
    },
    {
      title: '活动时间',
      dataIndex: 'startDate',
      key: 'startDate',

      // onFilter: (value, record) => record.startDate.includes(value),
      // sorter: (a, b) => a.startDate.length - b.startDate.length,
      // sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
      ellipsis: true,
      align: 'center',
      className: 'fs',
    },
    {
      title: '状态',
      dataIndex: 'activityStatus',
      key: 'activityStatus',
      align: 'center',
      className: 'fs',
      ellipsis: true,
      render: (activityStatus) => (
        <>
          {activityStatus == 1 ? <a className="green">待审核</a> : ''}
          {activityStatus == 2 ? <a className="purple">进行中</a> : ''}
          {activityStatus == 3 ? <a className="grey">未开始</a> : ''}
          {activityStatus == 4 ? <a className="red">已驳回</a> : ''}
          {activityStatus == 5 ? <a className="grey"> 草稿</a> : ''}
          {activityStatus == 6 ? <a className="grey">已结束</a> : ''}
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'activityStatus',
      key: 'id',
      render: (activityStatus) => (
        <>
          {activityStatus == 1 ? <a>详情</a> : ''}
          {activityStatus == 2 ? (
            <>
              <a>详情</a>
              <a>关闭</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == 3 ? (
            <>
              <a>详情</a>{' '}
            </>
          ) : (
            ''
          )}
          {activityStatus == 4 ? (
            <>
              <a>详情</a>
              <a>重新发布</a>
              <a>删除</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == 5 ? (
            <>
              <a>详情</a>
              <a>删除</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == 6 ? (
            <>
              <a>详情</a>
              <a>删除</a>
            </>
          ) : (
            ''
          )}
        </>
      ),
      ellipsis: true,
      className: 'fs',
      align: 'center',
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination.current, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  useEffect(() => {}, []);
  const { tabledate } = props;

  return (
    <div>
      <Button
        // hidden={actitem!=0}
        type="primary"
      >
        +创建活动
      </Button>
      {tabledate ? (
        <Table
          columns={columns}
          bordered={false}
          dataSource={tabledate.rows}
          onChange={handleChange}
          rowKey="id"
        />
      ) : (
        <></>
      )}
    </div>
  );
}
