import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
//^are these two lines redundant?

export const PostsCollection = new Mongo.Collection('postsCollection');

PostsCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

PostsCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

if (Meteor.isServer) {
  Meteor.publish('postsCollection', function () {
    return PostsCollection.find({});
  });
}

Meteor.methods({
  createNewPost() {
    return PostsCollection.insert({});
  }
})