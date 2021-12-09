import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { history } from 'umi';
import '../index.less';
import request from 'umi-request';
import { useDispatch, useSelector } from 'react-redux';

export default function (props) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

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
      ellipsis: true,
      align: 'center',
      className: 'fs',
    },
    {
      title: '活动时间',
      dataIndex: 'startDate',
      key: 'startDate',
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
      render: (activityStatus, data) => (
        <>
          {data.isDraft ? (
            ''
          ) : activityStatus === 1 ? (
            <a className="green">待审核</a>
          ) : (
            ''
          )}
          {activityStatus === 2 ? <a className="purple">进行中</a> : ''}
          {activityStatus === 3 ? <a className="grey">未开始</a> : ''}
          {activityStatus === 4 ? <a className="red">已驳回</a> : ''}
          {data.isDraft ? <a className="grey"> 草稿</a> : ''}
          {activityStatus === 6 || activityStatus === 5 ? (
            <a className="grey">已结束</a>
          ) : (
            ''
          )}
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'activityStatus',
      // dataIndex: 'activityStatus',
      key: 'activityBasicId',
      render: (activityStatus, data) => (
        <>
          {data.isDraft ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 1)}>编辑</a>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>
                详情(测试用，等会删除)
              </a>
              <a>删除</a>
            </>
          ) : activityStatus == 1 ? (
            <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
          ) : (
            ''
          )}

          {activityStatus == 2 ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
              <a>关闭</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == 3 ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == 4 ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
              <a>重新发布</a>
              <a>删除</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == '5' ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
              <a>删除</a>
            </>
          ) : (
            ''
          )}
          {activityStatus == '6' ? (
            <>
              <a onClick={() => editAndDetail(data.activityBasicId, 2)}>详情</a>
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

  // 详情和草稿共用一个接口
  const editAndDetail = (id, iq) => {
    let data = {
      activityBasicId: id,
    };
    request
      .post('/campus/campusweb/activity/queryByUpdate', {
        data,
      })
      .then(function (res) {
        console.log('获取单挑数据', res);
        if (res.code == 200) {
          dispatch({
            type: 'SWITCH_BACKFILL',
            backfill: res.data,
          });
          // 判断去详情页还是去草稿页
          iq == 1
            ? history.push('/addActivity?activityBasicId=' + id)
            : history.push('/details?activityBasicId=' + id);
        }
      });

    // history.push('/addActivity?activityBasicId=' + id);
  };
  const toDetail = (id) => {
    console.log(7777777, id);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination.current, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  useEffect(() => {}, []);

  const goAddactivity = () => {
    history.push('/addActivity');
  };

  const { tabledate } = props;

  return (
    <div>
      <Button type="primary" onClick={goAddactivity}>
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
