/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 19:11:33
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-26 16:25:05
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import Table from '../Table';
import { useHttpHook } from '@/hooks';
import { CommonEnum } from '@/enums';
export default function (props) {
  const [page, setPage] = useState(CommonEnum.PAGE);
  const [actitem, setActitem] = useState(0);
  const [form] = Form.useForm();

  const [tabledate] = useHttpHook({
    url: '/activity/pageConditionQueryByCreatorId',
    body: {
      ...page,
    },
    watch: [page.pageNum],
  });

  console.log('父级tabledate', tabledate);

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
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
  function changeItem(idx) {
    setActitem(idx);
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
      <div className="Tablefilter2">
        <Form form={form} name="control-hooks" onFinish={onFinish}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item name="activename" label="活动名称">
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
            <Col span={6} style={{ marginLeft: 20 }}>
              <Form.Item name="activetime" label="创建时间">
                <DatePicker
                  placeholder="请选择"
                  style={{ width: 260 }}
                  onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col span={4} style={{ marginLeft: 100 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  htmlType="button"
                  onClick={onReset}
                >
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Table tabledate={tabledate} Tablist={Tablist} actitem={actitem}></Table>
    </div>
  );
}
