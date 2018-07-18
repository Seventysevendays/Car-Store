import React from 'react';
import { connect } from 'dva'
import cn from "classnames";
import './Carpart.less'

class Carpart extends React.Component {

    constructor(props) {
        super(props);
        this.albumLis = [
            {"chinese":"外观","english":"view"},
            {"chinese":"内饰","english":"inner"},
            {"chinese":"结构及发动机","english":"engine"},
            {"chinese":"更多细节","english":"more"}
        ]
    }
    render() {
        const {nowAlbum , carImages} = this.props;
        if(!carImages.view) return null;
        return (
            <div className="carPartBox">
                <ul>
                    {
                        this.albumLis.map(item=>{
                            return <li
                                key={item.english}
                                className={cn({"cur":nowAlbum == item.english})}
                                onClick = {()=>{
                                    this.props.dispatch({"type":"showCar/changeNowAlbum","nowAlbum":item.english})
                                }}
                            >
                            {item.chinese} {carImages[item.english].length}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}
const mapstate = ({showCar}) => ({
    carImages : showCar.carImages,
    nowAlbum : showCar.nowAlbum
})

export default connect(
    mapstate
)(Carpart);
