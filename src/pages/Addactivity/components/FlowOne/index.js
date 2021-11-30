/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:41:59
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-30 16:40:22
 */

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Cascader,
  DatePicker,
  Space,
  Upload,
  Modal,
} from 'antd';

import { useHttpHook } from '@/hooks';
import request from 'umi-request';
import { PlusOutlined } from '@ant-design/icons';
import getBase64 from '@/utils/getBase64';
import PicturesWall from './PicturesWall';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export default function (props) {
  const [cityparameter, setCityparameter] = useState({
    addressLevel: '1',
    parentId: '',
  });
  //地区获取参数
  const [rawData] = useHttpHook({
    url: '/address/queryAddressForFourLinkage',
    body: {
      addressLevel: '1',
    },
  });

  const optionLists = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      isLeaf: false,
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      isLeaf: false,
    },
  ];
  const [options, setOptions] = React.useState(rawData);
  console.log('外层城市数据', rawData);
  function onChange(value, selectedOptions) {
    console.log(value, selectedOptions);
    // let data={
    //     addressLevel:2,
    //     parentId:value[0]
    // }
    // console.log(4,value[0]);

    // request
    // .post('/campus/campusweb/address/queryAddressForFourLinkage', {
    //     data
    // })
    // .then(function (res) {
    //   console.log(res);

    // })
  }

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    console.log(678, targetOption);

    setTimeout(() => {
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1',
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  // 以上是 地区选择部分，

  function onChangeTime(value, dateString) {
    console.log('开始时间', value, '结束时间 ', dateString);
  }

  function onOk(value) {
    console.log('onOk: ', value);
  }

  //   以上活动时间组件部分

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flow_one">
      <div className="innerFlowpath">
        <h3>请填写活动的基本信息</h3>
        <div className="active_box1">
          <Form
            name="basic"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row>
              <Col span={10}>
                <Form.Item
                  name="activityName"
                  label="活动名称"
                  rules={[
                    {
                      required: true,
                      message: '请输入活动名称!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="请输入活动名称" />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item
                  name="Code"
                  label="活动地区"
                  rules={[
                    {
                      required: true,
                      message: '请选择地区!',
                    },
                  ]}
                >
                  <Cascader
                    size="large"
                    options={options}
                    fieldNames={{
                      label: 'addressName',
                      value: 'addressCode',
                      children: 'items',
                    }}
                    loadData={loadData}
                    onChange={onChange}
                    expandTrigger="hover"
                    changeOnSelect
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="activitTime"
                  label="活动时间"
                  rules={[
                    {
                      required: true,
                      message: '请输入活动时间!',
                    },
                  ]}
                >
                  <Space direction="vertical" size="large">
                    <RangePicker
                      size="large"
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={onChangeTime}
                      onOk={onOk}
                    />
                  </Space>
                  ,
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item name="activitySite" label="活动地点">
                  <Input size="large" placeholder="请输入活动地点" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item name="activityOrganizers" label="活动主办方">
                  <Input size="large" placeholder="请输入活动主办方" />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item
                  name="activityContent"
                  label="活动内容"
                  rules={[
                    {
                      required: true,
                      message: '请输入活动内容!',
                    },
                  ]}
                >
                  <TextArea rows={3} placeholder="请输入活动内容！" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="pictureUrl"
                  label="活动图"
                  rules={[
                    {
                      required: true,
                      message: '请输入活动内容!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="请输入活动主办方" />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item
                  name="activityContent"
                  label="活动内容"
                  rules={[
                    {
                      required: true,
                      message: '请输入活动内容!',
                    },
                  ]}
                >
                  <TextArea rows={3} placeholder="请输入活动内容！" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Form.Item
                  name="pictureUrl"
                  label="活动图"
                  rules={[
                    {
                      required: true,
                      message: '请输入上传活动图!',
                    },
                  ]}
                >
                  <PicturesWall />
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item
                  name="pictureUrl"
                  label="活动图"
                  rules={[
                    {
                      required: true,
                      message: '请输入上传活动图!',
                    },
                  ]}
                >
                  <PicturesWall />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
      <div className="innerFlowpath">流程1</div>
    </div>
  );
}
