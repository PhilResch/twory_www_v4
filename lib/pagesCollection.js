import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PagesCollection = new Mongo.Collection('pagesCollection');

if (Meteor.isServer) {
	Meteor.publish('pagesCollection', function () {
		return PagesCollection.find({});
	});
}


Meteor.methods({
	'pagesCollection.insert'(pages) {
		PagesCollection.insert({
			createdAt: new Date(),
			title: pages.title,
			component: pages.component,
		});
  },
	'pagesCollection.isEmpty'() {
		console.log("pagesCollection.isEmpty responding");
		console.log(PagesCollection.find().fetch().length);
		let PageCount = PagesCollection.find().fetch().length;
		return PageCount;
  }
});