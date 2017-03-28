import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import PostsListItem from './postsListItem.jsx';

//////////////////////////////////////////////////////////
import IndividualFile from './fileIndividualFile.jsx';
import {_} from 'meteor/underscore';
import { ImagesCollection } from '../../../lib/imagesCollection.js';
//////////////////////////////////////////////////////////

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PostsList extends Component {

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

    getPosts() {
        let posts = [];
        for (let i=0; i < this.props.posts.length; i++) {
            //let imageId = this.props.posts[i].image;
            //let imageLink = ImagesCollection.findOne({_id: imageId}).link();
            let imageId = this.getImageOrPlaceholder(this.props.posts[i]);
            let imageLink = this.getImageLink(imageId);
            posts.push({
                _id: i,
                title: this.props.posts[i].label,
                content: this.props.posts[i].content,
                tags: this.props.posts[i].tags,
                image: imageLink,
                slug: this.props.posts[i].slug
            });
        }
        return posts;
    }
    

    renderPosts() {
        if (this.props.posts.length == 0) {
            console.log("Is this shit called?");
            return (
                <div>
                    <h2>Sorry, there are no posts yet. There should be a big Twory logo with eyes closed in shame.</h2>
                    <h3>Also, clean up renderPosts() in PostList, dumbass.</h3>
                </div>
            );
        } else { 
            return this.getPosts().map((post) =>(
                <PostsListItem 
                    key={post._id} 
                    title={post.title} 
                    content={post.content} 
                    tags={post.tags}
                    image={post.image}
                    slug={post.slug}
                    parentPathname = {this.props.location.pathname}
                    />
            ));
        }
    }

    render() {
        console.log(this.props);
        if(this.props.docsReadyYet && this.props.postsCollectionIsReady) {
            return (
                <div className="o-box-negative-margin">
                    <ReactCSSTransitionGroup
                        transitionName="posts-list"
                        transitionAppear={true} 
                        transitionAppearTimeout={500} 
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={500}
                    > 
                        {this.renderPosts()}
                    </ReactCSSTransitionGroup>
                </div>
            )
        }
        else {
            return <div>Loading list of posts</div>;
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
                href: `/posts/${post._id}/edit`,
                label: post.title,
                content: post.content,
                tags: post.tags,
                image: post.image,
                slug: post.slug
            };
        })
    };
}, PostsList);