import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { PostsCollection } from '../../../lib/postsCollection.js';
export default class TestPostList extends Component {
    render() {
        console.log("TestPostList props:")
        console.log(this.props);
        console.log("---")
        return (
            <div id="content">
                <img className="o-media" src={this.props.image} />
                <div className="o-box projectDescription">
                    <h1 className="clientName">{this.props.title}</h1>
                    <p className="">{this.props.content}</p>
                </div>
            </div>
        )
    }
}
