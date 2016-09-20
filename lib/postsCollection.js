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