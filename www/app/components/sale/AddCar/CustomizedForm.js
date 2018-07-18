import Form0 from './Form0'
import { Form } from 'antd';

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      brandAndSeries: Form.createFormField({
        ...props.brandAndSeries,
        value: props.brandAndSeries.value
      }),
      buyDate: Form.createFormField({
        ...props.buyDate,
        value: props.buyDate.value
      }),
      km: Form.createFormField({
        ...props.km,
        value: props.km.value
      }),
      price: Form.createFormField({
        ...props.price,
        value: props.price.value
      }),
      seat: Form.createFormField({
        ...props.seat,
        value: props.seat.value
      }),
      color: Form.createFormField({
        ...props.color,
        value: props.color.value
      }),
      fuel: Form.createFormField({
        ...props.fuel,
        value: props.fuel.value
      }),
      exhaust: Form.createFormField({
        ...props.exhaust,
        value: props.exhaust.value
      }),
      gearbox: Form.createFormField({
        ...props.gearbox,
        value: props.gearbox.value
      })
    };
  },
  // onValuesChange(_, values) {
  //   console.log(values);
  // },
})(Form0);
