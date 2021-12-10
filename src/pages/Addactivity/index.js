/*
 * @Author: chengxinyu
 * @Date: 2021-11-29 17:32:50
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-10 17:12:36
 */
import React, { useState, useEffect, useRef } from 'react';
import FlowOne from './components/FlowOne/index';
import FlowTwo from './components/FlowTwo/index';
import Flowpath from './components/Flowpath/index';
import { message, Button, Form } from 'antd';
import moment from 'moment';
import './index.less';
import request from 'umi-request';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'umi';
import { flushSync } from 'react-dom';
export default function (props) {
  const location = useLocation();

  let activityBasicId = 0; //地址数据
  const [speed, setSpeed] = useState(1);

  const dispatch = useDispatch();
  const cRef = useRef(null);
  const [baseForm] = Form.useForm(); //第一个步骤表单数据
  const [SignupForm] = Form.useForm(); //第二个步骤报名表单数据
  const [voteFormdata] = Form.useForm(); //投票表单数据
  const [selectedItems, setSelectedItems] = useState([]); //存放第二页几个模块的显示隐藏
  const [selectedTags, setSelectedTags] = useState([]); //存放第二页投票选中的参与者
  const [imgcont, setImgcont] = useState([
    //   投票  图片上传参数
    {
      loading: false,
      pictureKey: '',
      pictureUrl: '',
    },
  ]);
  // 仓库数据
  const backfill = useSelector((state) => {
    return state.backfill;
  });

  console.log('仓库数据', backfill);

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

  // 数据回填部分
  useEffect(() => {
    if (location.query.activityBasicId == backfill.activityBasicId) {
      setActdata({ ...backfill });
      // 拿到的所有返回的数据
      const {
        activityName,
        activityContent,
        activitySite,
        activityOrganizers,
        startDate,
        endDate,
        pictureKey,
        pictureUrl,
        thumbnailPictureKey,
        thumbnailPictureUrl,
        provinceCode,
        cityCode,
        bankCode,
        scheduleVOS,
        isSignUp,
        isVote,
        isRobTickets,
        isSignIn,
        isLuckyDraw,
        activityVOS, //活动数据
      } = { ...backfill };
      // 表单一（创建活动）的数据回显
      let newSharr = scheduleVOS?.map((item) => {
        return {
          scheduleName: item.scheduleName,
          scheduleDate: moment(item.scheduleDate),
        };
      });
      // 判断创建了哪些活动
      let twoArr = [];
      isSignUp ? twoArr.push('报名') : null;
      isVote ? twoArr.push('投票') : null;
      isRobTickets ? twoArr.push('门票') : null;
      isSignIn ? twoArr.push('签到') : null;
      isLuckyDraw ? twoArr.push('抽奖') : null;
      setSelectedItems([...twoArr]);
      //报名表单回显
      baseForm.setFieldsValue({
        huodongshijian: [moment(startDate), moment(endDate)],
        Code: [provinceCode, cityCode],
        activityName,
        activityContent,
        activitySite,
        activityOrganizers,
        startDate,
        endDate,
        pictureKey,
        pictureUrl,
        thumbnailPictureKey,
        thumbnailPictureUrl,
        provinceCode,
        scheduleVOS: [...newSharr],
      });
      //activityVOS
      // 报名和投票表单回显
      console.log('activityVOS', activityVOS);
      if (activityVOS.some((item) => item.activityType == 1)) {
        //activityVOS.find(item=>item.activityType==1)是找到对应的投票表单数据
        // console.log(555555,activityVOS.find(item=>item.activityType==1));
        const {
          startDate,
          endDate,
          numberLimit,
          requiredEntryForms,
          optionalEntryForms,
        } = activityVOS.find((item) => item.activityType == 1);

        let keadd = optionalEntryForms.map((item) => {
          return {
            key: item.key,
          };
        });
        let otherArr = requiredEntryForms.map((item) => {
          return {
            key: item.key,
            value: '',
          };
        });
        setSelectedTags([...otherArr]);

        SignupForm.setFieldsValue({
          activitTime: [moment(startDate), moment(endDate)],
          numberLimit,
          optionalEntryFormsdata: keadd,
        });
      }
      // 投票表单数据回显
      if (activityVOS.some((item) => item.activityType == 2)) {
        console.log(
          555555,
          activityVOS.find((item) => item.activityType == 2),
        );
        const {
          startDate,
          endDate,
          voteWay,
          dayVoteLimit,
          singlePlayerLimit,
          voteObjectVOS,
        } = activityVOS.find((item) => item.activityType == 2);

        let picarr = voteObjectVOS.map((item) => {
          //picarr这个是投票对象的文字数据
          return {
            name: item.name,
            instructions: item.instructions,
          };
        });
        let imgarr = voteObjectVOS.map((item) => {
          //imgarr这个是投票对象的图片数据
          return {
            pictureKey: item.pictureKey,
            pictureUrl: item.pictureUrl,
          };
        });
        console.log(44444, imgarr);
        setImgcont(imgarr);

        voteFormdata.setFieldsValue({
          activitTime: [moment(startDate), moment(endDate)],
          voteWay: [voteWay],
          dayVoteLimit,
          singlePlayerLimit,
          picarr: [...picarr],
        });
      }
    }
  }, []);

  //报名表单提交的参数
  const [signdata, setSigndata] = useState({
    //报名总数居
    activityType: 1,
  });

  const [votedata, setVotedata] = useState({
    //投票总数据
    activityType: 2,
    voteObjectVOS: [],
  });

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
    // 整理时间
    if (dataFormsign.activitTime) {
      dataFormsign.startDate = moment(dataFormsign.activitTime[0]).format(
        'YYYY-MM-DD HH:mm',
      );
      dataFormsign.endDate = moment(dataFormsign.activitTime[1]).format(
        'YYYY-MM-DD HH:mm',
      );
      delete dataFormsign.activitTime;
    }
    //可添加项目补充整理
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

    // 保存第二个页面的投票表单活动，整理数据
    let arr = actdata.activityVOS;
    if (arr.length != 0 && arr.some((item) => item.activityType == '1')) {
      let idx = arr.findIndex((item) => item.activityType == '1');
      arr[idx] = {
        ...signdata,
        ...dataFormsign,
      };
    } else {
      arr.push({
        ...signdata,
        ...dataFormsign,
      });
    }
    setActdata({
      ...actdata,
      activityVOS: [...arr],
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

      let arr = actdata.activityVOS;
      if (arr.length != 0 && arr.some((item) => item.activityType == '2')) {
        let idx = arr.findIndex((item) => item.activityType == '2');
        arr[idx] = {
          ...votedata,
          ...dataFormvote,
        };
      } else {
        arr.push({
          ...votedata,
          ...dataFormvote,
        });
      }

      setActdata({
        ...actdata,
        activityVOS: [...arr],
      });
    }

    console.log('voteFormdata', dataFormvote);
  }

  // 保存草稿
  const saveDraft = () => {
    form1datapush();
    form1datapus2push();
    form1datapus3push();
    // 如果是编辑状态
    let data = actdata;

    if (location.query.activityBasicId == backfill.activityBasicId) {
      data.activityBasicId = location.query.activityBasicId;
      delete data.id;
      delete data.provinceName;
      delete data.cityName;
      delete data.bankCode;
      delete data.pv;
      delete data.shareNum;
      delete data.activityStatus;
      delete data.isDraft;
      delete data.isDelete;
      delete data.creator;
      delete data.creatorId;
      delete data.gmtCreated;
      delete data.modifier;
      delete data.modifierId;
      delete data.gmtModified;
      delete data.topCode;
      delete data.Code;
    }
    console.log('编辑状态入参', data);

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
    let dataFormbase3 = voteFormdata.getFieldsValue();
    console.log('观察表单2数据', dataFormbase3);
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
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
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
