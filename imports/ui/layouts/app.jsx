import React from 'react';

import AccountsUIWrapper from '../components/accountsUIWrapper.jsx';
import Navigation from '../components/navigation.jsx';
import { Breadcrumb } from '../components/breadcrumb.jsx';

export const App = ( { children } ) => (
	<div className="wrapper">
		<AccountsUIWrapper />
		<Breadcrumb />
		<Navigation />
		{ children }
	</div>
)