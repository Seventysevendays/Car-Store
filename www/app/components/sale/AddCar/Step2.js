import React from 'react';
import { Button, Modal, Progress } from 'antd'
import { connect } from 'dva'
import './Step2.less'

class Step2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      upstep: 0,
      percent: 0,
      ext: "",
      base: ""
    }
  }
  componentDidMount() {
    var self = this;
    $(this.refs.file).change(function () {
      self.setState({
        upstep: 1,
        filename: this.files[0].name,
        base: "",
        ext: ""
      })
      let formData = new FormData();
      formData.append('carfiles', this.files[0])
      upload(formData)
    })
    function upload(formData) {
      var xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function (event) {
        var percent = parseInt(100 * event.loaded / event.total);
        self.setState({
          percent
        })
      }
      xhr.onload = function () {
        self.setState({
          upstep: 2,
          ext: JSON.parse(xhr.responseText).ext,
          base: JSON.parse(xhr.responseText).base
        })
      }
      xhr.open('POST', "http://127.0.0.1:3000/uploadCarFiles", true);
      xhr.send(formData);
    }
  }
  render() {
    const getImageUrl = (ext) => {
      if (ext == ".pdf") {
        return "/src/images/pdf.jpg";
      } else if (ext == ".rar") {
        return "/src/images/zip.jpg";
      } else if (ext == ".docx") {
        return "/src/images/docx.jpg";
      }
    }
    return (
      <div className="step2Box">
        <Button type="primary" onClick={() => { $(this.refs.file).trigger('click') }}>上传文件</Button>
        <input type="file" hidden ref="file" />
        <Modal
          title="正在上传"
          visible={this.state.upstep == 1}
        >
          <div>
            <Progress percent={this.state.percent} status="active" />
          </div>
        </Modal>
        <Modal
          title="请确认文件的名字"
          visible={this.state.upstep == 2}
          destroyOnClose={true}
          onOk={() => {
            this.setState({
              upstep: 0
            })
            this.props.dispatch({
              "type": "addCar/pushForm2", form2: {
                "base": this.state.base,
                "filename": this.state.filename,
                "ext": this.state.ext
              }
            })
          }}
        >
          <div style={{ "textAlign": "center" }}>
            <img src={getImageUrl(this.state.ext)} width="200px" alt="" />
            <h2>{this.state.filename}</h2>
          </div>
        </Modal>
        <div className="fileBox">
          <ul>
            {
              this.props.form2.map(item => {
                return <li
                  key={item.base}
                >
                  <img width="20" src={getImageUrl(item.ext)} alt="" />
                  {item.filename}
                </li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapstate = ({ addCar }) => ({
  form2: addCar.form2
})
export default connect(
  mapstate
)(Step2);
