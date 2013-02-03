var express = require('express');
var fs = require('fs');

// Load configurations
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file){
	require(models_path + '/' + file);
});

var app = express();
// express settings
require('./config/express')(app,config);

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
var port = process.env.PORT || 3100;
app.listen(port);
console.log('Express app started on port ' + port);