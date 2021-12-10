/*
 * @Author: chengxinyu
 * @Date: 2021-12-10 16:45:04
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-10 16:51:50
 */
import { SWITCH_TABLEDATE, SWITCH_BACKFILL } from './constant';

export const createTabledateAction = (data) => ({
  type: SWITCH_TABLEDATE,
  data,
});
export const createBackfillAction = (data) => ({ type: SWITCH_BACKFILL, data });
