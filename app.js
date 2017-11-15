const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const path = require('path');


var api = require('./app/routers/api-router');
var user = require('./app/routers/user-router');

app.use(express.static(path.join(__dirname+'/client')));
app.use(bodyParser.json());

//Router for /api
app.use('/api',api);
//Router for user lgoin and register
app.use('/user',user);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/client/index.html'));
});


//Connecting to mongo Databse
const db = require('./app/config/mongoconnect');
db.on('connected', function () {
    console.log('Connected to DB');
});

app.listen(process.env.PORT || 3000,function(){
    console.log('Listening at Port 3000');
});