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
    user     : 'root',
    password : 'secret',
    database : 'test'
});
router.all('/',function (req, res)
{
    var req1=req.body.inputJsonStr;
    console.log(req1);
    var req2=JSON.parse(req1);
    console.log(req2);
    var user=req2.User,pass=req2.password;
    connection.connect(function()
    {
        connection.query('SELECT * FROM login WHERE email = ? limit 1',[user], function (error, results, fields)
        {
            if (error)
            {
                console.log("error ocurred");
                res.send({
                    "code":400,"failed":"error ocurred" });
            }
            else
            {
                console.log('The solution is', results);
                if(results.length >0)
                {
                    pass1=results[0].password;
                    console.log(pass1);
                    if(pass1 == pass)
                    {
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
                        connection.connect(function()
                        {
                            connection.query('INSERT INTO nativeloginusers(usermailid) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS(SELECT usermailid FROM nativeloginusers WHERE usermailid = ?)',[user,user]);
                            //connection.query('insert into nativeloginusers(usermailid) values(?) where not exists(select usermailid from nativeloginusers where usermailid=?)', [user,[user]]);
                            connection.query('update nativeloginusers set lastlogintime=? where usermailid=?', [time, user]);
                        });
                       //response=connection.query('select * from nativeloginusers where usermailid=?',[user],function (err,result)
                        //{
                         //return result;
                        //});
                        //console.log(response);
                        //response1=JSON.stringify(response);
                        req.session.userName = user;
                        if (req.session.visited)
                            req.lastVisit = req.session.visited;
                        req.session.visited = Date.now();
                        console.log(req.session.visited);
                        var hour = 30000;
                        req.session.cookie.expires = new Date(Date.now() + hour);
                       // res.send(response1);
                        //res.redirect('/loginSuccess');
                        //res.redirect(url.format({
                        //pathname:"/loginSuccess",
                        //query:user}));
                    }
                    else
                    {
                        res.send({
                            "code":204,
                            "success":"Email and password does not match"  });
                    }
                }
                else
                {
                    res.send({
                        "code":204,
                        "success":"Email does not exits"  });
                }
            }
        });
    });
});
module.exports = router;