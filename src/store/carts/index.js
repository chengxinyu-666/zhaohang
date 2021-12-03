/*
 * @Author: chengxinyu
 * @Date: 2021-11-11 13:50:27
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-11 14:24:00
 */
const initState = {
  data: [
    { id: 1, title: '标题1', num: 1, price: 1.11 },
    { id: 2, title: '标题2', num: 2, price: 2.22 },
    { id: 3, title: '标题3', num: 3, price: 3.33 },
  ],
};
const cartReducer = (state = initState, action) => {
  let tmp = JSON.parse(JSON.stringify(state));
  // action 对象里面两个属性,分别是type，payload
  // type判断动作 全部大写多个单词下划线隔开
  // payload 参数
  // console.log(action.payload);
  switch (action.type) {
    case 'CART_JIAN':
      tmp.data[action.payload].num -= 1;
      break;
    case 'CART_JIA':
      tmp.data[action.payload].num += 1;
      break;
    default:
      break;
  }
  return tmp;
};

export default cartReducer;
