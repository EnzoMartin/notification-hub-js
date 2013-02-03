var mongoose = require('mongoose');

// Home message
exports.index = function(req,res){
	res.render('home');
};