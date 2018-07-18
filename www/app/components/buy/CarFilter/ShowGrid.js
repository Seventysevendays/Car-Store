import React from 'react';
import {Col , Row , Radio , Pagination} from 'antd'
import {connect} from 'dva';
import {transInfo} from './gridInfo/transInfo'
const RadioButton = Radio.Button;
import moment from "moment";
const RadioGroup = Radio.Group;

class ShowGrid extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      gridCol : "2",
      gridRow : "5",
    }
  }
  componentDidMount() {
    var _this = this;
    $('.showGridBox').on('click' , '.avatar' , function(){
      const carId = $(this).data("id")
      _this.props.showCar(true , carId)
    })
  }

  render() {
    const {cars , carPagination , columns , dispatch } = this.props;
    const gridContent = (n) =>{
      const theCar = cars[n]
      if(!theCar) return null;
      const filterInfo = (info) =>{
        if(info == "avatar"){
          return null;
        }else if(info == "buydate"){
          return moment(theCar[info]).format("YYYY年MM月")
        }else if(info == "price"){
          return theCar[info] + "万元"
        }else if(info == "km"){
          return parseInt(theCar[info] / 10000) + "万公里"
        }else if(info == "license"){
          if(theCar[info]){
            return "是"
          }else{
            return "否"
          }
        }else{
          return theCar[info]
        }
      }
      return <div>
        <Row>
          <Col span={18} offset={3}>
            <img className="avatar" style={{"cursor":"pointer" ,"borderRadius" : "4px"}} data-id={theCar.id} src={`/src/carimages_small/${theCar.id}/view/${theCar.avatar}`}/>
          </Col>
        </Row>
        <Row>
          <Col span={18} offset={3}>
            {columns.map(item => <h4 key={item}>{transInfo(item)}{filterInfo(item)}</h4>)}
          </Col>
        </Row>
      </div>
    }
    var grid = [];
    for(var i = 0; i < this.state.gridRow ; i ++){
      var gridCol = [];
      for(var j = 0; j < this.state.gridCol ; j ++){
        gridCol.push(
          <Col key={j} span={24 / this.state.gridCol}>
            {gridContent(i * this.state.gridCol + j)}
          </Col>
        )
      }
      grid.push(
        <Row key={i}>{gridCol}</Row>
      )
    }
    return (
      <div className="showGridBox">
        <RadioGroup onChange={(e) => {
          this.setState({
            gridCol: e.target.col
          });
          dispatch({"type" : "carFilter/changePagination" , "pageSize" : e.target.col * e.target.row})
        }} defaultValue="2">
          <RadioButton row="5" col="2" value="2">2×5</RadioButton>
          <RadioButton row="5" col="3" value="3">3×5</RadioButton>
          <RadioButton row="5" col="4" value="4">4×5</RadioButton>
        </RadioGroup>
        {grid}
        <Pagination
          current={carPagination.current}
          total={carPagination.total}
          pageSize={carPagination.pageSize}
          onChange={(page) => {
            this.props.dispatch({ "type": "carFilter/changePagination", "current": page, "pageSize": this.state.gridCol * this.state.gridRow })
          }}
        />
      </div>

    )
  }
}

const mapstate = ({carFilter}) => ({
  cars : carFilter.cars,
  carPagination : carFilter.carPagination
})

export default connect(
  mapstate
)(ShowGrid);
