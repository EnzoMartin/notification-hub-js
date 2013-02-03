$(function(window,$,yepnope,undefined){
	"use strict";
	var ichUrl = '/js/libraries/icanhaz-0.10.5.js';
	var load_files = [
		'/js/libraries/mustache-0.7.2.js',
		ichUrl,
		'/css/font-awesome.min.css',
		'/css/jquery.tagsinput.css',
		'/css/structure.css',
		'/js/libraries/jquery-ui-1.10.0.custom.min.js',
		'/js/libraries/toe.min.js',
		'/js/libraries/moment-1.7.2.min.js',
		'/js/libraries/underscore-1.4.3.min.js',
		'/js/libraries/backbone-0.9.10.min.js',
		'/js/libraries/bootstrap.min.js',
		'/js/libraries/jquery.tagsinput.min.js',
		'/js/messages.js',
		'/js/lib.js',
		'/js/router.js',
		'/js/views/view.globals.js',
		'/js/views/view.messages.js',
		'/js/models/model.globals.js',
		'/js/models/model.messages.js'
	];
	var increment = 100 / load_files.length;
	var progress_bar = $('#progress_bar_inner');

	function load_progress(i){
		progress_bar.stop().animate({width: ((increment * i) + '%')});
	}

	yepnope({
		load: load_files,
		callback: function(url,r,i){
			if(url === ichUrl){
				ich.grabTemplates();
			}
			load_progress(i + 1);
		},
		complete: function(){
			window.setTimeout(function(){
				$('#loading').slideUp(function(){
					var MJS = new window.SA();
					$(this).remove();
					_.extend(window,{MJS:MJS});

					MJS.init({ CDN: '/' });

					console.log('Views',MJS.view_definitions);
					console.log('Models',MJS.model_definitions);
					console.log('Collections',MJS.collection_definitions);
					console.log('PBC Object',MJS);
				});
			},1000);
		}
	});
}(window,jQuery,yepnope));