/* eslint-env mocha */
/* Stop app before testing and then run this command:
	meteor test --driver-package practicalmeteor:mocha
*/

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { PortfolioItems } from './portfolio.js';

if (Meteor.isServer) {
	describe('PortfolioItems', () => {
		describe('methods', () => {
			const userId = Random.id();
			let portfolioItemId;

			beforeEach(() => {
				PortfolioItems.remove({});
				portfolioItemId = PortfolioItems.insert({
					text: 'test portfolio item',
					createdAt: new Date(),
					owner: userId,
					username: 'tmeasday',
				});
			});

			it('can delete owned portfolio item', () => {
				const deleteItemInternalImplementation
					= Meteor.server.method_handlers['portfolioItems.remove'];

				const fakeMethodInvocationReplacingThis = { userId };

				deleteItemInternalImplementation.apply(
					fakeMethodInvocationReplacingThis, [portfolioItemId]
				);

				assert.equal(PortfolioItems.find().count(), 0);
			});
		});
	});
}