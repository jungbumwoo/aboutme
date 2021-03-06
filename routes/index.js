var express = require('express');
var router = express.Router();

// var Board = require('../models/board');
import { aboutme_db } from '../app';
var Comment = require('../models/comment');
import { adjlist } from "../list";
import { nounlist } from "../list";
import { mdtohtml } from "../app";
import { db } from "../app.js";


/* GET home page. */

/**
router.get('/', function(req, res, next) {
  var page = req.param('page');
  if(page == null) {page = 1;}

  var skipSize = (page-1)*10;
  var limitSize = 10;
  var pageNum = 1;

  Board.count({deleted:false}, function(err, totalCount) {
    if (err) throw err;

    pageNum = Math.ceil (totalCount/limitSize);
    Board.find({deleted:false}).sort({date:-1}).skip(skipSize).limit(limitSize).exec(function(err, pageContents) {
      if (err) throw err;
      res.render('index', {title: "Board", contents:pageContents, pagination:pageNum});
    });


  });
});
*/
/*
router.get('/', function(req, res, next) {
  Board.find({}, function (err, board) {
    let reverseboard = board.reverse();
    res.render('index', { title: 'Express', board: reverseboard});
  });
});

router.get('/', function(req, res, next) {
  let page = Math.max(1, req.query.page);
  let limit = 4;
  Board.count({}, function(err, count){
    let skip = (page -1)*limit;
    let maxPage = Math.ceil(count/limit);
    Board.find().skip(skip).limit(limit).exec(function (err, board){
      if (err) return res.json({success:false, message:err});
      let reverseboard = board.reverse();
      res.render("index", {
        title: 'Express', board: reverseboard, page:page, maxPage: maxPage
      });
    });
  });
});
 */

router.get('/', function(req, res, next) {
  aboutme_db.query('select id, title, subtitle, description, boardcatagory, comments from bum_table;', function (error, results) {
    if(error) console.log('err: '+ error );
    console.log(`result is :` + results);
    res.render('index', {rows:results} );
  });
});

/*Write board page */
router.get('/write', function(req, res, next) {
  res.render('write', {title: '작성해'});
});

router.get('/catagory2', function(req, res, next) {
  Board.find({}, function (err, board) {
    res.render('catagory2', {title: 'catagory2', board: board});
  });
});

router.get('/catagory3', function(req, res, next) {
  Board.find({}, function (err, board) {
    res.render('catagory3', {title: 'catagory3', board: board});
  });
});

/*board insert mongo */

router.post('/board/write', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.subtitle = req.body.subtitle;
  board.contents = req.body.contents;
  board.board_date = req.body.board_date;

  board.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/');
  });
});

/*board find by id 
router.get('/board/:id', function( req, res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    console.log(board.contents);
    res.render('board', {title: 'Board', board: board, markdowncontents: convertedBody})
  });
});
*/

router.get('/board/:id', function(req, res, next) {
  aboutme_db.query('select id, title, subtitle, description, boardcatagory, comments from bum_table;', function (error, results) {
    if(error) console.log('err: '+ error );
    console.log(`result is :` + results);
    res.render('board', {rows:results} );
  });
});


/*comment insert mongo */
router.post('/comment/write', function(req, res){
  var comment = new Comment();
  comment.contents = req.body.contents;
  
  
  var adjrandom = adjlist[Math.floor(Math.random() * adjlist.length)];
  var nounrandom = nounlist[Math.floor(Math.random() * nounlist.length)];
  comment.author = `${adjrandom} ${nounrandom}`;

  Board.findOneAndUpdate({_id : req.body.id}, { $push: {  comments: comment}}, function (err, board) {
    if(err){
      console.log(err);
      res.redirect('/');

    }
    res.redirect('/board/'+req.body.id);
  });
});


router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

module.exports = router;