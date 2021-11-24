/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:28:21
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 18:17:57
 */

import { history } from 'umi';
import { cookie, urlGet } from 'project-libs';
import Http from '../utils/http';

export default {
  state: {
    menu: [],
  },
  reducers: {
    getMenu(state, payload) {
      console.log('state', state);
      console.log('payload', payload);
      return {
        ...state,
        ...payload,
      };
    },
    resetData(state, payload) {
      return {
        ...state,
        menu: [],
        ...payload,
      };
    },
  },

  effects: {
    async getMenuAsync(dispatch) {
      const user = await Http({
        url: '/menu/listFirstLevelMenuForUser',
      });
      console.log('user', user);

      if (user) {
        // console.log(23);
        dispatch({
          type: 'getMenu',
          payload: user,
        });
      }
    },
  },
};
