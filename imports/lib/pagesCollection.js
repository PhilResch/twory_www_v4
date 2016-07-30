import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PagesCollection = new Mongo.Collection('PagesColllection');

if (Meteor.isServer) {
	Meteor.publish('PagesCollection',
		function publishPagesCollection() {
			//return PagesCollection.find();
			return PagesCollection.find();
		}
	);
}

Meteor.methods({
	'PagesCollection.insert'(page, component) {
		check(page, String);
		check (component, String);
		PagesCollection.insert({
			createdAt: new Date(),
			title: page,
			component: component,
//			owner: this.userId,
//			username: Meteor.users.findOne(this.userId).username,
		});
		console.log("PagesCollection.insert inserted: " + page + " and " + component);
		console.log("PagesCollection now holds: " + JSON.stringify(PagesCollection.find({}).fetch()));
	},
});