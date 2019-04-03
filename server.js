var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");


var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.use(express.static("public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./routes/html-routes.js");


app.use('/', routes);


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("App running on port 3000!");
});