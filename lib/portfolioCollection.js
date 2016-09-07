import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const PortfolioCollection = new Mongo.Collection('PortfolioCollection');

if (Meteor.isServer) {
	Meteor.publish('PortfolioCollection',
		function publishPortfolioCollection() {
			return PortfolioCollection.find({});
		}
	);
}

Meteor.methods({
	'PortfolioCollection.insert'(page, content) {
		switch (page) {
			case "portfolio":
				PortfolioCollection.insert(content);
				console.log("PortfolioCollection.insert: " + JSON.stringify(content));
				break;
			default:
				console.log("PortfolioCollection.insert FUBAR");
				break;
		}

	},
	'PortfolioCollection.get'() {
		console.log(PortfolioCollection.find().fetch());
		return PortfolioCollection.find().fetch();
	},
});