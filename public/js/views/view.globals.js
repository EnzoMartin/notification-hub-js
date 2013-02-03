(function(window,$,_,ich){
	_.extend(window.SA.prototype.view_definitions,{
		header: Backbone.View.extend({
			events: {
				'click .navbar a'	: 'set_active',
				'alert'				: 'trigger_alert'
			},

			el: '#header',

			initialize: function(){
				this.on('alert',this.trigger_alert,this);
				this.render();
			},

			trigger_alert: function(alert){
				var alert_html = ich.tpl_alert(alert);
				this.$el.find('.navbar').append(alert_html);
				this.$el.find('#header-alert').fadeIn(300);
				this.error_timeout = window.setTimeout(function(){
					$('#header-alert').fadeOut(300,function(){
						$(this).remove();
					});
				},2500);

				this.$el.find('.close').on('click',function(){
					this.$el.find('#header-alert').remove();
					clearTimeout(this.error_timeout);
				}, this);
			},

			set_active: function(e){
				var path = (typeof e === 'object') ? $(e.currentTarget).attr('href') : '#' + e.split('/')[0];
				this.$el.find('li').removeClass('active');
				this.$el.find('a[href=' + path + ']').parent('li').addClass('active');
			},

			render: function(){
				this.$el.html(ich.tpl_header());
			}
		}),

		home: Backbone.View.extend({
			id: 'admin-home',

			render: function(){
				this.$el.html(ich.tpl_home());
			}
		}),

		loading: Backbone.View.extend({
			id: 'loading',

			className: 'internal',

			render: function(){
				this.$el.html(ich.tpl_loader());
			}
		}),

		footer: Backbone.View.extend({
			el: '#footer',

			initialize: function(){
				this.render();
			},

			render: function(){
				this.$el.html(ich.tpl_footer());
			}
		}),

		modal: Backbone.View.extend({
			events: {
				'click .btn-confirm'	: 'confirm'
			},

			id: 'confirm-dialogue',

			initialize: function(){
				this.render();
			},

			show_modal: function(){
				$('#footer').append(this.el);
				this.$modal.modal();
				this.delegateEvents();
			},

			confirm: function(){
				var modal = this;
				this.$modal.on('hidden', function () {
					if(!_.isUndefined(modal.model.callback)){
						modal.model.callback();
					}
					modal.remove();
				});
				this.$modal.modal('hide');
			},

			render: function(){
				this.$el.html(ich.tpl_confirm_dialogue(this.model.toJSON()));
				this.$modal = this.$el.find('#modal');
			}
		})
	});
}(window,jQuery,_,ich));