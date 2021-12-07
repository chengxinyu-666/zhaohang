/*
 * @Author: chengxinyu
 * @Date: 2021-12-01 16:18:27
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-07 18:28:48
 */
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Form, Input, Row, Col, DatePicker, Space, Tag, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

import '../../../index.less';
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
const tagsData = [
  '姓名',
  '性别',
  '图片',
  '手机号',
  '生日',
  'QQ号',
  '邮箱',
  '学院',
  '年纪',
  '班级',
  '学号',
  '特长',
  '备注',
];
const SignUp = forwardRef((props, ref) => {
  const [basicform] = Form.useForm(); //第一个基本活动的表单,日程规划表单
  const [selectedTags, setSelectedTags] = useState([]); //存放选中的参与者

  const { actdata, setActdata, signdata, setSigndata } = props;

  const basicInfoFun = (value) => {
    console.log('基本信息时间', value);
  };
  const basicInfoErr = (err) => {
    console.log('基本信息错误', err);
  };
  function onChangeTime(value, dateString) {
    console.log('开始时间', value, '结束时间 ', dateString);
  }

  // 切换选项
  const handleChange = (tag, checked) => {
    if (checked) {
      setSelectedTags([
        ...selectedTags,
        {
          key: tag,
          value: '',
        },
      ]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t.key !== tag));
    }
    setSigndata({
      ...signdata,
      requiredEntryForms: selectedTags,
    });
  };

  return (
    <div className="singup">
      <div className="singup_item">
        <Form
          form={props.SignupForm}
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
                    />
                  </Form.Item>
                </Col>
                <Col span={10} offset={4}>
                  <Form.Item name="numberLimit" label="报名人数">
                    <Input size="large" placeholder="不填即无限制" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
          <div className="form_item">
            <h1>选择您希望活动参加者填写的信息</h1>
            <div className="item_botder">
              <Form.Item>
                {tagsData.map((tag) => (
                  <CheckableTag
                    style={{
                      display: 'inline-block',
                      border: '1px solid #6f6f6f',
                      padding: '5px 15px',
                      borderRadius: '5px',
                      margin: '0 20px 10px 0',
                    }}
                    key={tag}
                    checked={selectedTags.some((item) => {
                      if (item.key == tag) {
                        return true;
                      }
                    })}
                    onChange={(checked) => handleChange(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
              </Form.Item>
            </div>
          </div>
          <div className="form_item">
            <h1>可添加项目补充</h1>
            <div className="item_botder">
              <Form.List name="optionalEntryFormsdata">
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
                          name={[name, 'key']}
                          fieldKey={[fieldKey, 'key']}
                          rules={[
                            {
                              required: true,
                              message: '可添加项目补充!',
                            },
                          ]}
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
              </Form.List>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
});

export default SignUp;
