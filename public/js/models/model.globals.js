(function(window,$,_){
	var modal = Backbone.Model.extend({
		defaults: {
			button			: 'primary',
			'button-text'	: 'Confirm'
		}
	});

	_.extend(window.SA.prototype.model_definitions,{modal: modal});
}(window,jQuery,_));