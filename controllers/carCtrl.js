var Car = require('../models/Car.js');
var formidable = require('formidable');

exports.showCarInfo = (req, res) => {
  var orderId = req.params.orderId;
  Car.find({ "id": orderId }).exec((err, docs) => {
    res.json({
      "result": docs[0]
    })
  })
}
exports.showCarImages = (req, res) => {
  var orderId = req.params.orderId;
  Car.find({"id": orderId}).exec((err, docs) => {
    res.json({
      "images": docs[0].images
    })
  })
}
exports.showCarLike = (req, res) => {
  var orderId = req.params.orderId;
  Car.find({ "id": orderId }).exec((err, docs) => {
    var brand = docs[0].brand;
    var series = docs[0].series;
    Car.find({ brand, series }).exec((err, docs) => {
      res.json(docs)
    })
  })
}
//模拟filter的数据格式，无非就是数据库中的cars的格式
//这里需要一个数据的转换，主要是将前端页面传过来的数据和服务器的数据相对应
//那么其实就需要我们先提前知道前端要传过来的数据
//实际上应该从完成的前端的页面开始，总结数据的差异
exports.carsearch = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, content) {
    var filters = content.filters;
    var sorter = content.carSorter;
    var pagination = content.carPagination;
    var CHAXUNTI = {};
    filters.forEach(item => {
      CHAXUNTI[item.k] = item.v;
      if (item.k == "km") {//前端传的是万公里
        item.v[0] *= 10000;
        item.v[1] *= 10000;
      }
      if (item.k == "price" || item.k == "km" || item.k == "buydate") {
        CHAXUNTI[item.k] = { "$gte": Number(item.v[0]), "$lte": Number(item.v[1]) };
      }
      if (item.k == "license") {
        CHAXUNTI[item.k] = item.v == "是" ? true : false;
      }
    })
    Car.count(CHAXUNTI, function (err, total) {
      Car.find(CHAXUNTI)
        .sort({ [sorter.field]: sorter.order == "descend" ? -1 : 1 })
        .skip((pagination.current - 1) * pagination.pageSize)
        .limit(pagination.pageSize)
        .exec((err, docs) => {
          res.json({
            total,
            "results": docs
          })
        })
    })
  })
}
