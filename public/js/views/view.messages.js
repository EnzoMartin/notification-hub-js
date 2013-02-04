(function(window,$,_,ich,moment){
	_.extend(window.SA.prototype.view_definitions,{
		messages_list: Backbone.View.extend({
			events: {
				'click .add-new-message'	: 'new_message'
			},

			id: 'messages-list',

			initialize: function(){
				this.collection.on('add',this.add_message,this);
				this.collection.on('destroy',this.remove_message,this);
				this.message_views = {};
			},

			new_message: function(){
				this.collection.make_new();
			},

			add_message: function(model){
				console.log('message added',model);
				var view = new MJS.view_definitions.message({model:model});
				this.message_views[view.cid] = view;
				this.message_views[view.cid].on('remove',function(){
					console.log('delete',view.cid);
					delete this.message_views[view.cid];
				},this);
				this.$el.find('#messages-list').prepend(view.render().el);
				this.$el.find('.new-message:not(:first)').addClass('message-condensed');
			},

			remove_message: function(model){
				console.log('message deleted',model);
			},

			render: function(){
				this.$el.html(ich.tpl_messages_box(this.model.toJSON()));
			}
		}),

		message: Backbone.View.extend({
			events: {
				'click .btn'				: 'action',
				'click .close'				: 'close',
				'click .icon-chevron-down'	: 'expand',
				'click .icon-chevron-up'	: 'condense'
			},

			tagName: 'li',

			className: 'new-message',

			initialize: function(){
				console.log('new view',this);
			},

			expand: function(){
				this.$el.removeClass('message-condensed');
			},

			condense: function(){
				this.$el.addClass('message-condensed');
			},

			close: function(){
				var $view = this;
				$view.$el.stop().hide('slide',{direction:'right'},function(){
					$view.remove();
				});
			},

			action: function(e){
				console.log('click',e.currentTarget);
			},

			render: function(){
				var $view = this.$el;
				$view.html(ich.tpl_message(this.model.toJSON())).addClass(this.model.get('type').icon);
				$view.find('img').load(function(){
					$view.show('slide',{direction:'up'});
				});
				return this;
			}
		})
	});
}(window,jQuery,_,ich,moment));