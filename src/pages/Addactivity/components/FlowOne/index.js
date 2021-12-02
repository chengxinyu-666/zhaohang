/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:41:59
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-02 13:52:59
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
  message,
} from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useHttpHook } from '@/hooks';
import request from 'umi-request';
import getBase64 from '@/utils/getBase64';
import beforeUpload from '@/utils/beforeUpload';

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
      ...cityparameter,
    },
  });

  // 创建活动参数
  const [actdata, setActdata] = useState({
    activityName: '', //String	是	活动名称
    activityContent: '', //String	否	活动内容
    activitySite: '', //	String	否	活动地点
    activityOrganizers: '', //String	否	活动主办方
    startDate: '', //Date	是	活动开始时间（2021-7-15 14:00）
    endDate: '', //	Date	是	活动结束时间（2021-7-15 14:00）
    pictureKey: '', //	String	是	活动图片key
    thumbnailPictureUrl: '', //	String	是	缩略图Url
    provinceCode: '', //	String	是	省编码
    cityCode: '', //	String	是	市编码
    isSignUp: '', //	Bit	是	是否有报名活动 1-是0-否
    isRobTickets: '', //	Bit	是	是否有抢票活动 1-是0-否
    isSignIn: '', //	Bit	是	是否有签到活动 1-是0-否
    isVote: '', //	Bit	是	是否有投票活动 1-是0-否
    isLuckyDraw: '', //	Bit	是	是否有抽奖活动 1-是0-否
    schedules: {}, //	List<Object>	否	日程对象集合
    activitys: {}, //	List<Object>	是	活动对象集合报名、投票、抢票、签到、抽奖
  });

  const optionLists = [
    {
      id: '123',
      label: 'addressName',
      value: 'addressCode',
      isLeaf: false,
    },
    {
      id: '543',
      label: 'addressName',
      value: 'addressCode',
      isLeaf: false,
    },
  ];

  const [options, setOptions] = React.useState(optionLists);

  console.log('外层城市数据', rawData, options);

  const onChange3 = (value, selectedOptions) => {
    console.log(1, value, selectedOptions);
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // console.log('targetOption', targetOption);
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          id: 'id1',
          label: 'addressName',
          value: 'addressCode',
        },
        {
          id: 'id2',
          label: 'addressName',
          value: 'addressCode',
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

  //   图片上传参数
  const [imgcont, setImgcont] = useState({
    Picloading: false,
    pictureKey: '',
    pictureUrl: '',
    thumbnailPictureload: false,
    thumbnailPictureUrl: '',
    thumbnailPictureKey: '',
  });

  function upPicfun(id, info) {
    console.log('图片上传', id, info);
    if (info.file?.response?.code == 200 && id == 1) {
      setImgcont({
        Picloading: false,
        pictureUrl: info.file.response.data.imgUrl,
        pictureKey: info.file.response.data.imgKey,
      });
      return;
    } else if (info.file?.response?.code == 200 && id == 2) {
      setImgcont({
        thumbnailPictureload: false,
        thumbnailPictureUrl: info.file.response.data.imgUrl,
        thumbnailPictureKey: info.file.response.data.imgKey,
      });
      return;
    }
  }

  const uploadButton1 = (
    <div>
      {imgcont.Picloading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );
  const uploadButton2 = (
    <div>
      {imgcont.thumbnailPictureload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );
  // 上传图片部分

  // 基本活动信息表单
  const essentialInfoFun = (values) => {
    console.log('Success:', values);
  };

  const essentialInfoFunErr = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 编辑活动日程规划
  function addDaily(value, dateString) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }

  function onOkDaily(value) {
    console.log('onOk: ', value);
  }
  const addActiveFun = (values) => {
    console.log('Received values of form:', values);
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
            onFinish={essentialInfoFun}
            onFinishFailed={essentialInfoFunErr}
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
                  // name="Code"
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
                      id: 'id',
                      label: 'addressName',
                      value: 'addressCode',
                      children: 'items',
                    }}
                    loadData={loadData}
                    onChange={onChange3}
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

            {/* 下面是上传图片部分 */}
            <Row>
              <Col span={10}>
                <Form.Item
                  name="picture"
                  label="活动图"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: '请输入上传活动图!',
                  //     },
                  // ]}
                >
                  <Upload
                    name="multipartFile"
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/campus/campusweb/upload/pictureUpload"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={upPicfun.bind(this, 1)}
                  >
                    {imgcont.pictureUrl ? (
                      <img
                        src={imgcont.pictureUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton1
                    )}
                  </Upload>
                  <p>
                    {' '}
                    <ExclamationCircleOutlined style={{ color: '#ffb659' }} />
                    推荐尺寸:1035*261
                  </p>
                </Form.Item>
              </Col>
              <Col span={10} offset={4}>
                <Form.Item
                  name="pictureUrl"
                  label="活动缩略图"
                  // rules={[
                  //     {
                  //         required: true,
                  //         message: '请输入上传活动图!',
                  //     },
                  // ]}
                >
                  <Upload
                    name="multipartFile"
                    listType="picture-card"
                    className="avatar-uploader"
                    action="/campus/campusweb/upload/pictureUpload"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={upPicfun.bind(this, 2)}
                  >
                    {imgcont.thumbnailPictureUrl ? (
                      <img
                        src={imgcont.thumbnailPictureUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton2
                    )}
                  </Upload>
                  <p>
                    <ExclamationCircleOutlined style={{ color: '#ffb659' }} />
                    推荐尺寸:168*216
                  </p>
                </Form.Item>
              </Col>
            </Row>

            {/* <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
          </Form>
        </div>
        <h3>
          请编辑活动日程规划<span>(可添加多条)</span>
        </h3>
        <div className="active_box2">
          <Form
            name="dynamic_form_nest_item"
            onFinish={addActiveFun}
            autoComplete="off"
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Form.List name="users">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'first']}
                        fieldKey={[fieldKey, 'first']}
                      >
                        <Input size="large" placeholder="请输入日程名称" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'last']}
                        fieldKey={[fieldKey, 'last']}
                      >
                        <DatePicker
                          size="large"
                          placeholder="请选择日程时间"
                          showTime
                          onChange={addDaily}
                          onOk={onOkDaily}
                        />
                      </Form.Item>

                      <DeleteOutlined
                        style={{ color: '#df4833' }}
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      style={{
                        width: '50%',
                      }}
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}
          </Form>
        </div>
      </div>
    </div>
  );
}
