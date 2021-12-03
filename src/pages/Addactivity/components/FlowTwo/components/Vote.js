/*
 * @Author: chengxinyu
 * @Date: 2021-12-01 16:18:27
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-03 15:19:03
 */
import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Cascader,
  Space,
  Upload,
} from 'antd';
import {
  DownOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../../index.less';
import beforeUpload from '@/utils/beforeUpload';
const { RangePicker } = DatePicker;

export default function (props) {
  const [state, setState] = useState();

  const basicInfoFun = (value) => {
    console.log('基本信息时间', value);
  };
  const basicInfoErr = (err) => {
    console.log('基本信息错误', err);
  };
  function onChangeTime(value, dateString) {
    console.log('开始时间', value, '结束时间 ', dateString);
  }
  function onOk(value) {
    console.log('onOk: ', value);
  }
  const options = [
    {
      value: '1',
      label: '只可投一次',
    },
    {
      value: '2',
      label: '可投2次',
    },
    {
      value: '3',
      label: '可投3次',
    },
  ];
  function chosevoid(value) {
    console.log(value);
  }

  //   上传图片部分

  //   图片上传参数
  const [imgcont, setImgcont] = useState({
    loading: false,
    pictureKey: '',
    pictureUrl: '',
  });

  function upPicfun(info) {
    console.log('图片上传', info);
    if (info.file?.response?.code == 200) {
      setImgcont({
        loading: false,
        pictureUrl: info.file.response.data.imgUrl,
        pictureKey: info.file.response.data.imgKey,
      });
      return;
    }
  }

  const uploadButton = (
    <div>
      {imgcont.Picloading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );

  // 上传图片部分

  return (
    <div className="singup">
      <div className="singup_item">
        <Form
          name="basicInfo"
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
          onFinish={basicInfoFun}
          onFinishFailed={basicInfoErr}
          autoComplete="off"
        >
          <div className="form_item">
            <h1>基本信息</h1>
            <div className="item_botder">
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
                  <Form.Item name="numberLimit" label="投票方式">
                    <Cascader
                      options={options}
                      onChange={chosevoid}
                      placeholder="Please select"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <div className="form_item">
            <h1>投票对象</h1>
            <div className="item_botder">
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
                        <Input
                          size="large"
                          placeholder="请输入项目名称,如爱好"
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
                        width: '25%',
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

              <Row>
                <Col span={10}>
                  <Form.Item
                    name="name"
                    label="活动时间"
                    rules={[
                      {
                        required: true,
                        message: '请输入投票对象的名称!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入投票对象的名称"></Input>
                  </Form.Item>
                </Col>

                <Col span={10} offset={4}>
                  <Form.Item
                    name="instructions"
                    label="说明"
                    rules={[
                      {
                        required: true,
                        message: '请输入投票对象的说明!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入投票对象的说明"></Input>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <Form.Item
                    label="图片"
                    rules={[
                      {
                        required: true,
                        message: '请输入上传图片!',
                      },
                    ]}
                  >
                    <Upload
                      name="multipartFile"
                      listType="picture-card"
                      className="avatar-uploader"
                      action="/campus/campusweb/upload/pictureUpload"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={upPicfun}
                    >
                      {imgcont.pictureUrl ? (
                        <img
                          src={imgcont.pictureUrl}
                          alt="avatar"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                    <p>
                      <ExclamationCircleOutlined />
                      支持扩展名:jpg,jpeg,png
                    </p>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
