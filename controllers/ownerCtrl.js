var url = require('url')
var Owner = require('../models/Owner.js')
exports.ownerSearch = (req , res) => {
  var { order = "ascend", field = "id", current = 1, pageSize = 10, keyword = "" } = url.parse(req.url, true).query;
  var keywordRegExp = new RegExp(keyword, "g");
  var CHAXUN = {
    "$or": [
      { "name": keywordRegExp },
      { "mobile": keywordRegExp },
      { "city": keywordRegExp },
      { "idCard": keywordRegExp },
      { "email": keywordRegExp }
    ]
  };

  Owner.count(CHAXUN , (err , total) => {
    Owner
    .find(CHAXUN)
    .sort({[field] : order == "ascend" ? 1 : -1})
    .skip((current - 1) * pageSize)
    .limit(pageSize)
    .exec((err , docs) => {
      res.json({
        total,
        "results" : docs
      })
    })
  })
}
