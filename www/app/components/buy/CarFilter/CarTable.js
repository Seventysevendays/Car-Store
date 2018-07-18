import React from 'react';
import { connect } from 'dva';
import { Col, Row, Modal, Button, Icon, Radio } from 'antd';
import ShowOptions from './ShowOptions';
import './CarTable.less';
import fp from 'lodash/fp';
import ShowTable from './ShowTable'
import ShowGrid from './ShowGrid'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class CarTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      columns: ["id", "avatar", "brand", "price"],
      showType: "table"
    }
  }
  handleCancel(e) {
    this.setState({
      visible: false
    });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }

  componentWillMount() {
    if (localStorage.userShow) {
      this.setState({
        columns: JSON.parse(localStorage.userShow)
      })
    }
  }

  render() {
    var arr = fp.clone(this.state.columns);
    const setCols = (_arr) => {
      arr = _arr;
    }
    const { carPagination, showCar } = this.props;
    return (
      <div className="carTableBox">
        <Row style={{ "padding": "20px 0" }}>
          <Col span={9} offset={1}>
            <span>
              共{carPagination.total}辆车
            </span>
            <span>
              {"  "}当前第{carPagination.current}/{Math.ceil(carPagination.total / carPagination.pageSize)}页
            </span>
          </Col>
          <Col span={7} >
            <Button type="primary" onClick={this.showModal.bind(this)}>显示内容</Button>
            <Modal
              title="车况显示事项"
              visible={this.state.visible}
              onOk={() => {
                this.setState({
                  visible: false,
                  columns: arr
                });
                localStorage.setItem("userShow", JSON.stringify(arr))
              }}
              onCancel={this.handleCancel.bind(this)}
              destroyOnClose={true}
            >
              <ShowOptions
                setCols={setCols}
                arr={arr}
              ></ShowOptions>
            </Modal>
          </Col>
          <Col span={4} offset={3}>
            <RadioGroup onChange={(e) => {
              this.setState({ showType: e.target.value })
            }} defaultValue="table">
              <RadioButton value="table"><Icon type="table" /></RadioButton>
              <RadioButton value="grid"><Icon type="profile" /></RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        {this.state.showType == "table"
          ? <ShowTable showCar={showCar} columns={this.state.columns}></ShowTable>
          : <ShowGrid showCar={showCar} columns={this.state.columns}></ShowGrid>
        }
      </div>
    )
  }
};

const mapstate = ({ carFilter }) => ({
  cars: carFilter.cars,
  carSorter: carFilter.carSorter,
  carPagination: carFilter.carPagination
})
export default connect(
  mapstate
)(CarTable);
