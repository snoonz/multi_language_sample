// 基本設定
var express = require("express");
var fs = require("fs");
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

const languages = JSON.parse(fs.readFileSync('./data/languages.json', 'utf8'));
app.locals.languages = languages;

// 言語付きのアクセス時に言語を設定する
app.get("/:lang*", function(req, res, next) {
  const path = req.params.lang;
  console.log(path);
  for (var i = 0; i < languages.length; i++) {
    const language = languages[i];
    if (language.id == path) {
      // i18n.setLocale(req, req.session.locale); などを行う
      console.log(language.name);
      next();
      return;
    }
  }
  console.log(req.path);
  res.redirect("/");
});



// 言語名の有無に影響を受けずアクセス可能
app.use("/:lang?/api/", require("./routes/api.js"));
app.use("/:lang?/language/", require("./routes/language.js"));

var server = app.listen(4000, function() {
  console.log("Node.js is listening to PORT:" + server.address().port);
});
