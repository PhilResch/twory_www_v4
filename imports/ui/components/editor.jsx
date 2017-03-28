import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import { ImagesCollection } from '../../../lib/imagesCollection.js';
import FormField from './formField.jsx';
import Content from './content.jsx';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        contentComponents: [] 
    };
  }

    renderPost() {
        if(this.props.post) {
            return this.getFieldsFromPost();
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
    
    getFieldsFromPost() {
        let post = this.props.post;
        return (
            <div>
                {post.contents.map((item) => {
                    return <Content 
                            type={item.type}
                            content={item.content} 
                        />
                })} 
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
                {this.renderPost()}
            </form>
        );
    }
}

Editor.defaultProps = {
//SCHEMA FOR PostsCollection WAS DISABLED TO TEST THIS. REENABLE LATER!
    post: {
            tags: "",
            contents: [
                {
                    type: "image",
                    content: "/img/1.jpg"
                },
                {
                    type: "title",
                    content: "New post made on " + new Date().toUTCString(),
                },
                {
                    type: "paragraph",
                    content: "Lorem ipsum"
                },
                {
                    type: "paragraph",
                    content: "Dolor sit"
                }
            ],
    }
}