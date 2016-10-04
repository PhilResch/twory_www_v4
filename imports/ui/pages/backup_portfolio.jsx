import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';
import { render } from 'react-dom';

import React, { Component, PropTypes } from 'react';
import { PortfolioCollection } from '../../../lib/portfolioCollection.js';

export default class Portfolio extends Component { 
	insertDefaultContent() {
		if (this.collectionIsReadyAndEmpty()) {
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
		else {
			console.log("portfolioCollection is not empty. Nothing was inserted.");
		}
	}

	collectionIsReadyAndEmpty() {
		let isCollectionReady = this.props.portfolioCollectionIsReady === true;
		let isCollectionEmpty = this.props.portfolioCollection.length === 0;
		let isCollectionReadyAndEmpty = isCollectionReady && isCollectionEmpty;
		return isCollectionReadyAndEmpty;
	}	

	renderContent() {
		if (this.props.portfolioCollection) {
			content = this.props.portfolioCollection.length;
			console.log("renderContent reporting length of " + content);
		} else {
			console.log("portfolioCollection doesn't seem ready.");
		}
	}

	render() {
		this.insertDefaultContent();
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
	portfolioCollectionSubscription = Meteor.subscribe('portfolioCollection');
	loading = !portfolioCollectionSubscription.ready();
	portfolioCollectionExists= !loading ;
	console.log("Is portfolioCollectionSubscription ready: " + !loading);
	return {
		portfolioCollectionIsReady: portfolioCollectionSubscription.ready() ? true : false,
		portfolioCollection: portfolioCollectionExists ? PortfolioCollection.find({}).fetch() : [],
		currentUser: Meteor.user(),
	};
}, Portfolio);
