(function(window,$,_){
	var messages_list = Backbone.Model.extend({
		defaults: {},

		initialize: function(){
			//
		}
	});

	var message_model = Backbone.Model.extend({
		defaults: {
			type: {
				name:'Announcement',
				icon: 'bullhorn'
			},
			from: 'Person',
			message: 'A message',
			image: 'http://i.imgur.com/dlI3AXU.jpg',
			actions: [
				{
					text: 'Action 1',
					action: 'action-1'
				},
				{
					text: 'Action 2',
					action: 'action-2'
				}
			],
			timestamp: '0',
			read: false
		},

		idAttribute: "_id",

		initialize: function(){
			if(this.get('timestamp') == 0){
				this.set('timestamp',moment().format('LLL'));
			}
		}
	});

	$.extend(window.SA.prototype.collection_definitions,{
		messages_collection: Backbone.Collection.extend({
			model: message_model,

			make_new: function(){
				var new_message = {};

				var images = ['http://i.imgur.com/dlI3AXU.jpg','http://i.imgur.com/pmxWhPU.jpg','http://i.imgur.com/UzpofbP.jpg','http://i.imgur.com/MJ3d24T.jpg','http://i.imgur.com/8kEBPsR.jpg'];
				var types = [{name: 'Announcement',icon: 'bullhorn'},{name: 'Meeting',icon: 'calendar'},{name: 'New Picture',icon: 'camera'},{name: 'Vehicle Destroyed',icon: 'fighter-jet'},{name: 'New Email',icon: 'envelope'}]
				var messages = ['Needs moar cowbell!','GET TO DA CHOPPA','Definitely hacks.','I totally agree somewhat possibly not really no','Bet I can fly that Viper better than you','There is no cow level','it\'s time to kickass and chew bubblegum.. and I\'m all outta gum','Schrödinger\'s cat, alive or dead? Hmmm','Most peculiar!','You must build additional pylons!'];
				var name = ['Leeroy','Allen','Bob','Carlton','David','Ernie','Foster','George','Howard','Ian','Jeffery','Kenneth','Lawrence','Michael','Nathen','Orson','Peter','Quinten','Reginald','Stephen','Thomas','Morris','Victor','Walter','Xavier','Charles','Anthony','Gordon','Percy','Conrad','Quincey','Armand','Jamal','Andrew','Matthew','Mark','Gerald'];
				var actions = [[{text: 'Action 1',action: 'action-1'}],[{text: 'Action 1',action: 'action-1'},{text: 'Action 2',action: 'action-2'}],[{text: 'Action 1',action: 'action-1'},{text: 'Action 2',action: 'action-2'},{text: 'Action 3',action: 'action-3'}],[{text: 'Action 1',action: 'action-1'},{text: 'Action 2',action: 'action-2'},{text: 'Action 3',action: 'action-3'},{text: 'Action 4',action: 'action-4'},{text: 'Action 5',action: 'action-5'},{text: 'Action 6',action: 'action-6'}]];

				new_message.image = images[Math.floor(Math.random()*images.length)];
				new_message.message = messages[Math.floor(Math.random()*messages.length)];
				new_message.from = name[Math.floor(Math.random()*name.length)];
				new_message.timestamp = moment().format('LLL');
				new_message.actions = actions[Math.floor(Math.random()*actions.length)];
				new_message.type = types[Math.floor(Math.random()*types.length)];

				this.add(new_message);
			}
		})
	});

	_.extend(window.SA.prototype.model_definitions,{messages_list: messages_list, message_model: message_model});
}(window,jQuery,_));