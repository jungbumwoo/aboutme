var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var time = new Date();
var year = time.getFullYear();
var month = time.getMonth() + 1;
var date = time.getDate();
var hour = time.getHours();
var minute = time.getMinutes();

var commentSchema = new Schema({
    contents: String,
    author: String,
    comment_date: {type: String, default: year + "/" + month +"/" + date +"/" + hour + "/" + minute}
});

var boardSchema = new Schema({
    title: String,
    subtitle: String,
    boardcatagory: Number,
    contents: String,
    contents_id: Number,
    author: String,
    fileUrl: String,        
    board_date: {type: String, default: year + "/" + month +"/" + date},
    comments: [commentSchema]
})



module.exports = mongoose.model('board', boardSchema);
