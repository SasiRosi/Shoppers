var express = require('express');
var router = express.Router();

const users = require('../users.json');
const multipart=require('connect-multiparty');
const multipartMiddleware=multipart({uploadDir: './uploads'});

const executeQuery=require('../modules/sqlscript.js');

router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'JustDoShop' });
});

router.post('/upload',multipartMiddleware, function(req, res, next) {
    
    res.render('upload', { title: 'JustDoShop', fileName :req.files.filetoupload.name });
    //res.send("File caricato");

});

router.post('/', function(req, res, next) {
    let username=req.body.uname;
    let pwd=req.body.psw;
    res.render('account', { title: 'JustDoShop',user : username });
});

router.get('/users', function(req, res, next) {
    executeQuery("select * from users",function(error,results){

    });
    res.render('users', {users : users});
});
  
router.get('/users/:email', function(req, res, next) {
    let user = users.find(u => u.email == req.params.email);
    res.render('user', user);
});


module.exports = router;