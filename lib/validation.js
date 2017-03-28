import { PagesCollection } from './pagesCollection.js';
import { PostsCollection } from './postsCollection.js';
import { ImagesCollection } from './imagesCollection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

var Schemas = {};

Schemas.Pages = new SimpleSchema ({
    title: { type: String },
    component: { type: String },
});


Schemas.Posts = new SimpleSchema({
    "published": {
        type: Boolean,
        label: "Is this post published?",
        autoValue() {
            if(this.isInsert) {
                return false;
            }
        }
    },
    "updated": {
        type: String,
        label: "The date this post was last updated on.",
        autoValue() {
            return (new Date()).toISOString();
        }
    },
    "title": {
        type: String,
        label: "The title of this post.",
        defaultValue: "Untitled Post"
    },
    
    "slug": {
        type: String,
        label: "The slug of this post.",
        autoValue() {
            let slug = this.value,
                existingSlugCount = PostsCollection.find({_id: {$ne: this.docId}, slug: slug}).count(), 
                existingUntitled = PostsCollection.find({slug: {$regex: /untitled-post/i}}).count();
            
            if (slug) {
                return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
            }
            else {
                return existingUntitled > 0 ? `untitled-post-${ existingUntitled + 1 }` : 'untitled-post';
            }
        }
    },
    "content": {
        type: String,
        label: "The content of this post.",
        optional: true
    },
    "image": {
        type: String,
        label: "The image used in this post",
        /*
        autoValue() {
            return "/img/twory_www_logo_v1.svg"
        }
        */
        optional: true
    },
    "tags": {
        type: [ String ],
        label: "The tags for this post.",
        optional: true
    },
    "author": {
        type: String,
        label: "The ID of the author of this post.",
        autoValue() {
            let user = Meteor.users.findOne({_id: this.userId});
            if (user) {
                return `${user.profile.name}`;
            }
        }
    }
});

Schemas.Images = new SimpleSchema({
    size: {                                                                                                        //
        type: Number                                                                                                 //
    },                                                                                                             //
    name: {                                                                                                        //
        type: String                                                                                                 //
    },                                                                                                             //
    type: {                                                                                                        //
        type: String                                                                                                 //
    },                                                                                                             //
    path: {                                                                                                        //
        type: String                                                                                                 //
    },                                                                                                             //
    isVideo: {                                                                                                     //
        type: Boolean                                                                                                //
    },                                                                                                             //
    isAudio: {                                                                                                     //
        type: Boolean                                                                                                //
    },                                                                                                             //
    isImage: {                                                                                                     //
        type: Boolean                                                                                                //
    },                                                                                                             //
    isText: {                                                                                                      //
        type: Boolean                                                                                                //
    },                                                                                                             //
    isJSON: {                                                                                                      //
        type: Boolean                                                                                                //
    },                                                                                                             //
    isPDF: {                                                                                                       //
        type: Boolean                                                                                                //
    },                                                                                                             //
    extension: {                                                                                                   //
        type: String,                                                                                                //
        optional: true                                                                                               //
    },                                                                                                             //
    _storagePath: {                                                                                                //
        type: String                                                                                                 //
    },                                                                                                             //
    _downloadRoute: {                                                                                              //
        type: String                                                                                                 //
    },                                                                                                             //
    _collectionName: {                                                                                             //
        type: String                                                                                                 //
    },                                                                                                             //
    "public": {                                                                                                    //
        type: Boolean,                                                                                               //
        optional: true                                                                                               //
    },                                                                                                             //
    meta: {                                                                                                        //
        type: Object,                                                                                                //
        blackbox: true,                                                                                              //
        optional: true                                                                                               //
    },                                                                                                             //
    userId: {                                                                                                      //
        type: String,                                                                                                //
        optional: true                                                                                               //
    },                                                                                                             //
    updatedAt: {                                                                                                   //
        type: Date,                                                                                                  //
        optional: true                                                                                               //
    },                                                                                                             //
    versions: {                                                                                                    //
        type: Object,                                                                                                //
        blackbox: true                                                                                               //
    },
    // Deviating from the Meteor-Files default Schema beyond this point
    includedInArticles: {
        type: [String],
        optional: true,
    }
})

//PostsCollection.attachSchema(Schemas.Posts)
PagesCollection.attachSchema(Schemas.Pages);
//can't get custom schema to attach itself
//ImagesCollection.collection.attachSchema(new SimpleSchema(ImagesCollection.schema));
//ImagesCollection.collection.attachSchema(Schemas.Images);