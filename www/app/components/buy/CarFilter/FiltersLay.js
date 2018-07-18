import CarFilter from './CarFilter';
import CarTable from './CarTable'
import ShowCar from '../ShowCar/ShowCar'
import React from 'react';
import { connect } from 'dva'
import { Icon } from 'antd'
import './FiltersLay.less'
import Buy from '../../../containers/Buy'

class FiltersLay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowCar: false,
      carId: 0
    }
    props.dispatch({ "type": "carFilter/init" })
  }
  render() {
    return (
      <Buy k="carlist" c="大表选车">
        <div className="filtersLayBox">
          <CarFilter></CarFilter>
          <CarTable showCar={(isShowCar, carId) =>
            this.setState({
              isShowCar,
              carId
            })}></CarTable>
          {
            this.state.isShowCar
              ? <div className="showBox">
                <div className="inner">
                  <Icon type="close"
                    className="closeBtn"
                    onClick={() => {
                      this.setState({
                        isShowCar: false
                      })
                      this.props.dispatch({ "type": "showCar/clearCarImages" })
                    }}
                  />
                  <ShowCar carId={this.state.carId}></ShowCar>
                </div>
              </div>
              : null
          }
        </div>
      </Buy>
    )
  }
}

export default connect()(FiltersLay);
