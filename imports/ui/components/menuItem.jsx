import { IndexLink, Link } from 'react-router';
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default class MenuItem extends Component {
	render() {
		return(
			<li> 
				<{this.linkType()} to={this.props.link} activeClassName="active">
						{this.props.page.title}
				</{this.linkType()}>
			</li>
		);
	}
}