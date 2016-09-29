import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';

export default class testPostList extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="post">
                <h2>{this.props.title}</h2>
            </div>
        )
    }
}
