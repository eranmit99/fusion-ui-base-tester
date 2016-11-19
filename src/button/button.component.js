import './button.scss';
import template from './button.html'

export default () => {
	return {
	  scope: {
	    icon: '@',
	    disabled: '=',
	    loading: '='
	  },
	  link: function($scope) {
		   $scope.buttonWithPrefix = "Prefix " + $scope.buttonText;
		},
	  transclude: true,
	  controllerAs: 'vm',
	  template: template
	}
}
