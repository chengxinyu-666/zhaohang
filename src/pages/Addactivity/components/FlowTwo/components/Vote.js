/*
 * @Author: chengxinyu
 * @Date: 2021-12-01 16:18:27
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-06 17:56:51
 */
import React, { useState, useEffect, forwardRef } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Cascader,
  Space,
  Upload,
  Button,
} from 'antd';
import {
  DeleteOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import '../../../index.less';
import beforeUpload from '@/utils/beforeUpload';
import Myapi from '@/api';
const { RangePicker } = DatePicker;

const Vote = forwardRef((props, ref) => {
  const { actdata, setActdata, votedata, setVotedata, imgcont, setImgcont } =
    props;
  const [votnum, setVotnum] = useState(0);

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
      label: '每日均可投票',
    },
  ];
  function chosevoid(value) {
    setVotnum(value[0]);
    console.log(votnum);
  }

  //   上传图片部分

  function upPicfun(id, info) {
    console.log('图片上传', imgcont, info, id);
    if (id == 0 && info.file?.response?.code == 200) {
      setImgcont([
        {
          loading: false,
          pictureUrl: info.file.response.data.imgUrl,
          pictureKey: info.file.response.data.imgKey,
        },
      ]);
    } else if (id > 0 && info.file?.response?.code == 200) {
      setImgcont([
        ...imgcont,
        {
          loading: false,
          pictureUrl: info.file.response.data.imgUrl,
          pictureKey: info.file.response.data.imgKey,
        },
      ]);
      return;
    }
  }

  const uploadButton = (
    <div>
      {imgcont.Picloading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>添加图片</div>
    </div>
  );

  // 调用表单提交
  // const voteformfun = async () => {
  //   let voteformdata = await voteform.validateFields();
  //   voteformdata.startDate = moment(voteformdata.activitTime[0]).format(
  //     'YYYY-MM-DD HH:mm',
  //   );
  //   voteformdata.endDate = moment(voteformdata.activitTime[1]).format(
  //     'YYYY-MM-DD HH:mm',
  //   );
  //   voteformdata.voteWay = voteformdata.voteWay[0];

  //   let voteObjectVOS = voteformdata.picarr.map((item, idx) => {
  //     return {
  //       ...item,
  //       ...imgcont[idx],
  //     };
  //   });
  //   voteformdata.voteObjectVOS = voteObjectVOS;

  //   delete voteformdata.picarr;
  //   delete voteformdata.activitTime;
  //   console.log('basicformdata', voteformdata);
  //   setVotedata({
  //     ...votedata,
  //     ...voteformdata,
  //     dayVoteLimit: '9999999',
  //     singlePlayerLimit: '9999999',
  //   });

  //   setActdata({
  //     ...actdata,
  //     activityVOS: [{ ...votedata }],
  //   });
  // };

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  // 上传图片部分

  return (
    <div className="singup">
      <div className="singup_item">
        <Form
          form={props.voteFormdata}
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
                    <RangePicker
                      size="large"
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={onChangeTime}
                      onOk={onOk}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} offset={4}>
                  <Form.Item name="voteWay" label="投票方式">
                    <Cascader
                      options={options}
                      onChange={chosevoid}
                      placeholder="Please select"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {votnum != '1' ? (
                <>
                  <Row>
                    <Col span={10}>
                      <Form.Item
                        name="dayVoteLimit"
                        label="单日可投上限"
                        rules={[
                          {
                            required: true,
                            message: '请输入单日可投上限!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入1-9999999999的整数"></Input>
                      </Form.Item>
                    </Col>
                    <Col span={10} offset={4}>
                      <Form.Item
                        name="singlePlayerLimit"
                        label="重复投票上限"
                        rules={[
                          {
                            required: true,
                            message: '重复投票上限!',
                          },
                        ]}
                      >
                        <Input placeholder="请输入1-9999999999的整数"></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="form_item">
            <h1>投票对象</h1>
            <div className="item_botder1">
              <Form.List name="picarr">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div className="item_botder2" key={key}>
                        <Row>
                          <Col span={10}>
                            <Form.Item
                              label="名称"
                              {...restField}
                              name={[name, 'name']}
                              fieldKey={[fieldKey, 'name']}
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
                              label="说明"
                              {...restField}
                              name={[name, 'instructions']}
                              fieldKey={[fieldKey, 'instructions']}
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
                              // name="picture"
                              label="活动图"
                              valuePropName="pictureList"
                              getValueFromEvent={normFile}
                              fieldKey={[fieldKey, 'pic']}
                            >
                              <Upload
                                name="multipartFile"
                                listType="picture-card"
                                className="avatar-uploader"
                                action={Myapi.picupUrl}
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={upPicfun.bind(this, fieldKey)}
                              >
                                {imgcont[fieldKey]?.pictureUrl ? (
                                  <img
                                    src={imgcont[fieldKey].pictureUrl}
                                    alt="avatar"
                                    style={{ width: '100%' }}
                                  />
                                ) : (
                                  uploadButton
                                )}
                              </Upload>
                              <p>
                                <ExclamationCircleOutlined
                                  style={{ color: '#ffb659' }}
                                />
                                推荐尺寸:1035*261
                              </p>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
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
              </Form.List>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});

export default Vote;
