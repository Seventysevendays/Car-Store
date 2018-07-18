import React from 'react';
import { connect } from 'dva';
import { Layout, Menu } from 'antd';

import './App.less'
const { Header } = Layout;
import { push } from "react-router-redux"

class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    console.log(this.props.children)
    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.props.k]}
              style={{ lineHeight: '64px' }}
              onClick={(e) => {
                this.props.dispatch(push(e.item.props.root))
              }}
            >
              <Menu.Item key="index" root="/">首页</Menu.Item>
              <Menu.Item key="buy" root="/buy/filterslay">买车</Menu.Item>
              <Menu.Item key="sale" root="/sale/addcar">卖车</Menu.Item>
              <Menu.Item key="user" root="/user/ownertable">用户</Menu.Item>
              <Menu.Item key="admin" root="/admin">管理员</Menu.Item>
            </Menu>
          </Header>
        </Layout>
        {
          this.props.children
        }
      </div>
    )
  }
};

const mapstate = ({ carFilter }) => ({
  filters: carFilter.filters
})
export default connect(
  mapstate
)(App);
