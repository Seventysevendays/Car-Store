import React from 'react';
import columns from './tableColumns/columns';
import { connect } from 'dva'
import { Table } from 'antd';


class ShowTable extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    var _this = this;
    $(".showTableBox").on("click", ".avatar", function () {
      const carId = $(this).data("id")
      _this.props.showCar(true, carId)
    })
  }
  getCols(arr) {
    const colsArr = columns.filter(item => {
      return arr.includes(item.dataIndex) ? item : null
    })
    return colsArr;
  }
  render() {
    const { cars, carSorter, dispatch, carPagination } = this.props;
    return (
      <div className="showTableBox">
        <Table dataSource={cars}
          columns={this.getCols(this.props.columns)}
          rowKey="id"
          onChange={(pagination, filters, sorter) => {
            if (sorter.order != carSorter.order || sorter.field != carSorter.field) {
              dispatch({
                "type": "carFilter/changeSort",
                "order": sorter.order || "ascend",
                "field": sorter.field || "id"
              })
            }
            if (pagination.current != carPagination.current || pagination.pageSize != carPagination.pageSize) {
              dispatch({
                "type": "carFilter/changePagination",
                "current": pagination.current,
                "pageSize": pagination.pageSize
              })
            }
          }}
          pagination={{
            current: carPagination.current,
            total: carPagination.total,
            pageSize: carPagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["3", "5", "20", "50", "100"]
          }}
        />
      </div>
    )
  }
}

const mapstate = ({ carFilter }) => ({
  cars: carFilter.cars,
  carSorter: carFilter.carSorter,
  carPagination: carFilter.carPagination
})

export default connect(
  mapstate
)(ShowTable);
