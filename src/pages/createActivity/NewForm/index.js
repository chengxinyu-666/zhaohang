import React, { Component, forwardRef, useImperativeHandle } from 'react';

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
  Spin,
} from 'antd';
import Table from '../Table';

import { CommonEnum } from '@/enums';
import moment from 'moment';
const { RangePicker } = DatePicker;
import request from 'umi-request';
import store from '@/store';
import localStorage from 'redux-persist/es/storage';

export default class Demo extends Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      loadding: false, //初始false，没拿到数据则不渲染下面表单
      page: CommonEnum.PAGE,
      actitem: '',
      searchCriteria: {
        activityName: '', //活动名字
        // activityStatus: props.actitem, //活动状态 1-待审核2-进行中3-未开始4-已驳回5，6-已结束
        queryStartDate: '', //开始时间
        queryEndDate: '', //结束时间
        isDraft: props.draft, //是否草稿1-是0-否
      },
      tabledate: [], //表单数据
    };
  }

  onFinish = (values) => {
    console.log('查看当前state数据', this.state);
    // this.formRef.current  是类组件的获取表单数据方法
    // if (!values.activename && !values.activetime) {
    //   message.info('请输入搜索内容');
    // } else {
    //   this.setState({
    //     ...this.state,
    //     searchCriteria:{
    //       ...this.state.searchCriteria,
    //       activityName: values.activename, //活动名字
    //       queryStartDate: moment(values.activetime[0]).format('YYYY-MM-DD'), //开始时间
    //       queryEndDate: moment(values.activetime[1]).format('YYYY-MM-DD'), //结束时间
    //     }
    //   })
    // }
  };

  myrest = () => {
    this.formRef.resetFields();
  };

  // 重置表单内容
  onReset = () => {
    // form.resetFields();

    this.setState({
      ...this.state,
      activityStatus: '',
      searchCriteria: {
        activityName: '', //活动名字
        // activityStatus: [], //活动状态 1-待审核2-进行中3-未开始4-已驳回5，6-已结束
        queryStartDate: '', //开始时间
        queryEndDate: '', //结束时间
        isDraft: props.draft, //是否草稿1-是0-否
      },
    });
  };

  // 这块是点击头部切换的时候，向父组件发送方法，用于切换后重置表单内容
  // useImperativeHandle(ref, () => ({
  //   getData,
  // }));
  // const getData = () => {
  //   form.resetFields();
  // };

  static getDerivedStateFromError(error) {
    return {};
  }

  componentDidCatch(error, errorInfo) {}

  componentDidMount() {
    this.getFormdata();
  }
  // 获取表单数据
  getFormdata = () => {
    //类组件里在componentDidMount生命周期找不到数据会导致浏览器进入死循环
    console.log('更新传参', this.state.actitem);
    let data = {
      ...this.state.page,
      activityStatus: [this.state.actitem],
      isDraft: false,
    };

    if (this.state.actitem == 0) {
      delete data.activityStatus;
    }
    if (this.state.actitem == 5) {
      data.isDraft = true;
      delete data.activityStatus;
    }
    request
      .post('/campus/campusweb/activity/pageConditionQueryByCreatorId', {
        data,
      })
      .then((res) => {
        console.log(222222, res);
        if (res.code == 200) {
          this.setState({
            ...this.state,
            tabledate: { ...res.data },
          });
          this.setState({
            ...this.state,
            loadding: true,
          });

          // 更新所有数据 放入仓库

          // store.dispatch(createTabledateAction([res.data]));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentWillUnmount() {}
  //这个周期弹出不安全报错
  // componentWillReceiveProps(nextProps) {
  //   const { actitem } = nextProps;
  //   if (actitem !== this.state.actitem) {
  //     return {
  //       actitem,
  //     };
  //   }
  //   console.log(77777777777, nextProps);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(3455, nextProps, nextState);
  //   return true;
  // }

  static getDerivedStateFromProps(props, state) {
    console.log('更新state的的数据', state);
    const { actitem } = props;
    if (props.actitem !== state.actitem) {
      return {
        actitem,
      };
    }

    // 否则，对于state不进行任何操作
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.actitem !== this.props.actitem) {
      this.getFormdata();
    }
  }

  render() {
    return (
      <div>
        {this.state.actitem}

        <div className="Tablefilter2">
          <Form
            ref={this.formRef}
            name="control-hooks"
            onFinish={this.onFinish}
          >
            <Row>
              <Col pan={6}>
                <Form.Item name="activename" label="活动名称">
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={10} offset={1}>
                <Form.Item name="activetime" label="创建时间">
                  <RangePicker style={{ width: 260 }} />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    搜索
                  </Button>
                  <Button
                    style={{ marginLeft: 10 }}
                    htmlType="button"
                    onClick={this.onReset}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        {this.state.loadding ? (
          <Table
            tabledate={this.state.tabledate}
            actitem={this.state.actitem}
          ></Table>
        ) : (
          <Spin />
        )}
      </div>
    );
  }
}
