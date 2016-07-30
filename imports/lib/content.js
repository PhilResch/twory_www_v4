import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//import { check } from 'meteor/check';
//import {SimpleSchema} from 'meteor/aldeed:simple-schema';

//export const ContentCollection = new Mongo.Collection('contentCollection');
/*
let PortfolioSchema = new SimpleSchema ({
	page: { type: String },
	category: { type: String },
	title: { type: String },
	content: { type: String },
	mainImage: { type: String }
});
*/
/*
if (Meteor.isServer) {
	Meteor.publish('ContentCollection',
		function returnContentOf(page) {
			let contentPublication = ContentCollection.find({"page" : page});	
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
/*
if (Meteor.isServer) {
	Meteor.publish('contentCollection',
		function returnContentOf() {
			return ContentCollection.find();
		}
	);
}

Meteor.methods({
	'contentCollection.insert'(page, content) {
		switch (page) {
			case "portfolio":
//				PortfolioSchema.validate(content);
				ContentCollection.insert(content);
				console.log("cotentCollection.insert: " + JSON.stringify(content));
				break;
			default:
				console.log("contentCollection.insert default fuckup");
				break;
		}

		//ContentCollection.insert( content );
	},
});
*/