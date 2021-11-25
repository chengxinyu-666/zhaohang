/*
 * @Author: chengxinyu
 * @Date: 2021-11-24 12:59:15
 * @LastEditors: chengxinyu
 * @LastEditTime: 2021-11-25 18:04:22
 */

import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import './index.less';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import Http from '@/utils/http';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menulist: [],
      seconelist: [],
    };
  }

  async componentDidMount() {
    let menulist = await Http({
      url: '/menu/listFirstLevelMenuForUser',
    });

    let seconelist = await Http({
      url: '/menu/listOthersMenuForUser',
      body: {
        parentId: '1001',
      },
    });
    this.setState({
      menulist,
      seconelist,
    });
    console.log('seconelist', seconelist);
  }

  render() {
    const { show, pathname } = this.props;
    const { menulist, seconelist } = this.state;
    console.log(6, menulist);
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
                    return <Menu.Item key={idx}>{item.menuName}</Menu.Item>;
                  })}
                </SubMenu>
              ))}
              {/* {
	              menulist?.map(curr=>{
		            if(curr.isMenubar){     //判断是否是有下拉选项的菜单项
		                 return (
		                 <SubMenu
		                     key={curr.path}
		                     title={<span><Icon type={curr.iconType} /><span>{curr.title}</span></span>}
		                 >{
		                     resourceManagementChildren.map(item=>{ 
		                     if(curr.list==='ResourceAdministration' && item.isresourceManagementChildren){
		                         return (
		                         <Menu.Item 
		                             key={item.path}
		                             onClick={this.menuChange}
		                         >{item.title}</Menu.Item>
		                         )
		                     }
		                     return null;
		                     })
		                 }</SubMenu>
		                 )
		             }
		             return (
		                 <Menu.Item 
		                     key={curr.path}
		                     onClick={this.menuChange}>
		                     <Icon type={curr.iconType} />
		                     <span>{curr.title}</span>
		                 </Menu.Item>
		             )
	             }) */}

              {/* <SubMenu key="2" icon={<UserOutlined />} title="User">
                    
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                  </SubMenu> */}
              {/* <Menu.Item key="1" >
                单个的
              </Menu.Item> */}
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}
