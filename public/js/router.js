(function(window,$){
	window.SA.prototype.router = Backbone.Router.extend({
		initialize: function(){
			var header = MJS.get({view: {name: 'header'}});
			var footer = MJS.get({view: {name: 'footer'}});

			header.set_active(Backbone.History.prototype.getHash(window));
		},

		render_loading: function(){
			var loading = MJS.get({view: {name: 'loading'}});
			MJS.render(loading);
		},

		render_home: function(){
			var home = MJS.get({view: {name: 'home'}});
			MJS.render(home);
		},

		render_pages: function(){
			this.render_loading();
			var messages_collection = MJS.get({collection: {name: 'messages_collection'}});
			var messages = MJS.get({view: {name: 'messages_list'},model: {name: 'messages_list'},collection: messages_collection});
			//messages_collection.fetch({update: true});
			MJS.render(messages);
		},

		routes: {
			'home'			: 'render_home',
			'messages'		: 'render_pages'
		}
	});
}(window,jQuery));