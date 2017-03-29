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
		return <img 
			onClick={this.props.onClick}
			className={this.props.type} 
			src={this.getImageOrPlaceholder(this.props.content)}
		/>
	}
	
	getImageOrPlaceholder(image) {
		if(image=="Placeholder image") {
			return "/img/1.jpg";
		} else {
			return image;
		}
	}
	
	renderTitle() {
		return <h1 
			onClick={this.props.onClick} 
			className={this.props.type}>{this.props.content}
		</h1>
	}
	
	renderParagraph() {
		return <p 
			onClick={this.props.onClick} 
			className={this.props.type}>{this.props.content}
		</p>
	}

	render() {
		return(
			<div id="content" className="layout">
				{this.renderAppropiateContentContainer()}
			</div>
		);
	}
}