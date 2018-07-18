import React, { Component } from 'react'
import { connect } from 'dva';
import cn from 'classnames'
import './BigPic.less';

class BigPic extends Component {
  constructor(props) {
    super(props)
    this.timer = null;
    this.autoplay = false;
    this.state = {
      "toggle" : false
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.nowId != this.props.nowId) {
      return false;
    }
    return true;
  }
  componentWillUpdate({ nowId, nowAlbum, carImages, nowIndex, dispatch }, nextState) {
    clearInterval(this.timer);
    $(this.refs.loading).show();
    var image = new Image();
    var src = `/src/carimages/${nowId}/${nowAlbum}/${carImages[nowAlbum][nowIndex]}`;
    image.src = src;
    var self = this;
    image.onload = function () {
      if (self.autoplay) {
        $(self.refs.start).trigger("click")
      }
      $(self.refs.bigImg).attr("src", src);
      $(self.refs.loading).hide();
    }
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }

  render() {
    const { nowIndex, nowAlbum, nowId, carImages, dispatch } = this.props
    if (!carImages[nowAlbum]) return null;
    var toggle = false;
    return (
      <div className="bigPicBox">
        <img className="bigImg"
          src={`/src/carimages_small/${nowId}/${nowAlbum}/${carImages[nowAlbum][nowIndex]}`}
          ref="bigImg" />
        <p className="loading" ref="loading"></p>
        <div className="left"
          onClick={() =>
            dispatch({ "type": "showCar/prevPic" })}>
        </div>
        <div className="right"
          onClick={() =>
            dispatch({ "type": "showCar/nextPic" })
          }></div>
        <div ref="start" className={cn({"toggle" : this.state.toggle ,"start" : true})}
          onClick={() => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
              dispatch({ "type": "showCar/nextPic" });
            }, 1500);
            this.autoplay = true;
          }}>
          <img src="/src/images/bofang.svg" alt="" />
        </div>
        <div className="pause"
          onClick={() => {
            clearInterval(this.timer);
            this.autoplay = false;
          }}
        >
          <img src="/src/images/zanting.svg" alt="" />
        </div>
      </div>
    )
  }
}
const mapstate = ({ showCar }) => ({
  nowIndex: showCar.nowIndex,
  nowAlbum: showCar.nowAlbum,
  carImages: showCar.carImages,
  nowId: showCar.nowId
})
export default connect(
  mapstate
)(BigPic)
