var express = require('express');
var router = express.Router();
var auth = function(req, res, next)
{
    if (req.session && req.session.user_id)
    {
        return next();
    }
    else
        return res.sendStatus(401);
};
router.all('/',auth, function (req, res)
{
    console.log(req.session.user_id);
    console.log(req.session.logintype);
    req.session.destroy();
            var response = {status: "success", reason: "session expired"};
            res.send(response);
});
module.exports = router;
