var express = require('express');
var router = express.Router();

var Board = require('../models/board');
var Comment = require('../models/comment');


/* GET home page. */
router.get('/', function(req, res, next) {
  Board.find({}, function (err, board) {
    res.render('index', { title: 'Express', board: board});
  });
});

/*Write board page */
router.get('/write', function(req, res, next) {
  res.render('write', {title: '작성해'});
});

/*board insert mongo */

router.post('/board/write', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.subtitle = req.body.subtitle;
  board.contents = req.body.contents;
  board.board_date = req.body.board_date;
  console.log(board.contents);

  board.save(function (err) {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/');
  });
});

/*board find by id */
router.get('/board/:id', function( req, res) {
  Board.findOne({_id: req.params.id}, function(err, board) {
    res.render('board', {title: 'Board', board: board})
  })
})

/*comment insert mongo */
router.post('/comment/write', function(req, res){
  var comment = new Comment();
  comment.contents = req.body.contents;
  comment.author = req.body.author;

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
