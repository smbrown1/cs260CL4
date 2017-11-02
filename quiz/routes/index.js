var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var trivia = "https://opentdb.com/api.php?amount=10&type=boolean"; 
router.get('/getQuestions', function(req, res){
	request(trivia).pipe(res);
});

var users = [];
router.get('/getUser', function(req, res){
	for(var i=0; i<users.length; i++)
	{
		if(users[i][0] == req.query.q)
		{
			ret.status(200).json({username:users[i][0]});
			return;
		}
	}
	users.push([req.query.q, 0]);
	ret.status(200).json({username:users[i][0]});
});

router.get('/getScore', function(req, res) {
	for(var i = 0; i < users.length; i++) {
		if(users[i][0] == req.query.q) {
			users[i][1] = req.query.score;
			ret.status(200).json({username:users[i][0], score:users[i][1]});
			return;
		}
	}
}

module.exports = router;
