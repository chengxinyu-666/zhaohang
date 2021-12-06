/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-06 18:25:49
 */
import React, { useState, useEffect, useRef } from 'react';
import FlowOne from './components/FlowOne/index';
import FlowTwo from './components/FlowTwo/index';
import Flowpath from './components/Flowpath/index';
import { message, Button, Form } from 'antd';
import moment from 'moment';
import './index.less';
import request from 'umi-request';
import { useForm } from 'antd/lib/form/Form';
export default function (props) {
  const [speed, setSpeed] = useState(1);
  // 创建活动参数
  const [actdata, setActdata] = useState({
    activityName: '', //String	是	活动名称
    activityContent: '', //String	否	活动内容
    activitySite: '', //	String	否	活动地点
    activityOrganizers: '', //String	否	活动主办方
    startDate: '', //Date	是	活动开始时间（2021-7-15 14:00）
    endDate: '', //	Date	是	活动结束时间（2021-7-15 14:00）
    pictureKey: '', //	String	是	活动图片key
    pictureUrl: '', //String	是	活动图片Url
    thumbnailPictureUrl: '', //	String	是	缩略图Url
    thumbnailPictureKey: '', //String	是	缩略图key
    provinceCode: '', //	String	是	省编码
    cityCode: '', //	String	是	市编码
    isSignUp: false, //	Bit	是	是否有报名活动
    isRobTickets: false, //	Bit	是	是否有抢票活动
    isSignIn: false, //	Bit	是	是否有签到活动
    isVote: false, //	Bit	是	是否有投票活动
    isLuckyDraw: false, //	Bit	是	是否有抽奖活动
    scheduleVOS: [], //	List<Object>	否	日程对象集合
    activityVOS: [], //	List<Object>	是	活动对象集合报名、投票、抢票、签到、抽奖
  });

  const cRef = useRef(null);

  const [baseForm] = Form.useForm(); //第一个步骤表单数据
  const [SignupForm] = Form.useForm(); //第二个步骤报名表单数据
  const [voteFormdata] = Form.useForm(); //投票表单数据

  const [signdata, setSigndata] = useState({
    //报名总数居
    activityType: 1,
  });

  const [votedata, setVotedata] = useState({
    //投票总数据
    activityType: 2,
    voteObjectVOS: [],
  });

  //   投票  图片上传参数
  const [imgcont, setImgcont] = useState([
    {
      loading: false,
      pictureKey: '',
      pictureUrl: '',
    },
  ]);

  useEffect(() => {}, []);

  const nextSpeed = () => {
    speed == 1 ? setSpeed(2) : setSpeed(1);
    form1datapush();
  };
  // 整理表单1的数据
  function form1datapush() {
    let dataFormbase = baseForm.getFieldsValue();
    delete dataFormbase.huodongshijian;
    if (dataFormbase.scheduleVOS) {
      let newArr = [];
      dataFormbase.scheduleVOS.forEach((item) => {
        newArr.push({
          scheduleName: item.scheduleName,
          scheduleDate: moment(item.scheduleDate).format('YYYY-MM-DD HH:mm'),
        });
      });
      dataFormbase.scheduleVOS = newArr;
    }
    setActdata({
      ...actdata,
      ...dataFormbase,
    });
  }

  // 整理表单2(报名)的数据
  function form1datapus2push() {
    let dataFormsign = SignupForm.getFieldsValue();
    if (dataFormsign.activitTime) {
      dataFormsign.startDate = moment(dataFormsign.activitTime[0]).format(
        'YYYY-MM-DD HH:mm',
      );
      dataFormsign.endDate = moment(dataFormsign.activitTime[1]).format(
        'YYYY-MM-DD HH:mm',
      );
      delete dataFormsign.activitTime;
    }
    if (dataFormsign.optionalEntryFormsdata) {
      let optionalEntryForms = [];
      dataFormsign.optionalEntryFormsdata.forEach((item) => {
        optionalEntryForms.push({
          key: item.key,
          value: '',
        });
      });
      dataFormsign.optionalEntryForms = optionalEntryForms;
      delete dataFormsign.optionalEntryFormsdata;
    }
    setActdata({
      ...actdata,
      activityVOS: [
        {
          ...signdata,
          ...dataFormsign,
        },
      ],
    });
  }
  //整理表单3(投票)的数据
  function form1datapus3push() {
    let dataFormvote = voteFormdata.getFieldsValue();
    if (dataFormvote.voteWay) {
      dataFormvote.voteWay = dataFormvote.voteWay[0];
      if (dataFormvote.activitTime) {
        dataFormvote.startDate = moment(dataFormvote.activitTime[0]).format(
          'YYYY-MM-DD HH:mm',
        );
        dataFormvote.endDate = moment(dataFormvote.activitTime[1]).format(
          'YYYY-MM-DD HH:mm',
        );
        delete dataFormvote.activitTime;
      }
      if (dataFormvote.picarr.length == imgcont.length) {
        let voteObjectVOS = dataFormvote.picarr.map((item, index) => {
          return { ...item, ...imgcont[index] };
        });
        dataFormvote.voteObjectVOS = voteObjectVOS;
        delete dataFormvote.lastItem;
        delete dataFormvote.picarr;
      }
      setActdata({
        ...actdata,
        activityVOS: [
          {
            ...signdata,
            ...dataFormvote,
          },
        ],
      });
    }

    console.log('voteFormdata', dataFormvote);
  }

  const saveDraft = () => {
    //  form1datapush()
    form1datapush();
    form1datapus2push();
    form1datapus3push();

    // console.log('SignupForm',dataFormsign);
    // console.log('voteFormdata',dataFormvote);

    let data = actdata;
    console.log(2, data);
    request
      .post('/campus/campusweb/activity/saveDrafts', {
        data,
      })
      .then(function (res) {
        console.log(res);
        if (res.code == 601) {
          message.error(res.message);
        } else if (res.code == 200) {
          message.success(res.message);
        }
      });
  };

  const guancha = async () => {
    console.log('全部总数据', actdata);
  };

  return (
    <div className="wrap">
      <div className="flow_head">
        <Flowpath speed={speed}></Flowpath>
      </div>
      <div className="flow_content">
        {speed == 1 ? (
          <FlowOne
            ref={cRef}
            actdata={actdata}
            baseForm={baseForm}
            setActdata={setActdata}
          ></FlowOne>
        ) : (
          <FlowTwo
            ref={cRef}
            SignupForm={SignupForm}
            voteFormdata={voteFormdata}
            actdata={actdata}
            setActdata={setActdata}
            signdata={signdata}
            setSigndata={setSigndata}
            votedata={votedata}
            setVotedata={setVotedata}
            imgcont={imgcont}
            setImgcont={setImgcont}
          ></FlowTwo>
        )}

        <div className="flow_tab">
          {speed == 1 ? (
            <>
              {' '}
              <Button type="primary" onClick={nextSpeed}>
                下一步
              </Button>
            </>
          ) : (
            <>
              {' '}
              <Button type="primary">发布</Button>
              <Button onClick={nextSpeed}>上一步</Button>
            </>
          )}
          <Button>预览</Button>
          <Button onClick={saveDraft}>保存草稿</Button>
          <Button onClick={guancha}>观察数据</Button>
        </div>
      </div>
    </div>
  );
}
