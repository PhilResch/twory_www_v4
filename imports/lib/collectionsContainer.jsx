import { createContainer } from 'meteor/react-meteor-data';
import Navigation from '../ui/components/navigation.jsx';
import Portfolio from '../ui/pages/portfolio.jsx';

export default createContainer(() => {
	// https://guide.meteor.com/react.html
	const pagesCollectionHandle = Meteor.subscribe('pages');
	const ploading = !pagesCollectionHandle.ready();
	const page = Pages.findOne();
	const pagesCollectionExists = !ploading //&& !!page;
	const PortfolioContent = Meteor.subscribe('contentCollection');
	const loading = !PortfolioContent.ready();
	const contentItem = PortfolioContent.findOne();
	const PortfolioContentExists= !loading;

	return {
		pages: pagesCollectionExists ? Pages.find({}).fetch() : "Collection not ready",
		currentUser: Meteor.user(),
		PortfolioContent: PortfolioContentExists ? PortfolioContent.find({}).fetch() : "Collection not ready",
	};
}, Portfolio, Navigation);