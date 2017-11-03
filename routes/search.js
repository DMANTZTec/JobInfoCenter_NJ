var express = require('express');
var router = express.Router();
var url = require("url");
var qs = require('querystring');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var SolrNode = require('solr-node');
var client = new SolrNode({
    host: 'localhost',
    port: '8983',
    core: 'jobsearch',
    protocol: 'http'
});
router.post('/',
    function (req, res)
    {
       // var que=req.getParameter("inputJsonStr");
        console.log(req.body);
        //console.log(req.body.inputJsonStr);
var req1=req.body.inputJsonStr;
var req2=JSON.parse(req1);
console.log(req2);
          var strQuery = client.query().q(req2.searchtext);
        client.search(strQuery, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Response:', result.response);
            res.send(result.response);
            //res.render('search',{result:result.response,title:'jobinfocentre'});
        });
    });
//router.get('/', function(req, res, next) {
  //  res.render('search', { title: 'Search' });
//});
module.exports = router;