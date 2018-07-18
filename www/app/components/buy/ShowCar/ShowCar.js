import React, { Component } from 'react'
import CarPart from './Carpart'
import CarLike from './CarLike'
import SmallPics from "./SmallPics";
import BigPic from "./BigPic";
import './ShowCar.less'
import {connect} from 'dva'

class ShowCar extends Component {
  constructor(props){
    super(props);
    props.dispatch({"type" : "showCar/init" , "nowId" : this.props.carId})
  }
  render() {
    return (
      <div className="showCarBox">
        <div className="leftPart">
          <BigPic></BigPic>
        </div>
        <div className="rightPart">
          <CarPart></CarPart>
          <CarLike></CarLike>
          <SmallPics></SmallPics>
        </div>
      </div>)
  }
}

export default connect()(ShowCar)
