import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { PortfolioItems } from '../../api/portfolio.js';

import PortfolioItem from './portfolioItem.jsx';
import AccountsUIWrapper from '../accountsUIWrapper.jsx';

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hideCompleted: false,
		};
	}

	handleSubmit(event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		Meteor.call('portfolioItems.insert', text);

		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		});
	}

	renderPortfolio() {
		let filteredItems = this.props.portfolioItems;
		if (this.state.hideCompleted) {
			filteredItems = filteredItems.filter(portfolioItem => !portfolioItem.checked);
		}

		return filteredItems.map((portfolioItem) => {
			const currentUserId = this.props.currentUser && this.props.currentUser._id;
			const showPrivateButton = portfolioItem.owner === currentUserId;

			return (
				<PortfolioItem
					key={portfolioItem._id}
					portfolioItem={portfolioItem}
					showPrivateButton={showPrivateButton}
				/>
			);
		});
	}

	render() {
		return (
			<div className="container">

				<AccountsUIWrapper />

				<header>
					<h1>Portfolio List</h1>
					<h2>Unchecked items: ({this.props.uncheckedCount})</h2>
					<label className="hide-completed">
						<input
							type="checkbox"
							readOnly
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted.bind(this)}
						/>
						Hide checked items
					</label>

					{ this.props.currentUser ? 						
						<form className="new-portfolio-item" 
						onSubmit={this.handleSubmit.bind(this)} >
							<input 
								type="text"
								ref="textInput"
								placeholder="Wprowadź opis"	
							/>
						</form> : ''
					}
				</header>

				<ul>
					{this.renderPortfolio()}
				</ul>
			</div>
		);
	}
}

Portfolio.propTypes = {
	portfolioItems: PropTypes.array.isRequired,
	uncheckedCount: PropTypes.number.isRequired,
	currentUser: PropTypes.object,
};

export default createContainer(() => {
	Meteor.subscribe('portfolioItems');

	return {
		portfolioItems: PortfolioItems.find({}, { sort: { createdAt: -1 } }).fetch(),
		uncheckedCount: PortfolioItems.find({ checked: { $ne: true} }).count(),
		currentUser: Meteor.user(),
	};
}, Portfolio);
