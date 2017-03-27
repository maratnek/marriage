const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
	name: 									{		type: String,		required: true	},
	surname: 								{		type: String,		required: true	},
	fathname: 							{		type: String,		required: true	},
	email: 									{		type: String,			},
	sex: 										{		type: String,		required: true	},
	religion: 							{		type: String,		required: true	},
	date: 									{		type: Date,		required: true	},
	nation: 								{		type: String,		required: true	},
	telephone: 							{		type: Number,		required: true	},
	size: 									{		type: Number,		required: true	},
	weight: 								{		type: Number,		required: true	},
	marriage: 							{		type: String,		required: true	},
	children: 							{		type: Number,		required: true	},
	live_place: 						{		type: String,		required: true	},
	svet_edication: 				{		type: String,		required: true	},
	profession:							{		type: String,		required: true	},
	work_place:							{		type: String,		required: true	},
	religion_edication:			{		type: String,		required: true	},
	observing:							{		type: String,		required: true	},
	attribute:							{		type: String,		required: true	},
	character:							{		type: String,		required: true	},
	hobby:									{		type: String,		required: true	},
	old_min: 								{		type: String,		required: true	},
	old_max: 								{		type: String,		required: true	},
	religion2: 							{		type: String,		required: true	},
	nation2: 								{		type: String	},
	size2_min: 							{		type: Number,		required: true	},
	size2_max: 							{		type: Number,		required: true	},
	weight2_min:						{		type: Number,		required: true	},
	weight2_max:						{		type: Number,		required: true	},
	marriage2: 							{		type: String,		required: true	},
	children2: 							{		type: Number,		required: true	},
	svet_edication2: 				{		type: String			},
	religion_edication2:		{		type: String			},
	observing2:							{		type: String			},
	attribute2:							{		type: String			},
	character2:							{		type: String			},
	dopoln:									{		type: String			}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
	const query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserAll = function (callback) {
	return User.find(callback);
}

module.exports.addUser = function(newUser, callback) {
	newUser.save(callback);
	// bcrypt.genSalt(10, (err, salt) => {
	// 	bcrypt.hash(newUser.password, salt, (err, hash) => {
	// 		if(err) throw err;
	// 		newUser.password = hash;
	// 		newUser.save(callback);
	// 	})
	// });
}

// module.exports.comparePassword = function (candidatePassport, hash, callback) {
// 	bcrypt.compare(candidatePassport, hash, (err, isMatch) => {
// 		if(err) throw err;
// 		callback(null, isMatch);
// 	});	
// }