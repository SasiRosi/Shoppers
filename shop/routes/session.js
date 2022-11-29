var express = require('express');
var router = express.Router();

const users = require('../users.json');
const multipart=require('connect-multiparty');
const multipartMiddleware=multipart({uploadDir: './uploads'});
const session= require('express-session');

router.use(session({ secret : 'bubu' ,
resave: true,
saveUninitialized: true}));

const executeQuery=require('../modules/sqlscript.js');

router.get('/upload', function(req, res, next) {

    if(!req.session.user){
        return res.redirect('/');
   }

    res.render('upload', { title: 'JustDoShop' });
});

router.post('/upload',multipartMiddleware, function(req, res, next) {
    if(!req.session.user){
        return res.redirect('/');
   }
    
    res.render('upload', { title: 'JustDoShop', fileName :req.files.filetoupload.name });
    //res.send("File caricato");

});

router.get('/', function(req, res, next) {
    
    if(req.session.user){

        return res.render('account', { title: 'JustDoShop', user: req.session.user});
    
    }

    return res.redirect('/');
});

router.get('/logout', function(req, res, next) {
    
    if(req.session.user){

       req.session.user=null;
       req.session.destroy();
    }

    return res.redirect('/');
});


router.get('/account', function(req, res, next) {
    
    if(req.session.user){

       return res.render('account', { title: 'JustDoShop' });
    
    }
    
    return res.redirect('/');
});


router.post('/', function(req, res, next) {
    let email=req.body.uemail;
    let pwd=req.body.psw;

    console.log(email+" aa "+pwd);

    executeQuery(`select id from users where email = ? and password= ?`,[email,pwd],function(error,results){
        if(error) throw error;
        if(results.length==0){
          res.send("Username o password incorretti");
        }
        else{
            req.session.user = email;
            console.log("ttappo");
          return res.redirect('/account');
        }
      });
});

router.get('/users', function(req, res, next) {
        if(!req.session.user){
            return res.redirect('/');
       }

    executeQuery("select * from users",function(error,results){
        if(error) throw error;
        res.render('users', {users : results});
    });
    
});
  
router.get('/users/:email', function(req, res, next) {

    if(!req.session.user){
        return res.redirect('/');
    }

    executeQuery("select * from users where email= '$(req.params.email)' ",function(error,results){
        if(error) throw error;
        res.render('user', {users : results[0]});
    });

    let user = users.find(u => u.email == req.params.email);
    res.render('user', user);
});


module.exports = router;