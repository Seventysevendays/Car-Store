import React from 'react';
import CustomizedForm from './CustomizedForm'
import { connect } from 'dva'

class Step0 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        brandAndSeries: {},
        buyDate: {},
        km: {},
        price: {},
        seat: {},
        color: {},
        fuel: {},
        exhaust: {},
        gearbox: {}
      }
    };
  }
  handleFormChange(changedFields) {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  componentDidUpdate() {
    const fields = this.state.fields;
    const pass = () => {
      for (var prop in this.state.fields) {
        if (fields[prop].value == undefined || fields[prop].errors) {
          return true
        }
      }
      return false
    }
    if (!pass()) {
      this.props.dispatch({ "type": "addCar/letPass", pass: pass() })
      this.props.dispatch({ "type": "addCar/pushForm0", form0: this.state.fields })
    }
  }
  render() {
    const fields = this.state.fields;
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange.bind(this)} />
        {/* <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre> */}
      </div>
    )
  }
}

const mapstate = ({ addCar }) => ({
  form0: addCar.form0,
  form1: addCar.form1
})
export default connect(
  mapstate
)(Step0);
