var mongoose = require('mongoose')
module.exports = mongoose.model("Owner" ,{
  id : Number,
  name : String,
  mobile : String,
  sex : String,
  city : String,
  idCard : String,
  email : String
})
