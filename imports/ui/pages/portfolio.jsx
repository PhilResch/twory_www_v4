import { createContainer } from 'meteor/react-meteor-data';
import WTF from '../../lib/collectionsContainer.jsx';

import { render } from 'react-dom';

import React, { Component, PropTypes } from 'react';
//import { ContentCollection } from '../../lib/content.js';

//import { ContentCollection } from '../../lib/pages.js';

export default class Portfolio extends Component { 
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
		console.log("Please work " + this.props.pages.length);
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

