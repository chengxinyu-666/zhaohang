/*
 * @Author: chengxinyu
 * @Date: 2021-12-03 18:28:29
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-07 15:24:27
 */

import { createStore } from 'redux';
import reducer from './reducer';
const configureStore = () => createStore(reducer);
export default configureStore;
