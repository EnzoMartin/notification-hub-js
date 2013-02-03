var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
	title: {type: String,trim: true},
	type: {type: String,trim: true},
	from: {type: String,trim: true},
	message: {type: String,trim: true},
	actions: {type: String,trim: true},
	createdAt: {type: Date,default: Date.now},
	seenAt: {type: Date,default: Date.now},
	deletedAt: {type: Date},
	read: {'type': Boolean,'default': false}
});

mongoose.model('Message',MessageSchema);

/*
	[
		{
			type: 'friend_request',
			from: 'Bob',
			message: 'wants to be your friend',
			actions: [
				{
					text: 'Accept',
					action: '/accept/x'
				},
				{
					text: 'Reject',
					action: '/reject/x'
				}
			],
			timestamp: '120213901',
			read: false
		},
		{
			type: 'damage_received',
			from: 'Rat',
			message: 'deals 6 damage',
			actions: [],
			timestamp: '120211901',
			read: true
		},
		{
			type: 'item_pickup',
			from: 'Inventory',
			message: 'you got a sword!',
			expanded_message: '<stats>',
			actions: [
				{
					text: 'Equip',
					action: equipItem(itemId)
				}
			],
			timestamp: '120211901',
			read: true
		}
	]
*/