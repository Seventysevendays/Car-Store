var formidable = require('formidable');
var path = require('path')
var Car = require('../models/Car.js')
var gm = require('gm')
var fs = require('fs')

exports.uploadImages = (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, "../www/uploadImages");
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    res.json({
      "result": 1,
      "base": path.parse(files.viewpics.path).base
    })
  })
}
exports.uploadCarFiles = (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.resolve(__dirname, '../www/uploadCarFiles/')
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    res.json({
      "base": path.parse(files.carfiles.path).base,
      "ext": path.parse(files.carfiles.path).ext
    })
  })
}
exports.addCar = (req, res) => {
  var uploadbase = path.resolve(__dirname, '../www/uploadImages/');
  var carimagesbase = path.resolve(__dirname, '../www/src/carimages/')
  var carimagessmallbase = path.resolve(__dirname, '../www/src/carimages_small/')
  Car.count({}, (err, total) => {
    var id = total + 1000000 + 1;//在当前有的文件夹的基础上加1
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
      var form0 = JSON.parse(fields.form0);
      var form1 = JSON.parse(fields.form1);
      var form2 = JSON.parse(fields.form2);

      fs.mkdirSync(carimagesbase + "/" + id);
      fs.mkdirSync(carimagesbase + "/" + id + "/view");
      fs.mkdirSync(carimagesbase + "/" + id + "/inner");
      fs.mkdirSync(carimagesbase + "/" + id + "/engine");
      fs.mkdirSync(carimagesbase + "/" + id + "/more");

      fs.mkdirSync(carimagessmallbase + "/" + id);
      fs.mkdirSync(carimagessmallbase + "/" + id + "/view");
      fs.mkdirSync(carimagessmallbase + "/" + id + "/inner");
      fs.mkdirSync(carimagessmallbase + "/" + id + "/engine");
      fs.mkdirSync(carimagessmallbase + "/" + id + "/more");

      for (var i = 0; i < form1.view.length; i++) {
        fs.copyFileSync(uploadbase + '/' + form1.view[i], carimagesbase + "/" + id + "/view/" + form1.view[i]);
        gm(uploadbase + '/' + form1.view[i])
          .resize(150, 100)
          .write(carimagessmallbase + "/" + id + "/view/" + form1.view[i], function () {
            return
          })
      };

      for (var i = 0; i < form1.inner.length; i++) {
        fs.copyFileSync(uploadbase + '/' + form1.inner[i], carimagesbase + "/" + id + "/inner/" + form1.inner[i]);
        gm(uploadbase + '/' + form1.inner[i])
          .resize(150, 100)
          .write(carimagessmallbase + "/" + id + "/inner/" + form1.inner[i], function () {
            return
          })
      };

      for (var i = 0; i < form1.engine.length; i++) {
        fs.copyFileSync(uploadbase + '/' + form1.engine[i], carimagesbase + "/" + id + "/engine/" + form1.engine[i]);
        gm(uploadbase + '/' + form1.engine[i])
          .resize(150, 100)
          .write(carimagessmallbase + "/" + id + "/engine/" + form1.engine[i], function () {
            return
          })
      };

      for (var i = 0; i < form1.more.length; i++) {
        fs.copyFileSync(uploadbase + '/' + form1.more[i], carimagesbase + "/" + id + "/more/" + form1.more[i]);
        gm(uploadbase + '/' + form1.more[i])
          .resize(150, 100)
          .write(carimagessmallbase + "/" + id + "/more/" + form1.more[i], function () {
            return
          })
      };

      Car.create({
        "brand": form0.brandAndSeries.value[1],
        "series": form0.brandAndSeries.value[2],
        "price": form0.price.value,
        "km": form0.km.value * 10000,
        "exhaust":form0.exhaust.value[0],
        "color":form0.color.value,
        "fuel":form0.fuel.value[0],
        "gearbox":form0.gearbox.value[0],
        "seat":form0.seat.value,
        "images": form1,
        "id": id,
        "avatar": form1.view[0],
        "buydate": Date.parse(form0.buyDate.value),
        "carfiles": form2,
      }, function () {
        res.json({
          "result": 1
        })
      })
    })
  })
}
