var fs = require('fs');
var path = require('path');
var Mock = require('mockjs')
var Random = Mock.Random;

var writtenPath = path.resolve(__dirname,'模拟车主数据.txt')
for(var i = 0; i < 5000; i ++){
    var one = {
        "id" : 100000 + i,
        "name" : Random.cname(),
        "mobile" : Mock.mock(/^((13[0-9])|(14[57])|(15[0-9])|(16[67])|(17[78])|(18[0-9]))\d{8} $/),
        "sex" : Random.pick(["男","女"]),
        "city" : Random.city(true),
        "idCard" : Random.integer(100000000000000000,900000000000000000),
        "email" : Random.email()
    }
    fs.appendFileSync(writtenPath,JSON.stringify(one) + "\n\r")
};
console.log("ok")
