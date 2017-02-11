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
        let newPost = this.getValuesFromForm(event);
        let file = this.getFileFromForm(event);
        this.promiseToUpload(file)
            .then(function(result) {
                console.log("Result is: " + JSON.stringify(result._id));
                newPost.image = result._id;
                console.log (JSON.stringify(newPost));
            })
            .then(function() {
                Meteor.call('createNewPost', newPost)
            });
    }
    
    promiseToUpload(file) {
        return new Promise((resolve, reject) => {
            ImagesCollection.insert(file, false)
                .on('error', (error, fileRef) => {
                    reject(error, fileRef)
                })
                .on('end', (error, fileRef) => {
                    if (!error) {
                        console.log("Seems like the promise is resolved!");
                        resolve(fileRef);
                    }
                    else {
                        reject(error, fileRef);
                    }
                })
                .start();
        })
    }
    
    getValuesFromForm(event) {
        event.preventDefault();       
        
        let title =  event.target.title.value;
        let content = event.target.content.value;
        let tags = this.convertStringToArray(event.target.tags.value, ",");
        let slug = getSlug(title);

        let formFieldValues = {
            title: title,
            content: content,
            tags: tags,
            slug: slug
        }
        console.log("formFieldValues: " + JSON.stringify(formFieldValues));
        return formFieldValues;
    }
    
    getFileFromForm(event) {
        let fileToInsert ="";
        
        if (event.target.image.files && event.target.image.files[0]) {
            const file = event.target.image.files[0];

            if (file) {
                fileToInsert = {
                    file: file,
                    meta: {
                        associatedArticleTitle: event.target.title.value,
                        tags: this.convertStringToArray(event.target.tags.value, ","),
                        userId: Meteor.userId(),
                    },
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true
                }
            }
        }
        console.log("fileToInsert: " + JSON.stringify(fileToInsert));
        return fileToInsert;
    }

    convertStringToArray(stringToConvert, delimeter) {
       return stringToConvert.split(delimeter);
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