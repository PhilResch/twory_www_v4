import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

//import { PagesCollection } from '../../lib/pagesCollection.js';
import NavigationContainer from '../../startup/client/routes.jsx';

import MenuItem from './menuItem.jsx';

export class Navigation extends Component {
	createDefaultPages() {
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
		}
	}	

	getPages() {
		if (this.props.Pages.fetch().length == 0) {
			this.createDefaultPages(); 
		}
		let pages = [];
			for (let i=0; i < this.props.Pages.length; i++) {
				pages.push({_id: i, title: this.props.PagesCollection[i].title});
			}
			return pages;
	}

	renderLinks() {
		if (this.Pages.ready()) {
			return this.getPages().map((page) => (
				<MenuItem key={page._id} page={page} />
			));
		} else {
		console.log("navigation.jsx: renderLinks() saying PagesCollection is not ready...");
		//this.renderLinks();
		}
	}

	render() {
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



