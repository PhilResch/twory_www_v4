import { PostsCollection } from './postsCollection.js';

if (Meteor.isServer) {
    Meteor.publish( 'singlePost', ( postSlug ) => {
    //check( postSlug, String );

    return PostsCollection.find( { slug: postSlug } );
    });
}