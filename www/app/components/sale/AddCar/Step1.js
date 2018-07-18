import React from 'react';
import { Row, Col } from 'antd'
import { connect } from 'dva'

class Step1 extends React.Component {
  constructor(props) {
    super(props)
    this.mount = 0;
    this.maps = {
      "view": {},
      "inner": {},
      "engine": {},
      "more": {}
    };
    this.didNo = 0;
  }
  componentDidMount() {
    var self = this;
    var $dropzone = $(".dropzone");
    //拖拽上传
    $dropzone.bind("dragover", function (event) {
      event.preventDefault();
      $(this).addClass('over');
    })
    $dropzone.bind("dragleave", function (event) {
      event.preventDefault();
      $(this).removeClass('over');
    })
    $dropzone.bind("drop", function (event) {
      event.preventDefault();
      $(this).removeClass('over');
      var files = event.originalEvent.dataTransfer.files;
      createPreviewAndLoader(files, $(this).data("album"))
    });
    //点击上传
    $(this.refs.viewfileBtn).click(function () {
      $(self.refs.viewfile).trigger('click')
    })
    this.refs.viewfile.onchange = function () {
      createPreviewAndLoader(this.files, "view")
    }
    $(this.refs.innerfileBtn).click(function () {
      $(self.refs.innerfile).trigger('click')
    })
    this.refs.innerfile.onchange = function () {
      createPreviewAndLoader(this.files, "inner")
    }
    $(this.refs.enginefileBtn).click(function () {
      $(self.refs.enginefile).trigger('click')
    })
    this.refs.enginefile.onchange = function () {
      createPreviewAndLoader(this.files, "engine")
    }
    $(this.refs.morefileBtn).click(function () {
      $(self.refs.morefile).trigger('click')
    })
    this.refs.morefile.onchange = function () {
      createPreviewAndLoader(this.files, "more")
    }
    $(".dropzone").sortable();
    //将上传的图片放入formData队列,将图片读入内存并读取，放入预览窗口
    function createPreviewAndLoader(files, album) {
      for (var i = 0; i < files.length; i++) {
        let no = self.mount++;
        let formData = new FormData();
        formData.append("viewpics", files[i])
        upload(formData, album, no);
        //预览部分
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function (event) {
          var tempStr = `<div data-no=${no} class="${album} previewimgbox" style="background-image: url(${event.target.result});"><em></em></div>`
          $(".dropzone[data-album = " + album + "]").append($(tempStr))
        }
      }
    }
    //添加上传百分比，发送post请求
    function upload(formData, album, no) {
      var xhr = new XMLHttpRequest();
      xhr.upload.onprogress = function (event) {
        var percent = 100 * event.loaded / event.total;
        var $em = $(".previewimgbox." + album + "[data-no=" + no + "]").find("em");
        $em.html("图片正在上传" + parseInt(percent) + "%");
        if (percent == 100) {
          $em.hide();
          self.didNo++;
        }
      }
      xhr.onload = function () {
        self.maps[album][no] = JSON.parse(xhr.responseText).base;
        if (self.didNo == self.mount && self.mount != 0) {//上传文件数等于完成上传文件数时dispatch
          var picArrObj = {
            "view": [],
            "inner": [],
            "engine": [],
            "more": []
          }
          $(".dropzone[data-album=view]").find(".previewimgbox").each(function () {
            picArrObj["view"].push(self.maps["view"][$(this).data("no")])
          })
          $(".dropzone[data-album=inner]").find(".previewimgbox").each(function () {
            picArrObj["inner"].push(self.maps["inner"][$(this).data("no")])
          })
          $(".dropzone[data-album=engine]").find(".previewimgbox").each(function () {
            picArrObj["engine"].push(self.maps["engine"][$(this).data("no")])
          })
          $(".dropzone[data-album=more]").find(".previewimgbox").each(function () {
            picArrObj["more"].push(self.maps["more"][$(this).data("no")])
          });
          self.props.dispatch({ "type": "addCar/pushForm1", "form1": picArrObj })
          if (picArrObj["view"].length != 0 && picArrObj["inner"].length != 0 && picArrObj["engine"].length != 0 && picArrObj["more"].length != 0) {
            self.props.dispatch({ "type": "addCar/letPass", pass: false })
          }
        }
      }
      xhr.open("POST", "http://127.0.0.1:3000/uploadImages", true);
      xhr.send(formData)
    }
  }
  render() {
    return (
      <div className="step1Box">
        <Row>
          <Col span={12}>
            <h3>请上传【外观图片】，点击上传按钮或拖放到方框内</h3>
          </Col>
          <Col span={6}>
            <input ref="viewfile" hidden type="file" multiple="multiple" />
            <span ref="viewfileBtn" className="addBtn">+</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="dropzone" data-album="view"></div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <h3>请上传【内饰图片】，点击上传按钮或拖放到方框内</h3>
          </Col>
          <Col span={6}>
            <input hidden type="file" multiple="multiple" ref="innerfile" />
            <span ref="innerfileBtn" className="addBtn">+</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="dropzone" data-album="inner"></div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <h3>请上传【结构和发动机图片】，点击上传按钮或拖放到方框内</h3>
          </Col>
          <Col span={6}>
            <input hidden type="file" multiple="multiple" ref="enginefile" />
            <span ref="enginefileBtn" className="addBtn">+</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="dropzone" data-album="engine"></div>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <h3>请上传【更多细节图片】，点击上传按钮或拖放到方框内</h3>
          </Col>
          <Col span={6}>
            <input hidden type="file" multiple="multiple" ref="morefile" />
            <span ref="morefileBtn" className="addBtn">+</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="dropzone" data-album="more"></div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapstate = ({ addCar }) => ({
  form0: addCar.form0,
  form1: addCar.form1
})
export default connect(
  mapstate
)(Step1);
