import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from '../components/accountsUIWrapper.jsx';

export default class Admin extends Component {

	render() {
		return(
			<div id="admin" className="layout">
					<AccountsUIWrapper />
			</div>
		);
	}
}