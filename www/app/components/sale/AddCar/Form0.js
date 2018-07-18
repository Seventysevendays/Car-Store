import React from 'react'
const FormItem = Form.Item;
import { Form, Input, Cascader, DatePicker } from 'antd';
import { connect } from 'dva';
import { carOptions, fuelOptions, exhaustOptions, gearboxOptions } from './formOptions/formOptions'

const inputLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const pickerLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 4 },
};
const Form0 = (props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="horizontal">
      <FormItem {...inputLayout} label="品牌和车系">
        {getFieldDecorator('brandAndSeries', {
          rules: [{ required: true, message: '请选择品牌和车系!' }],
        })(<Cascader options={carOptions} placeholder="选择品牌和车系" />)}
      </FormItem>
      <FormItem {...pickerLayout} label="购买日期">
        {getFieldDecorator('buyDate', {
          rules: [{ required: true, message: '请填写购买日期!' }],
        })(<DatePicker />)}
      </FormItem>
      <FormItem {...inputLayout} label="里程读表数">
        {getFieldDecorator('km', {
          rules: [
            { required: true, message: '请填写里程读表数(万公里)!' },
            { pattern: /^\d+$/, message: "请输入数字！" }
          ],
        })(<Input placeholder="请填写里程读表数(万公里)" />)}
      </FormItem>
      <FormItem {...inputLayout} label="售价">
        {getFieldDecorator('price', {
          rules: [
            { required: true, message: '请填写售价!' },
            { pattern: /^\d+$/, message: "请输入数字！" }
          ],
        })(<Input placeholder="请填写售价" />)}
      </FormItem>
      <FormItem {...inputLayout} label="座位数">
        {getFieldDecorator('seat', {
          rules: [
            { required: true, message: '请填写座位数!' },
            { pattern: /^\d+$/, message: "请输入数字！" }
          ],
        })(<Input placeholder="请填写座位数" />)}
      </FormItem>
      <FormItem {...inputLayout} label="外观颜色">
        {getFieldDecorator('color', {
          rules: [{ required: true, message: '请填写外观颜色!' }],
        })(<Input placeholder="请填写外观颜色" />)}
      </FormItem>
      <FormItem {...inputLayout} label="燃料">
        {getFieldDecorator('fuel', {
          rules: [{ required: true, message: '请填写燃料!' }],
        })(<Cascader options={fuelOptions} placeholder="选择燃料" />)}
      </FormItem>
      <FormItem {...inputLayout} label="排放标准">
        {getFieldDecorator('exhaust', {
          rules: [{ required: true, message: '请填写排放标准!' }],
        })(<Cascader options={exhaustOptions} placeholder="选择排放标准" />)}
      </FormItem>
      <FormItem {...inputLayout} label="变速箱">
        {getFieldDecorator('gearbox', {
          rules: [{ required: true, message: '请填写变速箱!' }],
        })(<Cascader options={gearboxOptions} placeholder="选择变速箱" />)}
      </FormItem>
    </Form>
  );
}

export default connect()(Form0);
