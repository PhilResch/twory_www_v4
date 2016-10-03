import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export class Breadcrumb  extends Component {

	render() {
		return(
			<div id="topInfoBar" className="o-layout">
				<div id="breadcrumb" className="o-layout__item u-1/2">
					<p >breadcrumb/Fuck/This/Shit/</p>
				</div>
				<div id="contactAndLanguage" className="o-layout__item  o-layout--right u-1/2">
					<ul className="o-list-inline">
						<li className="o-list-inline__item">tel. 48 601 183 700</li>
						<li className="o-list-inline__item">info@twory.studio</li>
						<li className="o-list-inline__item">english</li>
						<li className="o-list-inline__item">polski</li>
					</ul>
				</div>
			</div>
		);
	}
}