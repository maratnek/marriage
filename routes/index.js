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


// Register
router.post('/register', (req,res,next)=>{
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
			res.json({success: true, msg: 'User registered'});
		}
	});

});

module.exports = router;
