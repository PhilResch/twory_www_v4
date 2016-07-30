import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/*
export const Pages = new Mongo.Collection('pages');
if (Meteor.isServer) {
	Meteor.publish('pages',
		function pagesPublication() {
			return Pages.find();
		}
	);
}

Meteor.methods({
//'pages.insert'(page, component, content) {
	'pages.insert'(page, component) {
		check(page, String);
		check (component, String);
//		check (content, Object);
		Pages.insert({
			createdAt: new Date(),
			title: page,
			component: component,
//			content: content,
//			owner: this.userId,
//			username: Meteor.users.findOne(this.userId).username,
		});
	},
});
*/
export const Pages = new Mongo.Collection('pages');
export const ContentCollection = new Mongo.Collection('contentCollection');

if (Meteor.isServer) {
	Meteor.publish('pages',
		function pagesPublication() {
			return Pages.find();
		}
	);

	Meteor.publish('contentCollection',
		function returnContentOf() {
			return ContentCollection.find();
		}
	);
}



Meteor.methods({
//'pages.insert'(page, component, content) {
	'pages.insert'(page, component) {
		check(page, String);
		check (component, String);
//		check (content, Object);
		Pages.insert({
			createdAt: new Date(),
			title: page,
			component: component,
//			content: content,
//			owner: this.userId,
//			username: Meteor.users.findOne(this.userId).username,
		});
	},

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