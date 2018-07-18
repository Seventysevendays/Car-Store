import React from 'react';
import { Slider } from 'antd';

const MyRange = (props) => (
    <div>
        <Slider style={{"width" : "480px"}} range value={props.range} 
            onChange={(v)=>{props.onChange(v)}}
            onAfterChange  = {(v)=>{props.onChoose(v)}} />        
    </div>
);

export default MyRange;