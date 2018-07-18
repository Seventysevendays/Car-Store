import React from 'react';
import {connect} from 'dva'
import {Row , Col} from 'antd'
import MyTabs from './MyTabs'
import Series from './Series'
import MyCheckBox from './MyCheckBox'
import MyRange from './MyRange'
import MyDate from './MyDate'
import MyDropDown from './MyDropDown'
import MyTag from './MyTag'
import './CarFilter.less'


class CarFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            char : "A",
            price : [0 , 100],
            km : [0 , 100]
        }
    }
  render() {
    const {dispatch , filters} = this.props;
    var data = {
        "brand":"",
        "series":"",
        "color":[],
        "seat":[],
        "engine":[],
        "type":[],
        "fuel":"",
        "gearbox":"",
        "license":"",
        "buydate":[]
    };
    filters.forEach(item=>{
        data[item.k] = item.v;
    });

    return (
      <div className= "carFilterBox">
            <Row>
                <Col span={2}>品牌</Col>
                <Col span={22}>
                    <MyTabs
                        brand = {data.brand}
                        onChoose = {(v , char) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "brand" , v })
                            this.setState({
                                char
                            })
                        }}
                    ></MyTabs>
                </Col>
            </Row>
            <Row>
                <Col span={2}>系列</Col>
                <Col span={22}>
                    <Series
                        char = {this.state.char}
                        brand = {data.brand}
                        series = {data.series}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "series" , v})
                        }}
                    >
                    </Series>
                </Col>
            </Row>
            <Row>
                <Col span={2}>颜色</Col>
                <Col span={22}>
                    <MyCheckBox
                        options = {["黑","白","灰","银灰","红","蓝","橙","香槟","紫","其他","黄","咖啡","绿"]}
                        value = {data.color}
                        onChoose ={(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "color" , v})
                            if(v.length == 0){
                                dispatch({"type":"carFilter/removeFilter","k":"color"})
                            }
                        }}
                    ></MyCheckBox>
                </Col>
            </Row>
            <Row>
                <Col span={2}>车型</Col>
                <Col span={22}>
                    <MyCheckBox
                        options = {["B级轿车","A级轿车","C级轿车","大型SUV","跑车","中型SUV","小型SUV","面包车"]}
                        value = {data.type}
                        onChoose ={(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "type" , v})
                            if(v.length == 0){
                                dispatch({"type":"carFilter/removeFilter","k":"type"})
                            }
                        }}
                    ></MyCheckBox>
                </Col>
            </Row>
            <Row>
                <Col span={2}>座位数</Col>
                <Col span={22}>
                    <MyCheckBox
                        options = {["2","4","5","20"]}
                        value = {data.seat}
                        onChoose ={(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "seat" , v})
                            if(v.length == 0){
                                dispatch({"type":"carFilter/removeFilter","k":"seat"})
                            }
                        }}
                    ></MyCheckBox>
                </Col>
            </Row>
            <Row>
                <Col span={2}>发动机</Col>
                <Col span={22}>
                    <MyCheckBox
                        options = {["1.0","1.2","1.2T","1.4","1.4T","1.6","1.6T","2.0","2.0T","5.0"]}
                        value = {data.engine}
                        onChoose ={(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "engine" , v})
                            if(v.length == 0){
                                dispatch({"type":"carFilter/removeFilter","k":"engine"})
                            }
                        }}
                    ></MyCheckBox>
                </Col>
            </Row>
            <Row>
                <Col span={2}>排量</Col>
                <Col span={22}>
                    <MyCheckBox
                        options = {["国一","国二","国三","国四","国五","国六"]}
                        value = {data.exhaust}
                        onChoose ={(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "exhaust" , v})
                            if(v.length == 0){
                                dispatch({"type":"carFilter/removeFilter","k":"exhaust"})
                            }
                        }}
                    ></MyCheckBox>
                </Col>
            </Row>
            <Row>
                <Col span={2}>价格</Col>
                <Col span={22}>
                    <MyRange
                        range = {this.state.price}
                        onChange={(v)=>{
                            this.setState({"price":v})
                        }}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "price" , v})
                        }}
                    ></MyRange>
                </Col>
            </Row>
            <Row>
                <Col span={2}>公里</Col>
                <Col span={22}>
                    <MyRange
                        range = {this.state.km}
                        onChange={(v)=>{
                            this.setState({"km":v})
                        }}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "km" , v})
                        }}
                    ></MyRange>
                </Col>
            </Row>
            <Row>
                <Col span={2}>日期</Col>
                <Col span={22}>
                    <MyDate
                        onChoose={(v)=>{
                            if(v.length != 0){
                                dispatch({"type":"carFilter/changeFilters","k":"buydate","v":[v[0].format("x"),v[1].format("x")]})
                            }else{
                                dispatch({"type":"carFilter/removeFilter","k":"buydate"})
                            }
                        }}
                    ></MyDate>
                </Col>
            </Row>
            <Row>
                <Col span={2}>杂项</Col>
                <Col span={6}>
                    <MyDropDown
                        title = "是否含牌"
                        options= {["是","否"]}
                        value = {data.license}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "license" , v})
                        }}
                    ></MyDropDown>
                </Col>
                <Col span={6}>
                    <MyDropDown
                        title = "燃油"
                        options= {["汽油","柴油","油电混合","纯电动","燃气","人力"]}
                        value = {data.fuel}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "fuel" , v})
                        }}
                    ></MyDropDown>
                </Col>
                <Col span={6}>
                    <MyDropDown
                        title = "变速箱"
                        options= {["自动","手动","手自一体"]}
                        value = {data.gearbox}
                        onChoose = {(v) => {
                            dispatch({"type" : "carFilter/changeFilters" , "k" : "gearbox" , v})
                        }}
                    ></MyDropDown>
                </Col>
            </Row>
            <Row>
                <Col span={2}>当前：</Col>
                <Col span={22}>
                    <MyTag
                        filters = {filters}
                        onClose = {(k)=>{
                            dispatch({"type":"carFilter/removeFilter",k})
                            if( k == "price"){
                                this.setState({
                                    "price":[0,100]
                                })
                            }else if( k == "km"){
                                this.setState({
                                    "km":[0,100]
                                })
                            }
                        }}
                    ></MyTag>
                </Col>
            </Row>
      </div>
    )
  }
}

const mapstate = ({carFilter}) => ({
    filters : carFilter.filters
})
export default connect(
    mapstate
)(CarFilter);
