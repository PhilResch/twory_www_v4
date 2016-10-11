import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import PostsListItem from './postsListItem.jsx';
import FileIndividualFile from '../components/fileIndividualFile.jsx';
import FileUpload from '../components/fileUpload.jsx';

//////////////////////////////////////////////////////////
import {ReactMeteorData} from 'meteor/react-meteor-data';
import IndividualFile from './fileIndividualFile.jsx';
import {_} from 'meteor/underscore';
import { ImagesCollection } from '../../../lib/imagesCollection.js';
//////////////////////////////////////////////////////////

export default class PostsList extends Component {

    constructor(props){
        super(props)
       
        this.state = {
            uploading: [],
            progress: 0,
            inProgress: false
        }
    }

    getPosts() {
        let posts = [];
        for (let i=0; i < this.props.posts.length; i++) {
            posts.push({
                _id: i,
                title: this.props.posts[i].label,
                content: this.props.posts[i].content,
//              image: this.props.posts[i].image
// http://localhost:3000/cdn/storage/ImagesCollection/
// albo
// http://localhost:3000/cdn/storage/ImagesCollection/jR8hzcw2k3fRLvR48/original/jR8hzcw2k3fRLvR48.jpg
            });
        }
        return posts;
    }

    renderPosts() {
        return this.getPosts().map((post) =>(
            <PostsListItem 
                key={post._id} 
                title={post.title} 
                content={post.content} 
                image={post.image}/>
        ));
    }
    
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
                   console.log("HERE'S NEWPOST: " + JSON.stringify(newPost));
                   Meteor.call('createNewPost', newPost);
                });
                
                uploadInstance.start();
            }
        }
    }
    
    render() {
        console.log("PostsList props: ");
        console.log(this.props);
        
        console.log("Fetched Images Collection: ");
        console.log(ImagesCollection.find().fetch());

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
                {this.renderPosts()}       
            </div>
        )
    }
}

export default createContainer(() => {
    postsCollectionSubscription = Meteor.subscribe('postsCollection');
    imagesCollectionSubscription = Meteor.subscribe('files.images.all');
    return { 
        docsReadyYet: imagesCollectionSubscription.ready(),
        docs: ImagesCollection.find().fetch(),
        
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
}, PostsList);