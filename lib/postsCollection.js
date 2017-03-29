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
  createNewPost(newPost) {
    console.log("createNewPost called with object: " + JSON.stringify(newPost));
    return PostsCollection.insert(newPost);
  },
  
  updatePost(update) {
    console.log("updatePost called with object: " + JSON.stringify(update));
    console.log("update.selector: " + update.selector);
    console.log("update.changes: " + update.changes);
    return PostsCollection.update(update.selector, {$set: update.changes});
  }
})