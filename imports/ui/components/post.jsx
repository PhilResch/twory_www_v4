import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react';

export default Post= ( { params } ) => ( {

	render() {
		return(
			<div id="content" className="layout">
                <h1>{params.slug}</h1>
			</div>
		);
	}
})