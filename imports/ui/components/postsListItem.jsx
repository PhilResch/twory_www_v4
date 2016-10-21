import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';

export default class PostsListItem extends Component {
    getLink() {
        link = this.props.parentPathname + "/" + this.props.slug;
        return link;
    }
    
    renderTags() {
        if (this.props.tags) {
            let tags = this.props.tags;
            let key = 0;
            
            // key={tag} is probably a very hacky way to deal with key 
            return tags.map((tag) => (
                <li key={tag} className="o-list-inline__item">{tag}</li>
            ));
        } else {
            return <li className="o-list-inline__item">"There are no tags."</li>
        }
    }
    
    render() {
        return (
            <div className="portfolioItem o-box--small thumbnail u-1/3@wide u-1/2@desktop u-1/1@mobile">
                <Link to={this.getLink()}>
                    <div className="portfolioBox u-1/1">
                            <div className="portfolioInfo">
                                <h4>{this.props.title}</h4>
                                <ul className="tags o-list-inline--delimited">
                                    {this.renderTags()}
                                </ul>
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