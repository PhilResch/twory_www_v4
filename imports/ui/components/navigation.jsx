//import React from 'react';
import { IndexLink, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

import { Pages } from '../../lib/pages.js';

import MenuItem from './menuItem.jsx';


//export const Navigation = () => (
export default class Navigation extends Component {
	createDefaultPages() {
			if (this.props.pages.length === 0) {
				console.log("Pages collection is empty. Filling it with defaults.");
				let defaultPages = [
					"Home",
					"Prace",
					"Blog",
					"Kontakt"
				];

			for (let i=0; i < defaultPages.length; i++) {
				Meteor.call('pages.insert', defaultPages[i]);
				console.log("Inserted " + defaultPages[i]);
			}
		}
	}	

	getPages() {
		var pageTitles = [];
		for (let i=0; i < this.props.pages.length; i++) {
			pageTitles.push({_id: i, title: this.props.pages[i].title});
		}
		console.log("pageTitles: " + JSON.stringify(pageTitles));
		return pageTitles;
	}

	renderRoutes() {
		return this.getPages().map((page) => (
			<MenuItem key={page._id} page={page} />
		));
	}

	render() {
		this.createDefaultPages();

		return (
			<div className="Menu">
				<ul>
					{this.renderRoutes()}
				</ul>
			</div>
		)
	}
}

export default createContainer(() => {
	// https://guide.meteor.com/react.html
	const pagesCollectionHandle = Meteor.subscribe('pages');
	const loading = !pagesCollectionHandle.ready();
	const page = Pages.findOne();
	const pagesCollectionExists = !loading //&& !!page;

	return {
		pages: pagesCollectionExists ? Pages.find({}).fetch() : "Collection not ready",
		currentUser: Meteor.user(),
	};
}, Navigation);

