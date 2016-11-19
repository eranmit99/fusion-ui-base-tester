import './frame.scss';
import template from './templates/main-frame.html'

export default () => {
  	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		template: template,
		controller: function($scope, fusionFrame, fusionFrameState) {
			$scope.DashboardStateService = fusionFrameState;
			$scope.menuItems = fusionFrame.menuItems ? fusionFrame.menuItems : [];
			$scope.headerMenu = fusionFrame.headerMenu ? fusionFrame.headerMenu : [];
			$scope.additionalActions = fusionFrame.additionalActions ? fusionFrame.additionalActions : [];
		}
	}
  }
;