const User = require('../models/user');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Marriage' });
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.get('/persons', function(req, res, next) {
	User.getUserAll((err, user)=>{
		if (err) return console.log(err);
		console.log(user);
  	res.render('persons', { title: 'Persons', person: user });
	});
});

// Register
router.post('/registration', (req,res,next)=>{
	console.log('new user add');
	let newUser = new User({
		name: req.body.name,
		surname: req.body.surname,
		fathname: req.body.fathname,
		sex: req.body.sex
	});
	console.log(newUser);

	User.addUser(newUser, (err, user)=>{
		if(err){
			res.json({success: false, msg: 'Failed to register user'});
		} else {
			// res.json({success: true, msg: 'User registered'});
		  res.redirect('/');
		}
	});
});

module.exports = router;
