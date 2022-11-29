var express = require('express');
var router = express.Router();
var id=10;
id++;
const executeQuery=require('../modules/sqlscript.js');

const session= require('express-session');

router.use(session({ secret : 'bubu' ,
resave: true,
saveUninitialized: true}));

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'JustDoShop' });
});

/*
router.get('/account', function(req, res, next) {
  res.render('account', { title: 'JustDoShop' });
});
*/

router.get('/page-1', function(req, res, next) {
  res.render('page1', { title: 'JustDoShop' });
});

router.get('/page-2', function(req, res, next) {
  res.render('page2', { title: 'JustDoShop' });
});
router.get('/login', function(req, res, next) {
  if(req.session.user){
    return res.redirect('/account');
}
  res.render('login', { title: 'JustDoShop' });
});

router.post('/login', function(req, res, next) {
  //executeQuery(`select id from users where email = '${req.body.uemail}' and password='${req.body.psw}' `,function(error,results){
    executeQuery(`select id from users where email = ? and password= ?`,[req.body.uemail,req.body.psw],function(error,results){


    if(results.length==0){
      res.send("Username o password incorretti");
    }
    else{
      res.writeHead(302,{'Location':'/account'});
      res.end();
    }
  });
});



router.get('/register', function(req, res, next) {
  res.render('register', { title: 'JustDoShop' });
});

router.post('/register', function(req, res, next) {
  executeQuery(`select id from users where email = ?`,[req.body.uemail],function(error,results){
    
    if(results.length>0){
      console.log("la mail inserita gia esiste nel database");
      res.send("la mail inserita gia esiste nel database");
    }
    else{
      if(req.body.psw != req.body.rpsw){
        res.send("le password non coincidono")
      }
      else{

        executeQuery(`insert into users values(297734,?,?,?,?)`,
        [req.body.uname,req.body.usurname,req.body.uemail,req.body.psw],
        function(error,results){
          res.send("utente registrato");
        
        });

      }
    }
});

});


module.exports = router;
