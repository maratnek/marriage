const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
	name: {
		type: String
	},
	surname: {
		type: String,
		required: true
	},
	fathname: {
		type: String,
		required: true
	},
	sex: {
		type: String,
		required: true
	},
	religion: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
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