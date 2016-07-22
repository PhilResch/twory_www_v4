import React from 'react';

import AccountsUIWrapper from '../accountsUIWrapper.jsx';

import Navigation from '../components/navigation.jsx';

export const App = ( { children } ) => (
	<div>
		<AccountsUIWrapper />
		<Navigation />
		{ children }
	</div>
)