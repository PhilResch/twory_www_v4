import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Index } from '../../ui/components/index.jsx';
import { App } from '../../ui/layouts/app.jsx';
//import { Portfolio } from '../../ui/pages/portfolio.jsx';
import Portfolio from '../../ui/pages/portfolio.jsx';
import { Studio } from '../../ui/pages/studio.jsx';
import { Blog } from '../../ui/pages/blog.jsx';
import { Contact } from '../../ui/pages/contact.jsx';
import { NotFound } from '../../ui/pages/notFound.jsx';

import { createContainer } from 'meteor/react-meteor-data';
//import { PagesCollection } from '../../lib/pagesCollection.js';
import { PortfolioCollection } from '../../lib/pagesCollection.js';
import { Navigation } from '../../ui/components/navigation.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path="/" component={ App } >
				<IndexRoute component={ Index } />
				<Route path="/portfolio" component={ Portfolio } />
				<Route path="/studio" component={ Studio } />
				<Route path="/blog" component={ Blog } />
				<Route path="/contact" component={ Contact } />
				<Route path="*" component={ NotFound } />
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
	export default NavigationContainer = createContainer(() => {
		// https://guide.meteor.com/react.html
		const PagesCollectionHandle = Meteor.subscribe('PagesCollection');
		const loading = !PagesCollectionHandle.ready();
	//	const page = PagesCollection.findOne();
		const pagesCollectionExists = !loading //&& !!page;
		console.log("PagesCollectionHandle looks as follows: " + JSON.stringify(PagesCollectionHandle));

		return {
			Pages: pagesCollectionExists ? PagesCollectionHandle.find({}).fetch() : "Collection not ready",
			currentUser: Meteor.user(),
		};
	}, Navigation);

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
});

