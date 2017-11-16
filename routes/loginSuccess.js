var express=require('express');
var router=express.Router();
var auth = function(req, res, next) {
    if (req.session && req.session.userName=="teja@gmail.com")
    {
        //  req.session.lastVisited = Date.now(); //LOOK here
        return next();
    }
    else
        return res.sendStatus(401);
};
router.all('/', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
    //res.send(req.session);

});
module.exports = router;