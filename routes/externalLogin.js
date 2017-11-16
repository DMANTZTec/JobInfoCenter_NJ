var express = require('express');
var url = require("url");
var qs = require('querystring');
var path = require('path');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var router = express.Router();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var connection = mysql.createConnection({
    host     : '10.0.0.5',
    port     : '3306',
    user     : 'shanti',
    password : 'secret',
    database : 'test'
});
router.all('/',function (req, res)
{
    var req1=req.body.inputJsonStr;
    console.log(req1);
    var req2=JSON.parse(req1);
    console.log(req2);
    if(req2.provider=="facebook")
    var username=req2.fbusername,mailid=req2.fbmailid,userid=req2.fbuserid,provider="facebook";
    else
        var username=req2.gusername,mailid=req2.gmailid;
                        function getDateTime()
                        {
                            var date = new Date();
                            var hour = date.getHours();
                            hour = (hour < 10 ? "0" : "") + hour;
                            var min  = date.getMinutes();
                            min = (min < 10 ? "0" : "") + min;
                            var sec  = date.getSeconds();
                            sec = (sec < 10 ? "0" : "") + sec;
                            var year = date.getFullYear();
                            var month = date.getMonth() + 1;
                            month = (month < 10 ? "0" : "") + month;
                            var day  = date.getDate();
                            day = (day < 10 ? "0" : "") + day;
                            return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
                        }
                        var time = getDateTime();
                        console.log(time);
                        connection.connect(function(err)
                        {
                            if (err) throw err;
                            console.log("Before Updating Database");
                            var insert_stmt='INSERT INTO externalloginusers(provider,username,mailid,userid) ' +
                                'SELECT * FROM (SELECT ?,?,?,?) AS tmp ' +
                                'WHERE NOT EXISTS(SELECT mailid FROM externalloginusers WHERE mailid = ?)';
                            var update_stmt ='update externalloginusers set lastlogintime=? where mailid=?';
                            connection.query(insert_stmt,[provider,username,mailid,userid,mailid],function (err, result) {
                                if (err) throw err;
                                console.log("1 record inserted");
                            });
                            //connection.query('insert into nativeloginusers(usermailid) values(?) where not exists(select usermailid from nativeloginusers where usermailid=?)', [user,[user]]);
                            connection.query(update_stmt, [time, mailid],function (err, result) {
                                if (err) throw err;
                                console.log("1 record updated");
                            });
                            console.log("Updated Database");
                        });
                     //   req.session.userName = user;
                       // if (req.session.visited)
                          //  req.lastVisit = req.session.visited;
                        //req.session.visited = Date.now();
                        //console.log(req.session.visited);
                        //var hour = 30000;
                        //req.session.cookie.expires = new Date(Date.now() + hour);
                        //res.redirect('/loginSuccess');
                        //res.redirect(url.format({
                        //pathname:"/loginSuccess",
                        //query:user}));

        });

module.exports = router;