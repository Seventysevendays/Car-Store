var path = require('path')
var Admin = require('../models/Admin.js')
var formidable = require('formidable')
var gm = require('gm')
//用于获取头像的接口
exports.getAvatar = (req , res) => {
  Admin.find({"email":"xuxiang@shuaibi.com"}).exec((err,docs) => {
    if(docs[0].avatar){
      var avatar = path.resolve(__dirname,"../www/avatar/"+docs[0].avatar)
    }else{
      var avatar = path.resolve(__dirname,"../www/avatar/default.jpg")
    }
    res.sendFile(avatar)
  })
}
//用于上传路径的
exports.uploadAvatar = (req , res) => {
  var form = new formidable.IncomingForm();
  //设置上传路径
  form.uploadDir = path.resolve(__dirname , '../www/uploadAvatar')
  //保持拓展名
  form.keepExtensions = true;
  form.parse(req , (err , fields , files) => {
    var base = path.parse(files.adminavatar.path).base;
    gm(path.resolve(__dirname , "../www/uploadAvatar/" + base))
    .size((err , size) => {
      res.send("<script>window.parent.onUpDone("+base+",+"+size.width+","+size.height+")</script>")
    })
  })
}
exports.docut = (req, res) => {
  var form = new formidable.IncomingForm();
  // 设置上传的路径
  form.uploadDir = path.resolve(__dirname, "../www/uploadAvatar");
  // 保持文件的拓展名字
  form.keepExtensions = true;
  form.parse(req, function (err, { w, h, l, t, picurl }, files) {
    gm(path.resolve(__dirname, "../www/uploadAvatar/" + picurl))
      .crop(w, h, l, t)
      .resize(160, 160)
      .write(path.resolve(__dirname, "../www/avatar/" + picurl), function () {
        // 改变数据库
        Admin.update({ "email": "xuxiang@shuaibi.com" }, { "$set": { "avatar": picurl } }, function () {
          res.json({
            "result": 1
          })
        })
      })
  })
}
