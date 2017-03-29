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

    getInitialState() {
        return {
            editing: null
        };
    }
    
    toggleEditing(itemKey) {
        console.log("toggleEditing toggled.")
        this.setState({editing: itemKey});
        console.log("Currently editing item with key: " + itemKey);
    }

    renderContentOrEditField(item) {
        if(this.state.editing == item.key) {
            return <FormField
                key={item.key}
                name={item.type}
                type={this.determineInputType(item.type)}
                placeholder={item.content}
                defaultValue={item.content}
                onKeyDown={this.updatePost.bind(this)}
                />
        } 
        else {
            return <Content 
                    key={item.key}
                    type={item.type}
                    content={item.content} 
                    onClick={ this.toggleEditing.bind( this, item.key ) }
                    />
        }
    }
    
    determineInputType(item) {
        switch(item) {
            case "title":
            case "paragraph":
                return "textarea";
                break;
            case "image":
                return "file";
                break;
            case "tags":
                return "text";
                break;
            default:
                console.log("WARNING: determineInputType received wrong input type: " + item)
                break;
        }
    }
    
    updatePost(event) {
        event.preventDefault();
        if ( event.keyCode === 13 ) {
            let target = event.target,
                update = { 
                    "contents": {

                     }
                };

            update._id = this.state.editing;
            update[ target.name ] = target.value;

            this.setState({editing : null});
            console.log("Update value: " + JSON.stringify(update));
        }
        console.log("Update post called");
    }
    
    renderPost() {
        let post = this.props.post;

        if(post) {
            return (
                <div>
                    {post.contents.map((item) => {
                        return this.renderContentOrEditField(item)
                    })} 
                </div>
            );
        }
        else {
            return <p>Nothing here yet</p>
        }
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