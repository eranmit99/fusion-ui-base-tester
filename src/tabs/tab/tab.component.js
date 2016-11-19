import '../tabs.scss';
import '../tab-heading/tab-heading.scss';
import template from './tab.html';

export default () => {
	return {
		scope: {
			title: '@',
			active: '=?'
		},
		link: function($scope, elm, attrs, tabsetCtrl, transclude) {
		},
		controller: () => {},
		transclude: true,
		require: '^?fusionTabset',
		controllerAs: 'ctrl',
		template
	}
}
