var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

var app = express();

var path = require("path");
var fs = require("fs");
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();
// 데이터베이스와 연결합니다.
export const aboutme_db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_database
});

/*
export const aboutme_db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '!wjdqja12',
  database: 'aboutme'
});
*/




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/views')));


app.use('/', indexRouter);
app.use('/users', usersRouter);



//mongodb setup
/*
var mongoose = require('mongoose');
var primise = mongoose.connect( 'mongodb+srv://jungbumwoo:!wjdqja12@cluster0-gnvri.mongodb.net/test?retryWrites=true&w=majority',
 { useNewUrlParser: true,
  useUnifiedTopology: true });

export const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connected successfully');
});

const hljs = require("highlight.js");

const md = require("markdown-it")({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  quotes: "“”‘’",
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  }
});

const directoryPath = path.join(__dirname, "mdfiles");
console.log(directoryPath);

const viewFiles = fs.readdirSync(directoryPath);
console.log(viewFiles);


const contents = () => {
  for(var i = 0; i < viewFiles.length; i++) {
    const filename = viewFiles[i]; 
    const mdbody = fs.readFileSync(`./mdfiles/${filename}`, "utf8")
    const mdconvertedBody = md.render(mdbody);
  }
};
contents();

viewFiles.map(file => {
  const body = fs.readFileSync(`./mdfiles/${file}`, "utf8")
  const convertedBody = md.render(body);  
})

export const mdtohtml = (i) => {
  const filename = viewFiles[i];
  console.log(filename);
  const bodymd = fs.readFileSync(`./mdfiles/${filename}`, "utf8");
  const md_to_html = md.render(bodymd);
  console.log(md_to_html);
}

*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
