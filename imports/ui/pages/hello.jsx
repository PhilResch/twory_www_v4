import React from 'react';

export const Hello = ( { params, location } ) => (
	<h3>Howdy, { params.name }! You like { location.query.food }.</h3>
	// use params in links: (...)/hello/name?food=somefood
);