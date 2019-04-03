var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;

//db configuration
// mongoose.connect("");
// var db = mongoose.connection;

//mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

//success message if successfull 
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

module.exports = db;

