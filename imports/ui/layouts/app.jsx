import React from 'react';

import AccountsUIWrapper from '../accountsUIWrapper.jsx';

import Portfolio from '../pages/portfolio.jsx';
//import Portfolio from '../components/portfolio.jsx';
import Navigation from '../components/navigation.jsx';
import { Breadcrumb } from '../components/breadcrumb.jsx';
import { Content } from '../components/content.jsx';
//	<AccountsUIWrapper />

export const App = ( { children } ) => (
	<div className="wrapper">
		<Breadcrumb />
		<Navigation />
		{ children }
		<Content />
	</div>
)