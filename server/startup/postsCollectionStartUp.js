import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { PostsCollection } from '/lib/postsCollection';

Meteor.startup( () => {

    if(PostsCollection.find({}).count() == 0) {
        
        function generateKey() {
            return Math.random();
        }
        
        let samplePostTitle = "Hello. This is a sample post.";
        let slug = getSlug(samplePostTitle); 
        
        let samplePost = {
                dateCreated: new Date().toTimeString(),
                slug: slug,
                tags: "",
                
                contents: [
                {
                    key: generateKey(),
                    type: "image",
                    content: "Placeholder image"
                },
                {
                    key: generateKey(),
                    type: "title",
                    content: samplePostTitle,
                },
                {
                    key: generateKey(),
                    type: "paragraph",
                    content: "This article is just a sample."
                },
                {
                    key: generateKey(),
                    type: "paragraph",
                    content: "This one is a sample, too!"
                }
            ],
        }
        console.log(samplePost);
        Meteor.call('createNewPost', samplePost);
    }
});