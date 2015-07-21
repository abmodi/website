var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('blog', {"url" : "blog"});
});

router.get('/posts', function(req, res, next) {
	var db = req.db;
	var posts = db.collection('posts');
	posts.find({}).toArray(function(e, data){
		res.send(data);
	});
});

router.get('/posts/:id', function(req, res, next){
	var db = req.db;
	var posts = db.collection('posts');
	posts.findOne({'_id':req.params.id}, function(e, data){
		res.send(data);
	});
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/*', function(req, res, next){
	res.render('blog', {"url": "blog"});
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.send({'success': true});
  }
);

router.post('/posts', ensureAuthenticated, function(req, res, next){
	console.log(req.body);
	var db = req.db;
	var post = req.body;
	var title = post.title;
	title = title.toLowerCase();
	var _id = title.replace(' ', '_');
	post._id = _id;
	post.date = new Date();
	var posts = db.collection('posts');
	posts.insert(post, function(e, data){
		res.send(post);
	});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
