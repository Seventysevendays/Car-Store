import React, { Component } from 'react'
import { connect } from 'dva';
import './SmallPics.less'
import cn from 'classnames'

class SmallPics extends Component {
  constructor(props){
    super(props)
    this.totalPage = 0;
  }

  shouldComponentUpdate(nextProps, nextState){
      if( nextProps.nowId != this.props.nowId){
          return false;
      }
      return true;
  }

  componentDidUpdate(){
    var self = this;
    $(this.refs.ul).stop(true).animate({
        "left": -300 * $("span.cur").data("i")
    },300);
    $(this.refs.page).on("mouseover","span",function(){
      var i = $(this).data("i");
      $(self.refs.ul).stop(true).animate({
          "left": -300 * i
      },300);
      self.props.dispatch({"type" : "showCar/changeNowIndex" , "nowIndex" : i * 4})
    })
  }
  
  render() {
    const {carImages , nowAlbum , nowIndex , nowId , dispatch} = this.props
    if(!carImages[nowAlbum]) return null
    this.totalPage = Math.ceil(carImages[nowAlbum].length / 4);
    const showUl = () =>{
      var ulArr = [];
      for(let i = 0; i < this.totalPage; i ++){
        ulArr.push(
          <ul key = {i}>
            {carImages[nowAlbum].slice(i * 4 , i * 4 + 4).map((item , index) =>
              <li key = {item} 
                  className = {cn({"cur" : i * 4 + index == nowIndex})}
                  onMouseEnter = {() => dispatch({"type" : "showCar/changeNowIndex" , "nowIndex" : i * 4 + index})}
                  >
                <img src={`src/carimages_small/${nowId}/${nowAlbum}/${item}`}
                     alt=""/>
              </li>)}
          </ul>)
      }
      return ulArr;
    } 
    const showSpan = () =>{
      var spanArr = [];
      for(let i = 0; i < this.totalPage; i ++){
        spanArr.push(
          <span key = {i} 
                data-i = {i}
                className = {cn({"cur" : i == Math.floor(nowIndex / 4)})}
          >
            第{i + 1}页
          </span>
        )
      }
      return spanArr;
    }  
    return (
      <div className="smallPics" ref = "smallPics">
        <div className="ulBox" ref = "ul">
          {showUl()}
        </div>
        <div className="spanBox" ref ="page">
          {showSpan()}
        </div>       
      </div>
    )
  }
}
const mapstate = ({showCar}) => ({
    nowAlbum : showCar.nowAlbum,
    nowId : showCar.nowId,
    nowIndex : showCar.nowIndex,
    carImages : showCar.carImages  
})
export default connect(
    mapstate
)(SmallPics)