import template from './tabset.html';

export default () => {
	return {
		scope: {
			active: '=?',
			tabs: '=?'
		},
		link: function($scope, $element, atts, ctrl, transclude) {
			$scope.passTabs = [];
		},
		transclude: true,
		template
	}
}
