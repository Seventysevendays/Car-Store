import React from 'react';
import { Layout, Menu, Row , Col} from 'antd';
const {  Content } = Layout;

import App from "./App.js"
export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <App k="index">
          <Content style={{ "background": '#fff', "padding": 24, "margin": 0, "minHeight": 280 }}>
            <Row>
              <Col span={20} offset={2}>
                <h1>我是首页</h1>
              </Col>
            </Row>
          </Content>
        </App>
      </div>
    );
  }
}
