/* Library of small useful global functions */
_.extend(window,{
	SALib: {}
});

(function(window,document,$,_,yepnope,undefined){
	SALib = function(){
	};

	SALib.prototype = {
		load: function(files,callback){
			var loading = this.get_view('loading');
			loading.render();

			var files_loaded = this.files_loaded;
			var files_needed = _.difference(files,files_loaded);
			this.files_loaded = files_loaded.concat(files_needed);
			if(files_needed.length){
				var last = _.last(files_needed);
				yepnope([
					{
						load: files_needed,
						callback: function(url){
							if(url === last){
								return callback();
							}
						}
					}
				]);
			} else {
				return callback();
			}
		},

		alert: function(alert_data){
			var header = this.get({view:{name:'header'}});
			var type;
			var title;
			var message;
			var alert_type = (typeof alert_data === 'string')? alert_data : alert_data.type;
			switch(alert_type){
				case 'success':
					type = 'success';
					title = 'Success!';
					message = 'Action completed successfully!';
					break;
				case 'warning':
					type = 'block';
					title = 'Warning!';
					message = 'Issue detected!';
					break;
				case 'error':
					type = 'error';
					title = 'Error!';
					message = 'An error occurred!';
					break;
				case 'info':
					type = 'info';
					title = 'Info:';
					message = 'This is an informational message';
					break;
			}

			alert_data.type = alert_data.type || type;
			alert_data.title = alert_data.title || title;
			alert_data.message = alert_data.message || message;
			header.trigger('alert',alert_data);
		},

		modal: function(data,callback){
			var modal = this.get({view:{name:'modal'},model:{name:'modal',data:data,options:{callback: callback}}});
			modal.show_modal();
		}
	};
}(window,document,jQuery,_,yepnope));