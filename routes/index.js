var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {"url" : "about"});
});

router.get('/resume', function(req, res, next) {
	res.render('resume', {url: "resume"});
});

router.get('/portfolio', function(req, res, next){
	res.render('portfolio', {url: "portfolio"});
});

router.get('/contact', function(req, res, next){
	res.render('contact', {url: "contact"});
});

module.exports = router;
