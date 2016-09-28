import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';


export default class PostsList extends Component {
    handleNewPost() {
        Meteor.call('createNewPost', (error, postId) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            }
            else {
                browserHistory.push(`/posts/${ postId }/edit`);
            }
        })
    }
    
    renderPostsList() {
        if (this.data.posts.length > 0) {
            return <ListGroup linked={true} items={this.data.posts} />;
        }
        else {
            return <WarningAlert>No posts found!</WarningAlert>;
        }
    }
    
    insertNewPosts() {
        Meteor.call('createNewPost');
    }
    
    render() {
        return (
             /*
             <GridRow>
                <GridColumn className="column">
                    <SuccessButton type="button" label="New Post" onClick={this.handleNewPost} />
                    <PageHeader size="h4" label="Posts" />
                    {this.renderPostsList()}
                </GridColumn>
             </GridRow>
             */
             <div>
                <h1>WHAT THE FUCK</h1>
                {this.renderPostsList()}
                <button type="button" label="New Post" onClick={this.handleNewPost} />
                <button type="button" label="Insert Post" onClick={this.insertNewPost} />
            </div>
        )
    }
}

export default createContainer(() => {
    postsCollectionSubscription = Meteor.subscribe('postsCollection');
    return {
        posts: PostsCollection.find().fetch().map((post) => {
            return {
                uid: post._id,
                href: '/posts/${post._id}/edit',
                label: post.title
            };
        })
    };
}, PostsList);