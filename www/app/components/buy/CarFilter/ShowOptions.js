import React from 'react';
import columns from './tableColumns/columns';
import './ShowOptions.less'

class ShowOptions extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    var _this = this;
    $("ul").sortable({
      connectWith : "ul",
      stop: function(){
        var showArr = [];
        $(_this.refs.show).find('li').each(function(){
          showArr.push($(this).data("key"))
        })
        _this.props.setCols(showArr);
      }
    }).disableSelection();
  }
  render() {
    const showColumns = columns.filter(item => this.props.arr.includes(item.dataIndex) )
    const hideColumns = columns.filter(item => !this.props.arr.includes(item.dataIndex))

    return (
      <div className="showOptionsBox">
        <h3>已显示</h3>
        <ul ref="show" className="show">
          {showColumns.map(item => <li data-key={item.dataIndex} key={item.dataIndex}>{item.title}</li>)}
        </ul>
        <h3>未显示</h3>
        <ul ref="hide" className="hide">
          {hideColumns.map(item => <li data-key={item.dataIndex} key={item.dataIndex}>{item.title}</li>)}
        </ul>
      </div>
    )
  }
}

export default ShowOptions;
