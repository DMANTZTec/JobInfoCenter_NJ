var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
router.all('/', function (req, res) {
    var request=req.body.inputJsonStr;
    console.log(request);
    var jsonRequest1=JSON.parse(request);
    console.log(jsonRequest1);
    var firstname=jsonRequest1.firstname,lastname=jsonRequest1.lastname,email=jsonRequest1.email,
        country=jsonRequest1.country,subject=jsonRequest1.subject;
    req.getConnection(function (err,connection)
    {
        if (err)
        {
            console.error('error connecting: ' + err.stack);
            return;
        }
        var insert_stmt = 'INSERT INTO contactsection(firstname,lastname,email,country,subject)' +
            ' values(?,?,?,?,?)';
        connection.query(insert_stmt, [firstname, lastname, email,country,subject], function (err, result, fields)
        {
            if (err) {
                throw err;
                var response = {status: "failed", reason: err};
                res.send(response);
                console.log("1 record inserted");
            }

            var response = {status: "success"};
            res.send(response);
        });
    });
});

module.exports = router;