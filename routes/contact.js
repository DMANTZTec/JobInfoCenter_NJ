var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
router.all('/', function (req, res) {

});
module.exports = router;