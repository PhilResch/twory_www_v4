import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const PortfolioCollection = new Mongo.Collection('portfolioCollection');

if (Meteor.isServer) {
	Meteor.publish('portfolioCollection', function () {
		return PortfolioCollection.find({});
	});
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
	}
});