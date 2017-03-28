import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default class Content extends Component {

	renderAppropiateContentContainer() {
        switch(this.props.type) {
			case "image":
				return this.renderImage();
				break;
			case "title":
				return this.renderTitle();
				break;
			case "paragraph":
				return this.renderParagraph();
				break;
			default:
		}
    }
    
	renderImage() {
		return <img className={this.props.type} src={this.props.content}/>
	}
	
	renderTitle() {
		return <h1 className={this.props.type}>{this.props.content}</h1>
	}
	
	renderParagraph() {
		return <p className={this.props.type}>{this.props.content}</p>
	}

	render() {
		return(
			<div id="content" className="layout">
				{this.renderAppropiateContentContainer()}
			</div>
		);
	}
}