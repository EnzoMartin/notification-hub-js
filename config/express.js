var express = require('express');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var viewHelpers = require('./middlewares/view');

module.exports = function(app,config,passport){
	app.set('showStackError',true);
	app.use(express.compress(
		{
			filter: function(req,res){
				return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
			},
			level: 9
		}
	));
	app.use(express.static(config.root + '/public'));
	app.use(express.logger('dev'));

	// set views path, template engine and default layout
	app.set('view options',{layout: false});
	app.set('views',config.root + '/app/views');
	app.set('view engine','jade');

	app.configure(function(){
		// dynamic helpers
		app.use(viewHelpers(config));

		// cookieParser should be above session
		app.use(express.cookieParser());

		// bodyParser should be above methodOverride
		app.use(express.bodyParser());
		app.use(express.methodOverride());

		// express/mongo session storage
		app.use(express.session(
			{
				secret: 'messages',
				store: new mongoStore(
					{
						url: config.db,
						collection: 'sessions'
					}
				)
			}
		));

		// connect flash for flash messages
		app.use(flash());

		// common variables
		app.locals({
			common: config.common,
			google_analytics: config.app.google,
			CDN: config.app.CDN
		});

		app.use(express.favicon());

		// routes should be at the last
		app.use(app.router);

		// assume "not found" in the error msgs
		// is a 404. this is somewhat silly, but
		// valid, you can do whatever you like, set
		// properties, use instanceof etc.
		app.use(function(err,req,res,next){
			// treat as 404
			if(~err.message.indexOf('not found')) return next();
			// log it
			console.error(err.stack);
			// error page
			res.status(500).render('500',{ error: err.stack });
		});

		// assume 404 since no middleware responded
		app.use(function(req,res,next){
			res.status(404).render('404',{ url: req.originalUrl });
		})
	});
};