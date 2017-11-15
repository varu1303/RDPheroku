const express = require('express');
const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const user = require('./../models/user');
mongoose.Promise = global.Promise;

router.post('/login',function(req,res){

    user.findOne({email: req.body.logEmail})
        .then(function(d){
            if(!d){
                res.status(404).send('User not found');
            }
            bcrypt.compare(req.body.logPass, d.password, function(err, response) {
                if(err){
                    res.status(500),send('Something Wrong');
                } else{
                    if(response){
                        var token = jwt.sign({
                              data: {userID: req.body.logEmail, userName: d.userName, admin: d.admin}
                        }, 'secret', { expiresIn: '10h' });
                        res.send(token);
                    }else{
                        res.status(401).send('Incorrect Password');
                    }
                }
            });
        })
        .catch(function(e){
            res.status(500).send('Something Wrong');
        });

});

router.post('/register',function(req,res){
    
    var newU = req.body;
    
    var u = new user({
        userName: newU.userName,
        email: newU.userEmail,
        password: newU.userPass,
        tech: newU.techSelect
    });
    
    u.save()
        .then(function(d){
            res.send(d);
    })
        .catch(function(e){
            res.status(400).send(e);
    });
});

router.put('/RDP',function(req,res){
    
        console.log(req.body);

        user.findOne({email: req.body.RDPemail})
        .then(function(d){
            if(!d){
                throw {}
            }else{
                console.log('found',d);
                d.RDP.push({name: req.body.RDPname, status: req.body.RDPstatus, date: req.body.RDPdate});
                return d.save();
            }
        })
        .then(function(d){
            console.log('pushed in array',d);
            res.send('Updated in databse');
        })
        .catch(function(e){
            res.status(500).send('Something Wrong');
        });
    
    
});

router.get('/RDP',function(req,res){
    var authorization = req.get('authorization');
    var token = authorization.split('Bearer ')[1];
    var e;

    jwt.verify(token, 'secret', function(err, decoded) {
  // err
        if(err){
            res.status(401).send(err);
        } else {
            console.log(decoded.data.userID);
            e = decoded.data.userID;
        }
  
    });
    user.findOne({email: e})
        .then(function(d){
            console.log('found',d);
            res.send(d.RDP);
        })
        .catch(function(e){
            res.status(500).send('Something Wrong');
        });    
});


router.patch('/RDP',function(req,res){
    
        console.log(req.body);

        user.findOne({email: req.body.email})
        .then(function(d){
            if(!d){
                throw {}
            }else{
                console.log('found',d);
                d.RDP.remove();
                d.RDP = req.body.embed;
                return d.save();
            }
        })
        .then(function(d){
            console.log('pushed in array',d);
            res.send('Updated in databse');
        })
        .catch(function(e){
            res.status(500).send('Something Wrong');
        });
    
    
});

router.get('/allorders',function(req,res){
    var authorization = req.get('authorization');
    var token = authorization.split('Bearer ')[1];

    jwt.verify(token, 'secret', function(err, decoded) {
  // err
        if(err){
            res.status(401).send(err);
        } else {
            var x = [];
            user.find({})
                .then(function(d){
                    d.forEach(function(val){
                            console.log(val.RDP.length);
                            x.push({name: val.userName, count: val.RDP.length});
                    });
                res.send(x);
            })
                .catch(function(e){
                    res.status(500).send(e);
            });
        }
  
    });

});






























module.exports = router;
