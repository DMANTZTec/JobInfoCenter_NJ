var express=require('express');
var router=express.Router();
var auth = function(req, res, next)
{
    if (req.session && req.session.user_id)
    {
        return next();
    }
    else
        return res.sendStatus(401);
};
router.all('/', auth, function (req, res)
{
    console.log(req.session.user_id);
    res.send("You can only see this after you've logged in.");
    //res.send(req.session);
});
module.exports = router;