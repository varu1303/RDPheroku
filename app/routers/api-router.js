const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.get('/allorders',function(req,res){
    var authorization = req.get('authorization');
    var token = authorization.split('Bearer ')[1];

    jwt.verify(token, 'secret', function(err, decoded) {
  // err
        if(err){
            res.status(401).send(err);
        } else {
            res.send('ok');
        }
  
    });

});


module.exports = router;
