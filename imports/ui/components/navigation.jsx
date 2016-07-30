import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

import { PagesCollection } from '../../lib/pagesCollection.js';

import MenuItem from './menuItem.jsx';

export default class Navigation extends Component {
	createDefaultPages() {
		console.log("createDefaultPages() called.")
			if (this.props.PagesCollection.length === 0) {
				console.log("Pages collection is empty. Filling it with defaults.");
				let defaultPages = [
					["Index", "index.jsx" ],
					["Studio", "studio.jsx"],
					["Portfolio", "portfolio.jsx"], 
					["Blog", "blog.jsx" ],
					["Contact", "contact.jsx" ]
				];

			for (let i=0; i < defaultPages.length; i++) {
				Meteor.call('PagesCollection.insert', defaultPages[i][0], defaultPages[i][1]);
				console.log("Inserted page: " + defaultPages[i][0] + " and component: " + defaultPages[i][1]);
			}
		}
	}	

	getPages() {
		let pages = [];
		for (let i=0; i < this.props.PagesCollection.length; i++) {
			pages.push({_id: i, title: this.props.PagesCollection[i].title});
		}
		return pages;
	}

	renderLinks() {
		return this.getPages().map((page) => (
			<MenuItem key={page._id} page={page} />
		));
	}

	render() {
		this.createDefaultPages();

		return (
			<div id="navbar" className="layout">
				<div id="logo" className="layout__item u-3/12">
					<img src="/img/twory_www_logo_v1.svg" alt="Twory Studio logo"/>
				</div>

				<div id="mainMenu" className="layout__item u-6/12">
					<ul className="list-inline">
						{this.renderLinks()}
					</ul>
				</div>

				<div id="searchBox" className="layout__item layout--right u-2/12">
					<input type="submit" value="Złóż zamówienie"/>
				</div>

				<div id="searchBox" className="layout__item  layout--right u-1/12">
					<i className="fa fa-facebook-official fontAwesomeIcon"></i>
					<i className="fa fa-twitter-square fontAwesomeIcon"></i>
					<i className="fa fa-pinterest-square fontAwesomeIcon"></i>
				</div>
			</div>
		)
	}
}

export default NavigationContainer = createContainer(() => {
	// https://guide.meteor.com/react.html
	const PagesCollectionHandle = Meteor.subscribe('PagesCollection');
	const loading = !PagesCollectionHandle.ready();
//	const page = PagesCollection.findOne();
	const pagesCollectionExists = !loading //&& !!page;
	console.log("PagesCollectionHandle looks as follows: " + JSON.stringify(PagesCollectionHandle));

	return {
		PagesCollection: pagesCollectionExists ? PagesCollectionHandle.find({}).fetch() : "Collection not ready",
		currentUser: Meteor.user(),
	};
}, Navigation);

