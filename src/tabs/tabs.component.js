import './tabs.scss';
import template from './tabs.html';

export default () => {
	return {
		scope: {
			active: '=?',
			tabs: '=?'
		},
		link: function($scope, $element, atts, ctrl) {
			
		},
		transclude: true,
		controller: 'tabSetController',
		controllerAs: 'tabset',
		bindToController: true,
		template
	}
}
