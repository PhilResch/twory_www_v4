import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';

import FormField from '../components/formField.jsx';

//////////////////////////////////////////////////////////
import IndividualFile from './fileIndividualFile.jsx';
import {_} from 'meteor/underscore';
import { ImagesCollection } from '../../../lib/imagesCollection.js';
//////////////////////////////////////////////////////////

export default class Editor extends Component {

    insertNewPosts(event) {
        event.preventDefault();       
        
        let title = event.target.title.value;
        let content = event.target.content.value;
        let imageId = "";
        let tags = event.target.tags.value;    
        let slug = getSlug(title);
        
        if (event.target.image.files && event.target.image.files[0]) {
            var file = event.target.image.files[0];

            if (file) {
                let image = {
                    file: file,
                    meta: {
                        associatedArticleTitle: title,
                        tags: tags,
                        userId: Meteor.userId(), // Optional, used to check on server for file tampering
                    //     locator: this.props.fileLocator,
                    },
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true // If you see issues with uploads, change this to false
                }
                
                let uploadInstance = ImagesCollection.insert(image, false);
                
                uploadInstance.on('uploaded', function (error, fileRef) {
                   imageId = fileRef._id; 
                    let newPost = {
                        title: title,
                        content: content,
                        image:  imageId,
       //                tags: tags,
                        slug: slug
                   };
                   Meteor.call('createNewPost', newPost);
                });
                
                uploadInstance.start();
            }
        }
    }
    
    render() {
        if(this.props.docsReadyYet && this.props.postsCollectionIsReady) {
            return (
                <div id="editor" className="u-1/2">
                    <div className="o-box--small ">
                        <h2>Dodawanie artykułów</h2>
                    </div>

                    <form id="testForm" onSubmit={this.insertNewPosts.bind(this)}>
                        <FormField 
                            title="Tytuł artykułu lub nazwa klienta" 
                            type="text" 
                            name="title" 
                            placeholder="Wprowadź tytuł" 
                        />
                        
                        <FormField 
                            title="Tagi" 
                            type="text" 
                            name="tags" 
                            placeholder="np. Logo" 
                        /> 
                        
                        <FormField 
                            title="Treść" 
                            type="textarea" 
                            rows="20"
                            name="content" 
                            placeholder="Wprowadź treść" 
                        />
                        
                       <FormField 
                            title="Obrazki" 
                            id="fileinput"
                            type="file" 
                            name="image" 
                            placeholder="Wprowadź tytuł" 
                        /> 
                        
                        <FormField
                            id="submitButton"
                            type="submit"
                            value="Dodaj artykuł"
                        />
                        
                    </form>
                </div>
            )
        }
        else {
            return <div>Loading posts and images.</div>;
        }
    }
}

export default createContainer(() => {
    postsCollectionSubscription = Meteor.subscribe('postsCollection');
    imagesCollectionSubscription = Meteor.subscribe('files.images.all');
    return { 
        docsReadyYet: imagesCollectionSubscription.ready(),
        docs: ImagesCollection.find().fetch(),
        postsCollectionIsReady: postsCollectionSubscription.ready(),
        
        posts: PostsCollection.find().fetch().map((post) => {
            return {
                uid: post._id,
                href: '/posts/${post._id}/edit',
                label: post.title,
                content: post.content,
                tags: post.tags,
                image: post.image
            };
        })
    };
}, Editor);