var express = require('express');
var router = express.Router();
/* GET home page. */
router.all('/', function(req, res, next) {
    //if(req.session.user_id) {
       //res.redirect('/login');
    //}
    //else
  res.render('home', { title: 'Job Info Center',user_id:req.session.user_id});
});
module.exports = router;
