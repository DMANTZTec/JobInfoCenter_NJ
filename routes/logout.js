var express = require('express');
var router = express.Router();
router.all('/', function (req, res)
{
   // res.redirect('/home');
    var userName="teja@gmail.com";
    delete req.session.userName;
    res.send("logged out successfully");
    //res.render('home');
    // req.session.destroy();
   // res.redirect(req.get('referer'));
});
module.exports = router;
