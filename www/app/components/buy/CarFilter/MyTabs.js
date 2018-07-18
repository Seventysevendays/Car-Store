import { Tabs } from 'antd';
import React from 'react';
import {connect} from 'dva'
import cn from "classnames"
import carBrandAndSeries from "./carBrandAndSeries/carBrandAndSeries"

const TabPane = Tabs.TabPane;

const MyTabs = (props) => (
    <Tabs 
        defaultActiveKey="A" 
    >
        {Object.keys(carBrandAndSeries).map(char => {     
            return <TabPane 
                        tab={char} 
                        key={char}
                    >
                        {carBrandAndSeries[char].map(item => {
                            return  <a  href="javascript:void(0);"
                                        className={cn({
                                            "line":true,
                                            "cur":item.name == props.brand
                                        })}
                                        onClick = {() => props.onChoose(item.name , char)} 
                                        key = {item.name} >
                                        {item.name}
                                    </a>})}
                    </TabPane>})}
    </Tabs>);
export default connect(

)(MyTabs);
