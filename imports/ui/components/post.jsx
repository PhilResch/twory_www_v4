import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';
import { PostsCollection } from '../../../lib/postsCollection.js';
import { ImagesCollection } from '../../../lib/imagesCollection.js';


export default class Post extends Component {
    getImageOrPlaceholder(post) {
        if (post.image) {
            return post.image;
        }
        else {
            return "Placeholder image";
        }
    }
    
    getImageLink(imageId) {
        if (imageId == "Placeholder image") {
            return "/img/1.jpg"
        }
        else {
            return ImagesCollection.findOne({_id: imageId}).link();
        }
    }

	render() {
		console.log("------------------------");
		console.log("Post component params: ");
		console.log(this.props);
		
		if (this.props.postIsReady && this.props.imagesAreReady) {
		
			let post = this.props.post;

			let title = post.contents[1]["content"];
			let imageId = this.getImageOrPlaceholder(post);
            let imageLink = this.getImageLink(imageId);
			let content = post.contents;
			let tags = post.tags;

			return ( 
				<ReactCSSTransitionGroup
					transitionName="posts-list"
					transitionAppear={true} 
					transitionAppearTimeout={500} 
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={500}
				>
				
					<div id="post-content" className="u-1/1">
							<div 
								className="o-ratio o-ratio--16:9 postMainImage"
								style= {{backgroundImage: 'url(' + imageLink + ')'}}
							>
							</div>	
							<div className="o-box">
								<h1 className="clientName">
									{title}
								</h1>
								<p className="projectType">
									{tags}
								</p>
								<p className="paragraphCenter">
									{content}					
								</p>
							</div>
					</div>
					
				</ReactCSSTransitionGroup>
			);
		}
		else {
			return <div><h1>Still loading, baby.</h1></div>;
		}
	}
}

export default createContainer((props) => {
	console.log("------------------------");
	console.log("createContainer props: ");
	console.log(props);
	
	postId=PostsCollection.findOne({slug: props.params.slug});
	console.log(postId);
	if(postId) { console.log(postId._id)};

	imagesCollectionSubscription = Meteor.subscribe('files.images.all');	
	imagesCollectionIsLoading = !imagesCollectionSubscription.ready();
	imageExists = !imagesCollectionIsLoading; 	
	console.log("Are the images loading? " + imagesCollectionIsLoading);
	
	singlePostSubscription = Meteor.subscribe('singlePost', props.params.slug);
	singlePostIsLoading = !singlePostSubscription.ready();
	singlePostExists = !singlePostIsLoading;
	console.log("Is the single post loading? " + singlePostIsLoading);

	return {
		imagesAreReady: imagesCollectionSubscription.ready(),
		images: ImagesCollection.find().fetch(),
		
		postIsReady: singlePostSubscription.ready() ? true : false,
		post: singlePostExists ? PostsCollection.findOne({slug: props.params.slug}) : "Fuck"
	};

}, Post)