/*
 * @Author: chengxinyu
 * @Date: 2021-11-25 19:11:33
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 19:52:30
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
export default function (props) {
  const [actitem, setActitem] = useState(0);
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 4,
    },
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  const Tablist = ['全部', '待审核', '进行中', '未开始', '已驳回', '已结束'];

  function addClick(idx) {
    setActitem(idx);
  }

  useEffect(() => {}, []);

  return (
    <div className="Tablefilter">
      <div className="Tablefilter1">
        <ul>
          {Tablist.map((item, idx) => {
            return (
              <li key={idx}>
                <a
                  className={idx == actitem ? 'acta' : ''}
                  onClick={addClick.bind(this, idx)}
                >
                  {item}
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
    </div>
  );
}
