import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';

export default class PostsListItem extends Component {
    getLink() {
        link = this.props.parentPathname + "/" + this.props.slug;
        return link;
    }
    
    render() {
        return (
            <div className="portfolioItem o-box--small thumbnail u-1/3@wide u-1/2@desktop u-1/1@mobile">
                <Link to={this.getLink()}>
                    <div className="portfolioBox u-1/1">
                            <div className="portfolioInfo">
                                <h4>{this.props.title}</h4>
                                <p className="tag">
                                    {this.props.tags}
                                </p>
                            </div>
                            <div className="portfolioView">
                                <p className="">
                                    Zobacz więcej 
                                </p>
                            </div>
                        <div 
                            className="o-ratio o-ratio--16:9 portfolioImage"
                            style= {{backgroundImage: 'url(' + this.props.image + ')'}}
                        >
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}