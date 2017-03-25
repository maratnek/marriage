const User = require('../models/user');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Marriage' });
});

// date format in YYYY-MM-DD
var dateFormat = (str_date) => {
	var dl = new Date(str_date);
	return dl.getFullYear()-12 + '-' 
				+ ((dl.getMonth()+1)<10 ? '0' + (dl.getMonth()+1) : (dl.getMonth()+1))  + '-' 
				+ dl.getDate();

}

router.get('/registration', function(req, res, next) {
	// var dl = new Date();
	// var str_date = dl.getFullYear()-12 + '-' + ((dl.getMonth()+1)<10 ? '0' + (dl.getMonth()+1) : (dl.getMonth()+1))  + '-' + dl.getDate();
  res.render('registration', {dateLocal: dateFormat(Date())});
});

router.get('/find-person', function(req, res, next) {
  res.render('find-person');
});

router.get('/persons', function(req, res, next) {
	User.getUserAll((err, user)=>{
		if (err) return console.log(err);
		console.log(user);
  	res.render('persons', { title: 'Persons',  person: user.map((it,index)=>{
  		var p = it;
  		date = new Date(it.date);
  		p.yearsOld = date - Date();
  		console.log(p.yearsOld);
  		p.dateNew = dateFormat(it.date);
  		console.log(dateFormat(it.date));
  		console.log(date.toDateString());
  		return p;	
  	}) });
	});
});

// Register
router.post('/registration', (req,res,next)=>{
	console.log('new user add');
	var newUser = new User({
		name: req.body.name,
		surname: req.body.surname,
		fathname: req.body.fathname,
		sex: req.body.sex,
		date: req.body.date,
		religion: req.body.religion
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
