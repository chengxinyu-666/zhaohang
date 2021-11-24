/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 10:34:44
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-24 17:35:59
 */

import { Menu } from '@/components';
import './index.less';
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';
function BasicLayout(props) {
  return (
    <StoreProvider store={store}>
      <div className="lay">
        <div className="left_container">
          <Menu></Menu>
        </div>

        <div className="right_container">{props.children}</div>
      </div>
    </StoreProvider>
  );
}

export default BasicLayout;
