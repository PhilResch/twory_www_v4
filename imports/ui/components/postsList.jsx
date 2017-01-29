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

    getPosts() {
        let posts = [];
        for (let i=0; i < this.props.posts.length; i++) {
            let imageId = this.props.posts[i].image;
            let imageLink = ImagesCollection.findOne({_id: imageId}).link();
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