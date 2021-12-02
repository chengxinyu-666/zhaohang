import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Space,
  Row,
  Col,
  message,
} from 'antd';
import Table from '../Table';
import { useHttpHook } from '@/hooks';
import { CommonEnum } from '@/enums';
import moment from 'moment';
const { RangePicker } = DatePicker;

const NewForm = forwardRef(({ actitemStatus, activityStatus, draft }, ref) => {
  const [page, setPage] = useState(CommonEnum.PAGE);

  const [searchCriteria, setSearchCriteria] = useState({
    activityName: '', //活动名字
    activityStatus: activityStatus, //活动状态 1-待审核2-进行中3-未开始4-已驳回5，6-已结束
    queryStartDate: '', //开始时间
    queryEndDate: '', //结束时间
    isDraft: draft, //是否草稿1-是0-否
  });
  const [queryEndDate, setQueryEndDate] = useState('');
  const [actitem, setActitem] = useState(actitemStatus);
  const [form] = Form.useForm();

  const [tabledate] = useHttpHook({
    url: '/activity/pageConditionQueryByCreatorId',
    body: {
      ...page,
      ...searchCriteria,
      activityStatus,
      isDraft: draft,
    },
    watch: [page.pageNum, activityStatus, searchCriteria, draft],
  });

  console.log('总tabledate', tabledate);
  const onFinish = (values) => {
    console.log('搜索', values);
    if (!values.activename && !values.activetime) {
      message.info('请输入搜索内容');
    } else {
      setSearchCriteria({
        activityName: values.activename,
        queryStartDate: moment(values.activetime[0]).format('YYYY-MM-DD'),
        queryEndDate: moment(values.activetime[1]).format('YYYY-MM-DD'),
      });
    }
  };

  const onReset = () => {
    form.resetFields();
    setSearchCriteria({
      activityName: '', //活动名字
      activityStatus: [], //活动状态 1-待审核2-进行中3-未开始4-已驳回5，6-已结束
      queryStartDate: '', //开始时间
      queryEndDate: '', //结束时间
      isDraft: draft, //是否草稿1-是0-否
    });
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));
  const getData = () => {
    form.resetFields();
  };

  // const aaa = async () => {
  //     let formdata = await form.validateFields()
  //     console.log("aaa", formdata);
  // }

  return (
    <div>
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
                <RangePicker style={{ width: 260 }} />
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
        {/* <Button type="primary" htmlType="submit" onClick={aaa}>
                    搜索11
                </Button> */}
      </div>
      <Table tabledate={tabledate} actitem={actitem}></Table>
    </div>
  );
});

export default NewForm;
