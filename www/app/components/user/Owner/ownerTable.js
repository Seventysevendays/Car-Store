import React from 'react';
import columns from './ownerColumns/columns';
import { connect } from 'dva'
import { Table, Input } from 'antd';
import User from '../../../containers/User'

class OwnerTable extends React.Component {
  constructor(props) {
    super(props)
    props.dispatch({ "type": "ownerFilter/init" })
  }
  render() {
    const { owners, ownerSorter, dispatch, ownerPagination } = this.props;
    return (
      <User c="用户大表">
        <div className="ownerTableBox">
          <Input style={{ "width": "200px", "marginBottom": "10px" }}
            placeholder={"输入查询"}
            onChange={(e) => {
              this.props.dispatch({ "type": "ownerFilter/findKey", keyword: e.target.value })
            }}></Input>
          <Table dataSource={owners}
            columns={columns}
            rowKey="id"
            onChange={(pagination, filters, sorter) => {
              if (sorter.order != ownerSorter.order || sorter.field != ownerSorter.field) {
                dispatch({
                  "type": "ownerFilter/changeSort",
                  "order": sorter.order || "ascend",
                  "field": sorter.field || "id"
                })
              }
              if (pagination.current != ownerPagination.current || pagination.pageSize != ownerPagination.pageSize) {
                dispatch({
                  "type": "ownerFilter/changePagination",
                  "current": pagination.current,
                  "pageSize": pagination.pageSize
                })
              }
            }}
            pagination={{
              current: ownerPagination.current,
              total: ownerPagination.total,
              pageSize: ownerPagination.pageSize
            }}
          />
        </div>
      </User>
    )
  }
}

const mapstate = ({ ownerFilter }) => ({
  owners: ownerFilter.owners,
  ownerSorter: ownerFilter.ownerSorter,
  ownerPagination: ownerFilter.ownerPagination
})

export default connect(
  mapstate
)(OwnerTable);
