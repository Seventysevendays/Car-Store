var express = require('express');
var app = express();
var mongoose = require('mongoose')

var carCtrl = require('./controllers/carCtrl.js')
var adminCtrl = require('./controllers/adminCtrl.js')
var ownerCtrl = require('./controllers/ownerCtrl.js')
var addCtrl = require('./controllers/addCtrl')

mongoose.connect("localhost/car")

app.use(express.static("www"))

//ShowCar的接口
app.get('/carinfo/:orderId', carCtrl.showCarInfo)
app.get('/carimages/:orderId' , carCtrl.showCarImages)
app.get('/carlike/:orderId' , carCtrl.showCarLike)
//CarFiter的接口
app.post('/carsearch' , carCtrl.carsearch)
//Admin的接口
app.get('/getAvatar' , adminCtrl.getAvatar)
app.post('/uploadAvatar' , adminCtrl.uploadAvatar)
app.post('/docut' , adminCtrl.docut)
//owners
app.get('/owner' , ownerCtrl.ownerSearch)
//addCar
app.post('/uploadImages' , addCtrl.uploadImages)
app.post('/uploadCarFiles' , addCtrl.uploadCarFiles)
app.post('/addCar' , addCtrl.addCar)

app.listen(3000)

