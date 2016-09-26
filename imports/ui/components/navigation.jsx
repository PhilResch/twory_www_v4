import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

//import { PagesCollection } from '../../api/pagesCollection.js';
import { PagesCollection } from '../../../lib/pagesCollection.js';

import MenuItem from './menuItem.jsx';

export default class Navigation extends Component {
	getDefaultPages() {
		let defaultPages = [ 
				{
					title: "Index",
					component: "index.jsx"
				},
				{
					title: "Portfolio",
					component: "portfolio.jsx"	
				},
				{
					title: "Studio",
					component: "studio.jsx"	
				},
				{
					title: "Blog",
					component: "blog.jsx"	
				},	
				{
					title: "Kontakt",
					component: "contact.jsx"	
				},					
				{
					title: "Posts list",
					component: "postsList.jsx"	
				},
			];
		return defaultPages;
	}

	createDefaultPages() {
		let defaultPages = this.getDefaultPages();
		for (let i=0; i < defaultPages.length; i++) {
			Meteor.call('pagesCollection.insert', defaultPages[i]);
		}
	}	

	collectionIsReadyAndEmpty() {
		let isCollectionReady = this.props.pagesCollectionIsReady === true;
		let isCollectionEmpty = this.props.pagesCollection.length === 0;
		let isCollectionReadyAndEmpty = isCollectionReady && isCollectionEmpty;
		return isCollectionReadyAndEmpty;
	}

	getPages() {
		if (this.collectionIsReadyAndEmpty()) { this.createDefaultPages(); }	

		let pages = [];
		for (let i=0; i < this.props.pagesCollection.length; i++) {
			pages.push({_id: i, title: this.props.pagesCollection[i].title});
		}
		return pages;
	}

	renderLinks() {
		return this.getPages().map((page) => (
			<MenuItem key={page._id} page={page} />
		));
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


export default createContainer(() => {
  pagesCollectionSubscription = Meteor.subscribe('pagesCollection');
  loading = !pagesCollectionSubscription.ready();
  pagesCollectionExists = !loading;
  console.log("Is the pagesCollection loading? :" + loading);
  return {
	pagesCollectionIsReady: pagesCollectionSubscription.ready() ? true : false,
    pagesCollection: pagesCollectionExists ? PagesCollection.find({}).fetch() : [],
    currentUser: Meteor.user(),
  };
}, Navigation);