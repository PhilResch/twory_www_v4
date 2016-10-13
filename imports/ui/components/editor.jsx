import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import PostsListItem from './postsListItem.jsx';
import FileIndividualFile from '../components/fileIndividualFile.jsx';
import FileUpload from '../components/fileUpload.jsx';

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
                <div id="editor">
                    <form id="testForm" onSubmit={this.insertNewPosts.bind(this)}>
                        <h1>
                            <input 
                                type="text" 
                                name="title" 
                                defaultValue="Wprowadź nazwę klienta" />
                        </h1>
                        <br />
                        
                        Opis projektu:<br />
                        <textarea rows="20" name="content" defaultValue="Wprowadź opis projektu."></textarea>
                        <br/>
                        
                        Tagi:<br />
                        <input type="text" name="tags" defaultValue="Projekt logo" />
                        <br /><br />
                        
                        Obrazki: <br />
                        <input 
                            type="file"
                            name="image"
                            id="fileinput" 
    //                        disabled={this.state.inProgress} 
                            ref="fileinput"
                        />
                        <br /><br />
                        
                        <input type="submit" value="Submit"/>
                    </form>
                    <br /><hr /><br />
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