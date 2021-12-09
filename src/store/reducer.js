/*
 * @Author: chengxinyu
 * @Date: 2021-12-07 15:14:20
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-09 10:40:58
 */

const initialState = {
  menuName: '首页',
  current: '123123数据',
  tabledate: ['54', '43'],
  menulist: [],
  backfill: [], //单条数据详情，用于草稿回填以及详情页面
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  console.log('action', action); // 使用dispatch调用action中的方法会触发更新state 获取到action之后根据type的不同来更改不同的值    类似于action:{type: "SWITCH_MEUN", menuName: "订单管理"}
  switch (action.type) {
    case 'SWITCH_MEUN':
      return {
        ...state, // 保存上一个状态值的写法
        menuName: action.menuName,
      };
    case 'SWITCH_CURRENT':
      return {
        ...state, // 保存上一个状态值的写法
        current: action.current,
      };
    case 'SWITCH_TABLEDATE':
      return {
        ...state, // 保存上一个状态值的写法
        tabledate: action.tabledate,
      };
    case 'SWITCH_BACKFILL':
      return {
        ...state, // 保存上一个状态值的写法
        backfill: action.backfill,
      };
    default:
      return { ...state };
  }
};
