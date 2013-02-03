var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports = function(app){
	// Messages Routes
	var messages = require('../app/controllers/messages');

	//API Routes
	//app.get('/api/messages/',messages.list);

	// Home Route
	app.get('/',messages.index);
};