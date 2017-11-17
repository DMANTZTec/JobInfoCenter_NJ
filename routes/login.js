var express    = require('express');
var url        = require("url");
var qs         = require('querystring');
var path       = require('path');
var bodyParser = require('body-parser');
var router     = express.Router();
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router.all('/',function (req, res)
{
    var request=req.body.inputJsonStr;
    console.log(request);
    var jsonRequest=JSON.parse(request);
    console.log(jsonRequest);
    if(jsonRequest.logintype=="facebook")
    {
        var username = jsonRequest.fbusername, usermailid = jsonRequest.fbmailid,
            userid = jsonRequest.fbuserid, provider = "facebook";
    }
    else if(jsonRequest.logintype=="google") {
        var username = jsonRequest.gusername, usermailid = jsonRequest.gmailid,
            userid = jsonRequest.guserid, provider = "google";
    }
    else
    var usermailid=jsonRequest.User,userpassword=jsonRequest.password,provider="native";
    function getDateTime()
    {
        var date = new Date();
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    }
    if(provider=="native")
    {
        req.getConnection(function (err,connection)
        {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log("UserId : " + usermailid);
            var select='SELECT * FROM login WHERE email = ? limit 1';
            connection.query(select, [usermailid], function (error, results, fields) {
                if (error) {
                    console.log("error ocurred");
                    res.send({
                        "code": 400, "failed": "error ocurred"
                    });
                }
                else
                    {
                    console.log('The solution is', results);
                    if (results.length > 0) {
                        //password=results[0].password;
                        console.log(results[0].password);
                        if (results[0].password == userpassword)
                        {
                            var logintime = getDateTime();
                            console.log(logintime);
                            var insert_stmt = 'INSERT INTO nativeloginusers(usermailid) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS(SELECT usermailid FROM nativeloginusers WHERE usermailid = ?)';
                            var update_stmt = 'update nativeloginusers set lastlogintime=? where usermailid=?';
                            var select_stmt='select * from nativeloginusers where usermailid=?';
                            connection.query(insert_stmt, [usermailid, usermailid], function (err, result, fields) {
                                if (err) throw err;
                                console.log("1 record inserted");
                            });
                            connection.query(select_stmt,[usermailid],function (err,result,fields)
                            {
                                if (err) throw err;
                                console.log("retrieved results");
                                console.log(result);
                                res.send(result);
                            });
                            connection.query(update_stmt, [logintime, usermailid], function (err, result, fields) {
                                if (err) throw err;
                                console.log("1 record updated");
                            });
                            console.log("Updated Database");
                            req.session.user_id = usermailid;
                            var hour = 30000;
                            req.session.cookie.expires = new Date(Date.now() + hour);
                            //res.redirect('/loginSuccess');
                            //res.redirect(url.format({
                            //pathname:"/loginSuccess",
                            //query:user}));
                        }
                        else {
                            res.send({
                                "code": 204,
                                "success": "Email and password does not match"
                            });
                        }
                    }
                    else {
                        res.send({
                            "code": 204,
                            "success": "Email does not exits"
                        });
                    }
                }
            });
        });
    }
   if(provider=="facebook")
    {
        var logintime=getDateTime();
        req.getConnection(function(err,connection)
        {
            if (err) throw err;
            console.log("Before Updating Database");
            var insert_stmt='INSERT INTO externalloginusers(provider,username,mailid,userid) ' +
                'SELECT * FROM (SELECT ?,?,?,?) AS tmp ' +
                'WHERE NOT EXISTS(SELECT mailid FROM externalloginusers WHERE mailid = ?)';
            var update_stmt ='update externalloginusers set lastlogintime=? where mailid=?';
            var select_stmt='select * from externalloginusers where mailid=?';
            connection.query(insert_stmt,[provider,username,usermailid,userid,usermailid],function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            connection.query(select_stmt,[usermailid],function (err,result,fields)
            {
                if (err) throw err;
                console.log("retrieved results");
                console.log(result);
               res.send(result);
            });
            connection.query(update_stmt, [logintime, usermailid],function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
            });
            console.log("Updated Database");
        });
        req.session.user_id=usermailid;
    }
     if(provider=="google")
    {
        var logintime=getDateTime();
        req.getConnection(function(err,connection)
        {
            if (err) throw err;
            console.log("Before Updating Database");
            var insert_stmt='INSERT INTO externalloginusers(provider,username,mailid,userid) ' +
                'SELECT * FROM (SELECT ?,?,?,?) AS tmp ' +
                'WHERE NOT EXISTS(SELECT mailid FROM externalloginusers WHERE mailid = ?)';
            var update_stmt ='update externalloginusers set lastlogintime=? where mailid=?';
            var select_stmt='select * from externalloginusers where mailid=?';
            connection.query(insert_stmt,[provider,username,usermailid,userid,usermailid],function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
            connection.query(select_stmt,[usermailid],function (err,result,fields)
            {
                if (err) throw err;
                console.log("retrieved results");
                console.log(result);
                res.send(result);
            });
            connection.query(update_stmt, [logintime, usermailid],function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
            });
            console.log("Updated Database");
        });
        req.session.user_id=usermailid;
    }
});

module.exports = router;
