import { Checkbox } from 'antd';
import React from 'react';

const CheckboxGroup = Checkbox.Group;

const MyCheckBox = (props) => {
    const {options , onChoose , value} = props;
    return(
        <div>
            <CheckboxGroup options={options} value = {value} onChange={(v) => onChoose(v)} />
        </div>
)};

export default MyCheckBox;
