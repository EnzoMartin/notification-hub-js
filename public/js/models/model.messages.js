(function(window,$,_){
	var messages_list = Backbone.Model.extend({
		defaults: {},

		initialize: function(){
			//
		}
	});

	var message_model = Backbone.Model.extend({
		defaults: {
			form_values	: [],
			error		: ''
		},

		idAttribute: "_id",

		initialize: function(){
			//
		}
	});

	$.extend(window.SA.prototype.collection_definitions,{
		message_collection: Backbone.Collection.extend({
			model: message_model
		})
	});

	_.extend(window.SA.prototype.model_definitions,{pages_list: messages_list, page_model: messages_list});
}(window,jQuery,_));