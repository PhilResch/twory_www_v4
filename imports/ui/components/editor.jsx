import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import { ImagesCollection } from '../../../lib/imagesCollection.js';
import FormField from './formField.jsx';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contentComponents: [] 
    };
  }

    renderPosts() {
        if(this.props.post) {
            console.log(this.props);
            return this.getFieldsFromPost(this.props.postId);
        }
        else {
            return (
                <div>
                    {console.log(this.props)}
                    <p>There are no posts. Click the button to create one.</p>
                    <button onClick={this.createNewEmptyPost}>Create new post</button>
                </div>
            );        
        }
    }
    
    getFieldsFromPost(post) {
        return (
            <div>
                <h1>{this.props.post.title}</h1>
                <p>{this.props.post.content}</p>
            </div>
        );
    }
    
    createNewEmptyPost() {
        event.preventDefault();
        let newPost = {
            title: "New post made on " + new Date().toUTCString(),
            content: "Placeholder content",
            tags: "",
            slug: getSlug("New post made on " + new Date().toUTCString())
        }
        
        return Meteor.call('createNewPost', newPost);
    }

    render() {
        return (
            <form id="post-editor">
                {this.renderPosts()}
            </form>
        );
    }
}

Editor.defaultProps = {
//SCHEMA FOR PostsCollection WAS DISABLED TO TEST THIS. REENABLE LATER!
    post: {
            title: "New post made on " + new Date().toUTCString(),
            content: "Placeholder content",
            tags: "",
            slug: getSlug("New post made on " + new Date().toUTCString())
    }
}