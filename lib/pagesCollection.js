import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export var PagesCollection = new Mongo.Collection('pagesCollection');

if (Meteor.isServer) {
	console.log("This is the server speaking from pagesCollection");	
	Meteor.publish('pagesCollection', function () {
		console.log("Is publish ever called?");
		return PagesCollection.find({});
	});

}

let PagesSchema = new SimpleSchema ({
	title: { type: String },
	component: { type: String },
});

Meteor.methods({
  'pagesCollection.insert'(pages) {
  		PagesSchema.validate(pages);
		PagesCollection.insert({
		createdAt: new Date(),
		title: pages.title,
		component: pages.component,
//	      owner: this.userId,
//	      username: Meteor.users.findOne(this.userId).username,
	    });
  },
	'pagesCollection.isEmpty'() {
		console.log("pagesCollection.isEmpty responding");
		console.log(PagesCollection.find().fetch().length);
		let PageCount = PagesCollection.find().fetch().length;
		return PageCount == 0 ? true : false;
  }
});