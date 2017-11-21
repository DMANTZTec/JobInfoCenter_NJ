var express = require('express');
var router = express.Router();
router.all('/', function (req, res)
{
    console.log(req.session.user_id);
    req.session.destroy();
    //console.log(req.session.user_id);
    //delete req.session.user_id;
    if(!req.session)
    {
        var response={status:"success",reason:"session expired"};
        res.send(response);
    }
    else
    {   var response={status:"failed",reason:"user is still logged in"};
        res.send(response);
    }
});
module.exports = router;
