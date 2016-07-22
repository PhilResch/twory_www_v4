import { IndexLink, Link } from 'react-router';
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default class MenuItem extends Component {

	pageLink() {
		let link = "/" + this.props.page.title;
		return link;
	}	

	renderMenuItems() {
		if (this.props.page._id === 0) {
			return (
				<IndexLink to={this.pageLink()}>
					{this.props.page.title}
				</IndexLink>
			)
		} else {
			return (
				<Link to={this.pageLink()}>
					{this.props.page.title}
				</Link>
			)
		}
	}

	render() {
		return(
			<li>
				{this.renderMenuItems()}	
			</li>	
		);
	}
}