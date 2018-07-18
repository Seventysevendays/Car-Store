import React from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';



const MyDropDown = (props) =>{ 
    const {title , options , onChoose , value} = props;
    const menu = (
        <Menu onClick={(v) => {onChoose(v.key)}}>
            {options.map(item => <Menu.Item key = {item}>{item}</Menu.Item>)}
        </Menu>
    );
    return(
        <div>
            {title}
            <Dropdown.Button  overlay={menu}>
                {!value ? "不限" : value}
            </Dropdown.Button>
        </div>
    )};

export default MyDropDown;