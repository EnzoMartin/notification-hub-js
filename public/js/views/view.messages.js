(function(window,$,_,ich,moment){
	_.extend(window.SA.prototype.view_definitions,{
		messages_list: Backbone.View.extend({
			events: {
				'click .add-new-message'		: 'new_message',
				'click .message-filter'			: 'toggle_filter',
				'click #clear-all-messages'		: 'clear_all'
			},

			id: 'messages-list',

			initialize: function(){
				this.collection.on('add',this.add_message,this);
				this.collection.on('remove',this.remove_message,this);
				this.message_views = {};
				this.message_counts = MJS.get({view:{name:'message_counts'},model:this.model,collection:this.collection});
			},

			new_message: function(){
				this.collection.make_new();
			},

			clear_all: function(e){
				e.preventDefault();
				var timeout = 0;
				var views = _.toArray(this.message_views);
				_.each(views,function(view){
					window.setTimeout(function(){
						view.close();
					},timeout);
					timeout = timeout + 100;
				});
			},

			toggle_filter: function(e){
				e.preventDefault();
				var target = $(e.currentTarget);
				var filter = target.attr('data-filter');
				target.parent('li').toggleClass('active');
				this.$el.find('#messages-list').toggleClass('hide-'+filter);
				this.expand_first();
				this.$el.find('.new-message:visible:first').removeClass('message-condensed');
			},

			expand_first: function(){
				this.$el.find('.message-condensed:visible:first').removeClass('message-condensed');
				this.$el.find('.new-message:not(:first)').addClass('message-condensed');
			},

			add_message: function(model){
				var view = new MJS.view_definitions.message({model:model});
				this.message_views[view.cid] = view;
				this.message_views[view.cid].on('remove',function(){
					this.collection.remove(view.model);
					delete this.message_views[view.cid];
				},this);
				this.$el.find('#messages-list').prepend(view.render().el);
				this.expand_first();
			},

			remove_message: function(model){
				this.expand_first();
				console.log('deleted');
				this.$el.find('.message-condensed:first').removeClass('message-condensed');
			},

			render: function(){
				this.$el.html(ich.tpl_messages_box(this.model.toJSON()));
				this.$el.find('#messages-unread').html(this.message_counts.render().el);
				this.delegateEvents();
			}
		}),

		message_counts: Backbone.View.extend({
			tagName: 'ul',

			className: 'nav nav-pills',

			initialize: function(){
				this.collection.on('all',this.render,this);
			},

			render: function(){
				var counts = _.toArray(this.collection.get_counts());
				this.$el.html(ich.tpl_message_counts(counts));
				return this;
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
				//
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
				var target = $(e.currentTarget);
				MJS.alert({type:'success',message:'You\'ve dismissed the notification and clicked the button ' + target.text()});
				this.close();
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