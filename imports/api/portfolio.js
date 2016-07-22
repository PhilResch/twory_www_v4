import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PortfolioItems = new Mongo.Collection('portfolioItems');

if (Meteor.isServer) {
	Meteor.publish('portfolioItems', 
		function portfolioPublication() {
//			return PortfolioItems.find();
			return PortfolioItems.find({
				$or: [
					{ private: {$ne: true} },
					{ owner: this.userId },
				],
			});
		});
}

Meteor.methods({
	'portfolioItems.insert'(text) {
		check(text, String);
		checkIfIsUser.bind(this);
		PortfolioItems.insert({
			text,
			createdAt: new Date(),
			owner: this.userId,
			username: Meteor.users.findOne(this.userId).username,
		});
	},

	'portfolioItems.remove'(portfolioItemId) {
		checkIfIsUser.bind(this);
		checkIfIsOwner.bind(this)(portfolioItemId);
		check(portfolioItemId, String);
		PortfolioItems.remove(portfolioItemId);
	},

	'portfolioItems.setChecked'(portfolioItemId, setChecked) {
		checkIfIsUser.bind(this);
		checkIfIsOwner.bind(this)(portfolioItemId);
		check(portfolioItemId, String);
		check(setChecked, Boolean);
		PortfolioItems.update(portfolioItemId, { $set: { checked: setChecked} });
	},
	'portfolioItems.setPrivate'(portfolioItemId, setToPrivate) {
		checkIfIsUser.bind(this);
		checkIfIsOwner.bind(this)(portfolioItemId);
		check(portfolioItemId, String);
		check(setToPrivate, Boolean);

		const portfolioItem = PortfolioItems.findOne(portfolioItemId);

		PortfolioItems.update(portfolioItemId, { $set: { private: setToPrivate} });
	},
});

function checkIfIsUser() {
	if (!this.userId) {
		throw new Meteor.Error('not-authorized');
	}
}

function checkIfIsOwner(portfolioItemId) {
	const portfolioItem = PortfolioItems.findOne(portfolioItemId);
	if (portfolioItem.owner !== this.userId) {
		throw new Meteor.Error('not-authorized');
	}
}
