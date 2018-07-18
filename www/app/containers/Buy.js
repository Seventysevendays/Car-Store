import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from "dva";
const { Content, Sider } = Layout;
import App from "./App.js";
import { push } from "react-router-redux";
class Buy extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <App k="buy">
        <div>
          <Layout>
            <Layout>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={[this.props.k]}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={(item) => {
                    this.props.dispatch(push("/buy/" + item.key))
                  }}
                >
                  <Menu.Item key="filterslay">大表选车</Menu.Item>
                  <Menu.Item key="zhuanjia">专家荐车</Menu.Item>
                  <Menu.Item key="yunqi">运气选车</Menu.Item>
                  <Menu.Item key="sifa">司法拍卖</Menu.Item>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>买车</Breadcrumb.Item>
                  <Breadcrumb.Item>{this.props.c}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </App>
    );
  }
}
export default connect()(Buy);
