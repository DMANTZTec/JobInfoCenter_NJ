var express    = require('express');
var router     = express.Router();
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.all('/',function (req, res)
{
    var request=req.body.inputJsonStr;
    console.log(request);
    var jsonRequest=JSON.parse(request);
    console.log(jsonRequest);
    var firstname=jsonRequest.firstname,lastname=jsonRequest.lastname,email=jsonRequest.email,
        password=jsonRequest.password,dateOfBirth=jsonRequest.dateOfbirth,gender=jsonRequest.gender,
        phone=jsonRequest.phone,address=jsonRequest.address;
    req.getConnection(function (err,connection)
    {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        var insert_stmt = 'INSERT INTO registeredusers(firstname,lastname,email,password,DOB,gender,phone,address)' +
            ' values(?,?,?,?,?,?,?,?)';
        connection.query(insert_stmt, [firstname, lastname, email, password,dateOfBirth,gender,phone,address], function (err, result, fields) {
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