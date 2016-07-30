import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';

import React, { Component, PropTypes } from 'react';
import { ContentCollection } from '../../lib/content.js';

export class Portfolio extends Component { 
	insertContent() {
		console.log("Calling insertContent().");
		let page = "portfolio";
		let content = {
			page: page,
			category: "branding",
			title: "Kancelaria Skibiński",
			content: "Lorem ipsum kurwa",
			mainImage: "/img/1.jpg"
		};

		Meteor.call('contentCollection.insert', page, content);
	}

	renderContent() {
		Meteor.subscribe('contentCollection');
		if (Meteor.subscribe('contentCollection').ready()) {
			content = this.props.PortfolioContent.length;
			console.log(content);
		} else {
			console.log("This fucking shit just doesn't get ready");
		}
	}

	render() {
		this.insertContent();
		return(
			<div>
				<h3>Pray this works</h3>
				{this.renderContent()}
			</div>
		);
	}

}

export default createContainer(() => {
	// https://guide.meteor.com/react.html
//	const PortfolioContent = Meteor.subscribe('ContentCollection', "portfolio");
	console.log("contentCollection READY!");
	const PortfolioContent = Meteor.subscribe('contentCollection');
	const loading = !PortfolioContent.ready();
	const contentItem = PortfolioContent.findOne();
	const PortfolioContentExists= !loading ;

	return {
		PortfolioContent: PortfolioContentExists ? PortfolioContent.find({}).fetch() : "Collection not ready",
//		huj: ["ja", "pierdole", "to", "gówno"],
		currentUser: Meteor.user(),
	};
}, Portfolio);