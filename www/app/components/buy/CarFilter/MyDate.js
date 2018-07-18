import React from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;


const MyDate = (props) => (
    <div>
        <RangePicker onChange={(v)=>{props.onChoose(v)}}/>
    </div>
);

export default MyDate;