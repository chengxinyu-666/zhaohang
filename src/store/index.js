/*
 * @Author: chengxinyu
 * @Date: 2021-11-10 17:12:53
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-03 13:47:24
 */
// 1. 导入redux库（yarn add redux）
// 2. 导入reducers
// 3. 创建仓库store

import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers（实战：1都放在src/store目录下 学习，2放到pages目录中 项目）
import cartReducer from './carts/index';

// 将各种不同模块的仓库，放到不同文件
// export default createStore(cartReducer, composeWithDevTools())
export default createStore(
  combineReducers({
    cartReducer,
  }),
  composeWithDevTools(),
);
