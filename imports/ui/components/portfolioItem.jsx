import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

export default class PortfolioItem extends Component {
	toggleChecked() {
		Meteor.call('portfolioItems.setChecked', 
			this.props.portfolioItem._id, !this.props.portfolioItem.checked);
	}

	deleteThisItem() {
		Meteor.call('portfolioItems.remove', this.props.portfolioItem._id);
	}

	togglePrivate() {
		Meteor.call('portfolioItems.setPrivate', this.props.portfolioItem._id,
			!this.props.portfolioItem.private);
	}

	render(){
		const portoflioItemClassName = classnames({
			checked: this.props.portfolioItem.checked,
			private: this.props.portfolioItem.private,
		});

		return(
//			<li>{this.props.portfolioItem.text}</li>
		<li className={portoflioItemClassName}>
			<button className="delete" onClick={this.deleteThisItem.bind(this)}>
			&times;
			</button>

			<input
				type="checkbox"
				readOnly
				checked={this.props.portfolioItem.checked}
				onClick={this.toggleChecked.bind(this)}
			/>

			{this.props.showPrivateButton ?
				(<button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
					{ this.props.portfolioItem.private ? 'Private' : 'Public' }
				</button>)
				: '' 
			}

			<span className="text">
				<strong>{this.props.portfolioItem.username}</strong>: {this.props.portfolioItem.text}
			</span>
		</li>
		);
	}
}

PortfolioItem.PropTypes = {
	portfolioItem: PropTypes.object.isRequired,
	showPrivateButton: React.PropTypes.bool.isRequired,
};