import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Index } from '../../ui/components/index.jsx';
import { PostsList } from '../../ui/components/postsList.jsx';

import { App } from '../../ui/layouts/app.jsx';
import Portfolio from '../../ui/pages/portfolio.jsx';
import { Studio } from '../../ui/pages/studio.jsx';
import { Blog } from '../../ui/pages/blog.jsx';
import { Contact } from '../../ui/pages/contact.jsx';
import { NotFound } from '../../ui/pages/notFound.jsx';


Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path="/" component={ App } >
				<IndexRoute component={ Index } />
				<Route path="/portfolio" component={ Portfolio } />
				<Route path="/studio" component={ Studio } />
				<Route path="/blog" component={ Blog } />
				<Route path="/contact" component={ Contact } />
				<Route path="/postsList" component={ PostsList } />
				<Route path="*" component={ NotFound } />
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
	
});
