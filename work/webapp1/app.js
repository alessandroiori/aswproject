var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var recipeController = require("./controller/recipeController");
var cookBookController = require("./controller/cookBookController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/cookbook", cookBookController);
app.use("/recipe", recipeController);

app.use(express.static(__dirname + '/public'));
app.listen(process.env.PORT || 3000);