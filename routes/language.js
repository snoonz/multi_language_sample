var express = require("express");
var router = express.Router();

// 他の言語へのリンク用にURLをテンプレートに渡す
router.use("/", function(req, res, next) {
  res.locals.urlPath = "/language"+req.path;
  next();
});

router.get("/test", function(req, res, next) {
  res.render("language");
});

module.exports = router;
