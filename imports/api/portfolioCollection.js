import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import { check } from 'meteor/check';
//import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PortfolioCollection = new Mongo.Collection('PortfolioCollection');
/*
let PortfolioSchema = new SimpleSchema ({
	page: { type: String },
	category: { type: String },
	title: { type: String },
	content: { type: String },
	mainImage: { type: String }
});
/*
/*
if (Meteor.isServer) {
	Meteor.publish('PortfolioCollection',
		function returnContentOf(page) {
			let contentPublication = PortfolioCollection.find({"page" : page});	
			if (contentPublication) {
				console.log("Returning contentPublication: " +
					JSON.strigify(contentPublication));
				return contentPublication;
			}
			return this.ready();
		}
	);
}
*/

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
//				PortfolioSchema.validate(content);
				PortfolioCollection.insert(content);
				console.log("PortfolioCollection.insert: " + JSON.stringify(content));
				break;
			default:
				console.log("PortfolioCollection.insert FUBAR");
				break;
		}

		//PortfolioCollection.insert( content );
	},
	'PortfolioCollection.get'() {
		console.log(PortfolioCollection.find().fetch());
		return PortfolioCollection.find().fetch();
	},
});