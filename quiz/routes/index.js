var express = require('express');
var router = express.Router();
//var request = require('request');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/colors';
var collection;





MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    collection = db.collection('colors');
    /**
     * TODO: insert data here, once we've successfully connected
     */
  }
});






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
			ret.status(200).json("{'username':"+users[i][0]+"}");
			return;
		}
	}
	users.push(req.query.q);
	ret.status(200).json({username:user[i][0]});

	//collection.insert( X, function(err, result) {	}
});

router.get('/getScore', function(req, res) {
	for(var i = 0; i < users.length; i++) {
		if(users[i][0] == req.query.q) {
			users[i][1] = req.query.score;
			ret.status(200).json("{username:'"+users[i][0]+"', score: '" + users[i][1]+"'}");
			return;
		}
	}
});

var colors = [];
router.get('/addColor', function(req, res){
	console.log(req.query.u);
	console.log(req.query.c);
	console.log(req.query);
	//colors.push( { "username":req.query.u, "color":req.query.c});

	var user = { "username":req.query.u, "color":req.query.c}
	collection.insert(user, function(err, result){
		if(err){
			console.log(err);
		}else{
			console.log("inserted into collection");
		}
		
	});

	//res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.get('/getColors', function(req, res){
	console.log("in getColors");
	//res.send(colors);
	collection.find().toArray(function (err, result) {
		if(err) {
		      console.log(err);
		    } else if (result.length) {
		      console.log("Query Worked");
		      console.log(result);
		      res.send(result);
		    } else {
		      console.log("No Documents found");
		    }
	});
});



module.exports = router;
