import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './LoginPage.less'

const FormItem = Form.Item;


class AdminLogin extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="adminBox">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
          </Button>
            <a href="">注册</a>
          </FormItem>
        </Form>
      </div>
    )
  }
}


const LoginPage = Form.create()(AdminLogin);
export default LoginPage;

