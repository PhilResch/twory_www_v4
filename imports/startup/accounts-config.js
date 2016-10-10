import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
//	passwordSignupFields:'USERNAME_ONLY',
});
/*
Accounts.validateNewUser(function (user) {
	console.log("Accounts.valideNewUser called");
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, ['admin'])) {
    return true;
  }
  else return false;
//  throw new Meteor.Error(403, "Not authorized to create new users");
});
*/