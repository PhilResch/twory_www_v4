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
            console.log("this.props.post: ");
            console.log(this.props.post);
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
                            key={item.key}
                            type={item.type}
                            content={item.content} 
                        />
                })} 
            </div>
        );
    }
    
    uploadChanges() {
        event.preventDefault();
    }

    render() {
        console.log(this.props);
        return (
            <form id="post-editor">
                {this.renderPost()}
            </form>
        );
    }
}

export default createContainer((props) => {
	console.log("createContainer receives:");
    console.log(props);
	postId=PostsCollection.findOne({slug: props.params.slug});
    console.log(postId);
	imagesCollectionSubscription = Meteor.subscribe('files.images.all');	
	imagesCollectionIsLoading = !imagesCollectionSubscription.ready();
	imageExists = !imagesCollectionIsLoading; 	
	
	singlePostSubscription = Meteor.subscribe('singlePost', props.params.slug);
	singlePostIsLoading = !singlePostSubscription.ready();
	singlePostExists = !singlePostIsLoading;

	return {
		imagesAreReady: imagesCollectionSubscription.ready(),
		images: ImagesCollection.find().fetch(),
		
		postIsReady: singlePostSubscription.ready() ? true : false,
		post: singlePostExists ? PostsCollection.findOne({slug: props.params.slug}) : undefined
	};

}, Editor)