import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default class Breadcrumb  extends Component {

	render() {
		return(
			<div id="topInfoBar" className="layout">
				<div id="breadcrumb" className="layout__item u-6/12">
					<p >breadcrumb/Fuck/This/Shit/</p>
				</div>
				<div id="contactAndLanguage" className="layout__item  layout--right u-6/12">
					<p id="contactInfo">tel. 48 601 183 700</p>
					<p id="contactInfo">info@twory.studio</p>
					<p id="langaugeSwitch">english</p>
					<p id="langaugeSwitch">polski</p>
			</div>
		</div>
		);
	}
}