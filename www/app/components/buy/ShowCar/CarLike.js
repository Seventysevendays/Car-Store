import React from 'react';
import { connect } from 'dva';
import cn from "classnames"
import './CarLike.less'

class CarLike extends React.Component {
    constructor(props){
        super(props)
        this.top = null;
        this.ulH = null;
        this.boxH = null;
        this.rate = null;
        this.bH = null;
    }
    componentDidMount() {
        var self = this;
        const $b = $(this.refs.b);
        const $ul = $(this.refs.ul);
        $b.draggable({
            "containment" : "parent",
            "drag" : function(event,ui){
                console.log(self.top , self.rate)
                self.top = ui.position.top;
                $ul.css("top", -self.top * self.rate )
            }
        });
        if(this.ulH > this.boxH){
            $(this.refs.carLikeBox).mousewheel(function(event,dalta){
                self.top -= dalta * 10;
                if(self.top < 0) self.top  = 0;
                if(self.top > self.boxH - self.bH) self.top  = self.boxH - self.bH;
                $b.css("top",self.top);
                $ul.css("top",-self.top * self.rate);
            })
        }     
    }
    
    componentDidUpdate(prevProps, prevState){
        this.ulH = $(this.refs.ul).height();
        this.boxH = $(this.refs.carLikeBox).height();
        this.rate = this.ulH / this.boxH;
        this.bH = this.boxH / this.rate;
        $(this.refs.b).css("height" , this.bH + "px");
        if(this.rate <= 1){
            $(this.refs.bar).hide();
            $(this.refs.b).hide();
        }else{
            $(this.refs.bar).show();
            $(this.refs.b).show();
        };
    }
    
    render() {
        const {carLike , nowId , dispatch} = this.props;
        return(<div className="carLikeBox" ref= "carLikeBox">
            <ul ref = "ul">
                {carLike.map(item => {               
                        return <li key = {item.id} className={cn({"cur":nowId == item.id})} onClick = {() =>{
                            dispatch({"type" : "showCar/init" , "nowId": item.id})
                    }}>
                                {item.brand}
                                {item.series}
                                {item.color}色
                                {new Date(Number(item.buydate)).getFullYear()}年
                                {Math.round(item.km/10000)}万公里
                                {item.price}万元
                                {item.engine}排量
                            </li>
                })}
            </ul>
            <div className="bar" ref="bar">
                <b ref="b"></b>
            </div>
        </div>)
}};

const mapstate = ({showCar}) => ({
    carLike : showCar.carLike,
    nowId : showCar.nowId
})

export default connect(
    mapstate,
)(CarLike);
