import React from 'react';
import { Steps, Button, message } from 'antd';
import './AddCar.less'
import Step0 from './Step0'
import Step1 from './Step1'
import Step2 from './Step2'
import { connect } from 'dva'
const Step = Steps.Step;
import Sale from '../../../containers/Sale'

class AddCar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
    this.props.dispatch({ "type": "addCar/letPass", pass: true })
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    if (current == 0) {
      this.props.dispatch({ "type": "addCar/pushForm0", form0: {} })
    } else if (current == 1) {
      this.props.dispatch({ "type": "addCar/pushForm1", form1: {} })
      this.props.dispatch({ "type": "addCar/clearForm2", form2: [] })
    }
    this.props.dispatch({ "type": "addCar/letPass", pass: true })
  }
  render() {
    const showStep = (n) => {
      var arr = [
        <Step0></Step0>,
        <Step1></Step1>,
        <Step2></Step2>
      ];
      return arr[n]
    }
    const { current } = this.state;
    const { form0, form1, form2 } = this.props;
    return (
      <Sale c="信息添加">
        <div>
          <Steps current={current}>
            <Step key={0} title="车辆的基本信息" description="车型、车主、价格等"></Step>
            <Step key={1} title="车辆的图片" description="外观、内饰、结构及发动机、更多细节图片"></Step>
            <Step key={2} title="车辆的其他文件" description="机动车登记证、行驶证照片"></Step>
          </Steps>
          <div className="steps-content">
            {showStep(this.state.current)}
          </div>
          <div className="steps-action">
            {
              current < 2
              && <Button type="primary" disabled={this.props.pass} onClick={() => this.next()}>下一步</Button>
            }
            {
              current === 2
              && <Button type="primary"
                onClick={() => {
                  message.success('信息已载入!')
                  this.setState({
                    current: 0
                  })
                  $.ajax({
                    "url": "/addCar",
                    "type": "post",
                    "data": {
                      form0: JSON.stringify(form0),
                      form1: JSON.stringify(form1),
                      form2: JSON.stringify(form2)
                    }
                  });
                  this.props.dispatch({ "type": "addCar/pushForm0", form0: {} });
                  this.props.dispatch({ "type": "addCar/pushForm1", form1: {} });
                  this.props.dispatch({ "type": "addCar/clearForm2", form2: [] });
                }}>完成</Button>
            }
            {
              current > 0
              && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  上一步
            </Button>
              )
            }
          </div>
        </div>
      </Sale>
    )
  }
}
const mapstate = ({ addCar }) => ({
  pass: addCar.pass,
  form0: addCar.form0,
  form1: addCar.form1,
  form2: addCar.form2

})
export default connect(
  mapstate
)(AddCar);
