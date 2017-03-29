const User = require('../models/user');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Никахлашу' });
});

// date format in YYYY-MM-DD
var dateFormat = (date) => {
	return date.toLocaleString('en-US', 
		{timeZone:'UTC',year:'numeric', month:'numeric', day:'numeric'});
};

function calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

router.get('/registration', function(req, res, next) {
	// var dl = new Date();
	// var str_date = dl.getFullYear()-12 + '-' + ((dl.getMonth()+1)<10 ? '0' + (dl.getMonth()+1) : (dl.getMonth()+1))  + '-' + dl.getDate();
  res.render('registration', {dateLocal: dateFormat(Date())});
});

router.get('/find-person', function(req, res, next) {
  res.render('find-person');
});

router.get('/person/id:token', function(req, res, next) {
	console.log(req.params.token);
	User.getUserById(req.params.token, (err, user)=>{
		if (err) return console.log(err);
		var date = new Date(user.date);
		user.old = calculateAge(date);
		user.dateNew = dateFormat(date);
		console.log(user);
	  res.render('person-anceta', { title: 'Анкета участника', it: user });
	});
});


router.get('/persons', function(req, res, next) {
	User.getUserAll((err, user)=>{
		if (err) return console.log(err);
		console.log(user);
  	res.render('persons', { title: 'Анкеты участников',  person: user.map((it,index)=>{
  		date = new Date(it.date);
  		it.yearsOld = calculateAge(date);
  		it.dateNew = dateFormat(date);
  		return it;	
  	}) });
	});
});

// Register
router.post('/registration', (req,res,next)=>{
	console.log('new user add');
	console.log(req.body);
	let newUser = new User({
		name: 									req.body.name,
		surname: 								req.body.surname,
		fathname: 							req.body.fathname,
		email: 									req.body.email,
		sex: 										req.body.sex,
		date: 									req.body.date,
		religion: 							req.body.religion,
		nation: 								req.body.nation,
		telephone: 							req.body.telephone,
		size: 									req.body.size,
		weight: 								req.body.weight,
		marriage: 							req.body.marriage,
		children: 							req.body.children,
		live_place: 						req.body.live_place,
		svet_edication: 				req.body.svet_edication,
		profession:							req.body.profession,
		work_place:							req.body.work_place,
		religion_edication:			req.body.religion_edication,
		observing:							req.body.observing,
		attribute:							req.body.attribute,
		character:							req.body.character,
		hobby:									req.body.hobby,
		old_min: 								req.body.old_min,
		old_max: 								req.body.old_max,
		religion2: 							req.body.religion2,
		nation2: 								req.body.nation2,
		size2_min: 							req.body.size2_min,
		size2_max: 							req.body.size2_max,
		weight2_min: 						req.body.weight2_min,
		weight2_max: 						req.body.weight2_max,
		marriage2: 							req.body.marriage2,
		children2: 							req.body.children2,
		svet_edication2:				req.body.svet_edication2,
		religion_edication2:		req.body.religion_edication2,
		observing2:							req.body.observing2,
		attribute2:							req.body.attribute2,
		character2:							req.body.character2,
		dopoln:									req.body.dopoln
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

// find person
router.post('/find-person', (req,res,next)=>{
	console.log('find user');
	var fp = req.body;

	console.log(fp);

	User.getUserAll((err, user)=>{
		if (err) return console.log(err);
		var filterUser = user.filter((it,index)=>{
			// if ((fp.sex == 'Мужчину' && it.sex == 'm') || (fp.sex == 'Женщину' && it.sex == 'g'))
			if (fp.sex == it.sex)
				if (fp.religion == it.religion) {
					var date = new Date(it.date);
					it.old = calculateAge(date);
					it.dateNew = dateFormat(date);
					if ((it.old <= fp.old_max && it.old >= fp.old_min) && (it.size <= fp.size2_max && it.size >= fp.size2_min) &&
					    (it.weight <= fp.weight2_max && it.weight >= fp.weight2_min) && it.marriage == fp.marriage)
						if ((it.children == 0 && fp.children == 'no') || (it.children > 0 && fp.children == 'yes')) {
							return it;	
						}
				}
			}) 
		console.log(filterUser);
		res.render('persons', { title: 'Анкеты участников',  person: filterUser	});
	});

});

module.exports = router;
