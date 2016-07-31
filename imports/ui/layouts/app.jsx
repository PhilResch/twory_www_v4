import React from 'react';

import AccountsUIWrapper from '../accountsUIWrapper.jsx';

//import Portfolio from '../pages/portfolio.jsx';
import { PagesCollection } from '../../lib/pagesCollection.js';
import { PortfolioCollection } from '../../lib/pagesCollection.js';

import { Navigation } from '../components/navigation.jsx';
import Portfolio from '../pages/portfolio.jsx';

import { Breadcrumb } from '../components/breadcrumb.jsx';
//	<AccountsUIWrapper />
import { createContainer } from 'meteor/react-meteor-data';

export const App = ( { children } ) => (
	<div className="wrapper">
		<Breadcrumb />
		<Navigation />
		{ children }
	</div>
)

