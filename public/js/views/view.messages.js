(function(window,$,_,ich,moment){
	_.extend(window.SA.prototype.view_definitions,{
		messages_list: Backbone.View.extend({
			events: {
				//
			},

			id: 'messages-list',

			initialize: function(){
				this.listenTo(this.collection,'all',this.render);
			},

			render: function(){
				//
			}
		})
	});
}(window,jQuery,_,ich,moment));