import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
export default class PostsListItem extends Component {
    render() {
        return (
                <div className="o-box--small thumbnail portfolioItem u-1/2">
                    <div className="o-box portfolioItemDescription">
                        <h3 className="clientName">{this.props.title}</h3>
                        <p className="tag">{this.props.content}</p>
                    </div>
                    <img className="o-media portfolioItemThumbnail" src={this.props.image} />
                </div>
        )
    }
}