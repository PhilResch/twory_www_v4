import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Index from '../../ui/components/index.jsx';
import Editor from '../../ui/components/editor.jsx';
import PostsList from '../../ui/components/postsList.jsx';
import Admin from '../../ui/components/admin.jsx';
import Post from '../../ui/components/post.jsx';

import { NotFound } from '../../ui/pages/notFound.jsx';

import { App } from '../../ui/layouts/app.jsx';

Meteor.startup( () => {
	render(
		<Router history={ browserHistory }>
			<Route path="/" component={ App } >
				<IndexRoute component={ Index } />
				<Route path="/admin" component={ Admin } />
				<Route path="/editor" component={ Editor } />
				<Route path="/postsList" component={ PostsList } />
				<Route path="/postsList/:slug" component={ Post } />
				<Route path="/postsList/:slug/edit" component={ Editor } />
				<Route path="*" component={ NotFound } />
			</Route>
		</Router>,
		document.getElementById( 'render-target' )
	);
	
});
