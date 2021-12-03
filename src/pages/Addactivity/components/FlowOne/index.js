/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:41:59
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-03 15:51:14
 */

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Cascader,
  DatePicker,
  Space,
  Upload,
} from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useHttpHook } from '@/hooks';
import getBase64 from '@/utils/getBase64';
import beforeUpload from '@/utils/beforeUpload';
import request from 'umi-request';
import moment from 'moment';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function (props) {
  const { actdata, setActdata } = props;
  const [basicform] = Form.useForm(); //第一个基本活动的表单,日程规划表单

  // 调用表单提交
  const basicformFun = async () => {
    let basicformdata = await basicform.validateFields();

    if (basicformdata.scheduleVOS) {
      let newArr = [];
      basicformdata.scheduleVOS.forEach((item) => {
        newArr.push({
          scheduleName: item.scheduleName,
          scheduleDate: moment(item.scheduleDate).format('YYYY-MM-DD HH:mm'),
        });
      });
      basicformdata.scheduleVOS = newArr;
    }

    basicformdata.startDate = moment(basicformdata.huodongshijian[0]).format(
      'YYYY-MM-DD HH:mm',
    );
    basicformdata.endDate = moment(basicformdata.huodongshijian[1]).format(
      'YYYY-MM-DD HH:mm',
    );

    delete basicformdata.huodongshijian,
      setActdata({
        ...actdata,
        ...basicformdata,
      });
    console.log('aaa', basicformdata);
  };

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const [options, setOptions] = useState([]);

  useEffect(() => {
    let data = {
      addressLevel: '1',
    };
    request
      .post('/campus/campusweb/address/queryAddressForFourLinkage', {
        data,
      })
      .then(function (res) {
        console.log(res);
        let a = res.data.map((v) => {
          return { ...v, isLeaf: false };
        });
        setOptions(a);
      });
  }, []);

  const onChange3 = (value, selectedOptions) => {
    console.log(1, value.length);
    if (value.length == 2) {
      setActdata({
        ...actdata,
        provinceCode: value[0],
        cityCode: value[1],
      });
    }
  };

  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let data = {
      addressLevel: '2',
      parentId: targetOption.addressCode,
    };
    request
      .post('/campus/campusweb/address/queryAddressForFourLinkage', {
        data,
      })
      .then(function (res) {
        targetOption.loading = false;
        targetOption.fieldNames = [
          {
            id: 'id',
            label: 'addressName',
            value: 'addressCode',
          },
        ];
        targetOption.children = [...res.data];
        setOptions([...options]);
      });
  };

  // 以上是 地区选择部分，

  function onChangeTime(value, dateString) {
    console.log('开始时间', dateString);
    // setActdata({
    //   ...actdata,
    //   startDate: dateString[0],
    //   endDate: dateString[1],
    // });
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
      setActdata({
        ...actdata,
        pictureKey: info.file.response.data.imgUrl,
        pictureKey: info.file.response.data.imgKey,
      });
      setImgcont({
        Picloading: false,
        pictureUrl: info.file.response.data.imgUrl,
        pictureKey: info.file.response.data.imgKey,
      });
      return;
    } else if (info.file?.response?.code == 200 && id == 2) {
      setActdata({
        ...actdata,
        thumbnailPictureUrl: info.file.response.data.imgUrl,
        thumbnailPictureKey: info.file.response.data.imgKey,
      });
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
    console.log('时间 ', dateString);
  }

  return (
    <div className="flow_one">
      <>
        <div className="innerFlowpath">
          <Button onClick={basicformFun}> 12</Button>
          <h3>请填写活动的基本信息</h3>
          <div className="active_box1">
            <Form
              form={basicform}
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
                      options={options}
                      fieldNames={{
                        label: 'addressName',
                        value: 'addressCode',
                        children: 'children',
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
                    name="huodongshijian"
                    label="活动时间"
                    rules={[
                      {
                        required: true,
                        message: '请输入活动时间!',
                      },
                    ]}
                  >
                    {/* <Space direction="vertical" size="large"> */}
                    <RangePicker
                      size="large"
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      showTime
                      onChange={onChangeTime}
                    />
                    {/* </Space> */}
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
                    // name="picture"
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
                    // name="pictureUrl"
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
              <Row>
                <Col span={10}>
                  <h3>
                    请编辑活动日程规划<span>(可添加多条)</span>
                  </h3>
                  <Form.Item
                    // name="picture"
                    label="日程名称"
                  >
                    <Form.List name="scheduleVOS">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
                              <Space
                                key={key}
                                style={{ display: 'flex', marginBottom: 8 }}
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'scheduleName']}
                                  fieldKey={[fieldKey, 'scheduleName']}
                                >
                                  <Input
                                    size="large"
                                    placeholder="请输入日程名称"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'scheduleDate']}
                                  fieldKey={[fieldKey, 'scheduleDate']}
                                >
                                  <DatePicker
                                    size="large"
                                    placeholder="请选择日程时间"
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    showTime
                                    onChange={addDaily}
                                  />
                                </Form.Item>

                                <DeleteOutlined
                                  style={{ color: '#df4833' }}
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            ),
                          )}
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
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </>
    </div>
  );
}
