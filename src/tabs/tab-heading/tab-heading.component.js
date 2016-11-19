import './tab-heading.scss';
import template from './tab-heading.html';

export default () => {
	return {
		scope: {
			tabId: '@',
			active: '=?',
			loop: '=?',
			tabs: '=?'
		},
		link: function($scope, elm, attrs, tabsetCtrl, transclude) {
			$scope.loop = $scope.loop || false;

			$scope.itemClick = (tabId) => {
				tabsetCtrl.setActive($scope);
			}

			tabsetCtrl.tabs.push($scope);
			$scope.tabs = tabsetCtrl.tabs;
		},
		controller: ()=>{},
		require: '^fusionTabs',
		transclude: true,
		controllerAs: 'vm',
		template
	}
}
