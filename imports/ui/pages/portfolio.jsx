import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';

import React, { Component, PropTypes } from 'react';
import { PortfolioCollection } from '../../lib/portfolioCollection.js';

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

		Meteor.call('PortfolioCollection.insert', page, content);
	}

	renderContent() {
		if (this.props.PortfolioContent) {
			content = this.props.PortfolioContent.length;
			console.log("renderContent reporting value of 'content:" + content);
		} else {
			console.log("PortfolioContent doesn't seem ready.");
		}
//		console.log(Meteor.call('PortfolioCollection.get'));
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

export default PortfolioContainer = createContainer(() => {
	// https://guide.meteor.com/react.html
//	const PortfolioContent = Meteor.subscribe('PortfolioCollection', "portfolio");
	const PortfolioContent = Meteor.subscribe('PortfolioCollection');
	const loading = !PortfolioContent.ready();
	console.log("Is PortfolioCollection ready: " + !loading);
	console.log("PortfolioContent looks as follows: " + PortfolioContent);
//	const portfolioItem = PortfolioContent.findOne();
	const PortfolioContentExists= !loading ;

	return {
		PortfolioContent: PortfolioContentExists ? PortfolioContent.find({}).fetch() : "Collection not ready",
		currentUser: Meteor.user(),
	};
}, Portfolio);
