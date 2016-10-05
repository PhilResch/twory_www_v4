import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
import TestPostList from './testPostList.jsx';
import AccountsUIWrapper from '../components/accountsUIWrapper.jsx';
import FileIndividualFile from '../components/fileIndividualFile.jsx';
import FileUpload from '../components/fileUpload.jsx';

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
    
    getPosts() {
        let posts = [];
        for (let i=0; i < this.props.posts.length; i++) {
            posts.push({
                _id: i,
                title: this.props.posts[i].label,
                //content: this.props.posts[i].content
            });
        }
        console.log(posts);
        return posts;
    }

    renderPosts() {
        return this.getPosts().map((post) =>(
            <TestPostList key={post._id} title={post.title} />
        ));
    }
    
    insertNewPosts(event) {
        event.preventDefault();
        let title = event.target.title.value;
        let content = event.target.content.value;
        let newPost = {
            title: title,
            content: content
        };
        Meteor.call('createNewPost', newPost);
    }
    
    render() {
        console.log("PostsList props: ");
        console.log(this.props);
        return (
            <div className="">
                <AccountsUIWrapper />
                
                <form id="testForm" onSubmit={this.insertNewPosts}>
                    Nazwa klienta:<br />
                    <input type="text" name="title" defaultValue="Mickey" />
                    <br />
                    Opis projektu:<br />
                    <input type="text" name="content" defaultValue="Mouse" />
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>

                <FileUpload /> 
                
                {this.renderPosts()}       
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