import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PagesCollection = new Mongo.Collection('pagesColllection');

if (Meteor.isServer) {
	console.log("This is the server speaking from pagesCollection");	
	Meteor.publish('pagesCollection', function () {
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
		return PagesCollection.find().fetch().length === 0 ?
			true : false;
  }
});