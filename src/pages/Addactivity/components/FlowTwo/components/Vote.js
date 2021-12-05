/*
 * @Author: chengxinyu
 * @Date: 2021-12-01 16:18:27
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-06 01:15:19
 */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
import request from 'umi-request';
import beforeUpload from '@/utils/beforeUpload';
const { RangePicker } = DatePicker;

const Vote = forwardRef((props, ref) => {
  const [voteform] = Form.useForm(); //投票表单
  const [votedata, setVotedata] = useState({
    activityType: 2,
  });
  const { actdata, setActdata } = props;
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
  const [imgcont, setImgcont] = useState([
    {
      loading: false,
      pictureKey: '',
      pictureUrl: '',
    },
  ]);

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

  useImperativeHandle(ref, () => ({
    voteformfun,
  }));

  // 调用表单提交
  const voteformfun = async () => {
    let voteformdata = await voteform.validateFields();
    voteformdata.startDate = moment(voteformdata.activitTime[0]).format(
      'YYYY-MM-DD HH:mm',
    );
    voteformdata.endDate = moment(voteformdata.activitTime[1]).format(
      'YYYY-MM-DD HH:mm',
    );
    voteformdata.voteWay = voteformdata.voteWay[0];

    let voteObjectVOS = voteformdata.picarr.map((item, idx) => {
      return {
        ...item,
        ...imgcont[idx],
      };
    });
    voteformdata.voteObjectVOS = voteObjectVOS;

    delete voteformdata.picarr;
    delete voteformdata.activitTime;
    console.log('basicformdata', voteformdata);
    setVotedata({
      ...votedata,
      ...voteformdata,
      dayVoteLimit: '9999999',
      singlePlayerLimit: '9999999',
    });

    setActdata({
      ...actdata,
      activityVOS: [{ ...votedata }],
    });
  };

  // 上传图片部分

  return (
    <div className="singup">
      <div className="singup_item">
        <Button onClick={voteformfun}> 55</Button>
        <Form
          form={voteform}
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
                              fieldKey={[fieldKey, 'pic']}
                            >
                              <Upload
                                name="multipartFile"
                                listType="picture-card"
                                className="avatar-uploader"
                                action="/campus/campusweb/upload/pictureUpload"
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
