/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 12:59:15
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-12-03 14:00:05
 */

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import './index.less';
import { useHttpHook } from '@/hooks';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import { history } from 'umi';
// import {useDispatch, useSelector} from 'react-redux'
export default function (props) {
  const [state, setState] = useState();

  const { show, pathname } = props;

  //地区获取参数
  const [menulist] = useHttpHook({
    url: '/menu/listFirstLevelMenuForUser',
  });
  const [seconelist] = useHttpHook({
    url: '/menu/listOthersMenuForUser',
    body: {
      parentId: '1001',
    },
  });
  console.log('seconelist', seconelist);

  function goItem(url) {
    // console.log(url);
    history.push(url);
  }

  return (
    <div className="menu" hidden={show}>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            width: '300px',
          }}
        >
          <div className="logo">
            <h2>招行-秦学后台管理</h2>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            {menulist?.map((item) => (
              <SubMenu title={item.menuName} key={item.menuId}>
                {seconelist?.map((item, idx) => {
                  return (
                    <Menu.Item
                      key={idx}
                      onClick={goItem.bind(this, item.menuUrl)}
                    >
                      {item.menuName}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
      </Layout>
    </div>
  );
}
