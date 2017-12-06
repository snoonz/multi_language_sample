var express = require("express");
var router = express.Router();

var fs = require("fs");
var urls = JSON.parse(fs.readFileSync('./data/images.json', 'utf8'));

// 他の言語へのリンク用にURLをテンプレートに渡す
router.use("/", function(req, res, next) {
  res.locals.urlPath = "/api"+req.path;
  next();
});

router.get("/images", function(req, res, next){
  res.json(urls);
});

router.get("/images/:id", function(req, res, next){
  const id = parseInt(req.params.id);
  let result = urls[id];
  if (id > 0) {
    let index = id - 1;
    result.prev = "http://localhost:4000/images/"+index;
  }
  if (id < urls.length - 2) {
    let index = id + 1;
    result.next = "http://localhost:4000/images/"+index;
  }
  res.json(result);
});

module.exports = router;
