var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JustDoShop' });
});

router.get('/page-1', function(req, res, next) {
  res.render('page1', { title: 'JustDoShop' });
});

router.get('/page-2', function(req, res, next) {
  res.render('page2', { title: 'JustDoShop' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'JustDoShop' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'JustDoShop' });
});



module.exports = router;
