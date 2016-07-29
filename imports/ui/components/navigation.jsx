//import React from 'react';
import { IndexLink, Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

import { Pages } from '../../lib/pages.js';

import MenuItem from './menuItem.jsx';

// 
import { Index } from '../../ui/components/index.jsx';
import { Portfolio } from '../../ui/pages/portfolio.jsx';
import { Studio } from '../../ui/pages/studio.jsx';
import { Blog } from '../../ui/pages/blog.jsx';
import { Contact } from '../../ui/pages/contact.jsx';
//

//export const Navigation = () => (
export default class Navigation extends Component {
	createDefaultPages() {
			if (this.props.pages.length === 0) {
				console.log("Pages collection is empty. Filling it with defaults.");
				let defaultPages = [
					["Index", "index.jsx" ],
					["Portfolio", "portfolio.jsx" ], 
					["Blog", "blog.jsx" ],
					["Contact", "contact.jsx" ]
				];

			for (let i=0; i < defaultPages.length; i++) {
				Meteor.call('pages.insert', defaultPages[i][0], defaultPages[i][1]);
				console.log("Inserted page: " + defaultPages[i][0] + " and component: " + defaultPages[i][1]);
			}
		}
	}	

	getPages() {
		let pages = [];
		for (let i=0; i < this.props.pages.length; i++) {
			pages.push({_id: i, title: this.props.pages[i].title});
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

