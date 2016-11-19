export default (carousel) => {
	return {
	  scope: {
	    icon: '@',
	    disabled: '=',
	    loading: '='
	  },
	  link: function($scope) {
	  	console.log('here');
		   $scope.buttonWithPrefix = "Prefix " + $scope.buttonText;
		},
	  transclude: true,
	  controllerAs: 'vm',
	  template: `
		<div uib-carousel active="active" interval="myInterval" no-wrap="noWrapSlides">
	      <div uib-slide ng-repeat="" index="slide.id">
	        <img ng-src="https://avatars.slack-edge.com/2016-07-31/64753705043_655007119171be9eeac9_48.png" style="margin:auto;">
	      </div>
	      <div uib-slide ng-repeat="" index="slide.id">
	        <img ng-src="https://avatars.slack-edge.com/2016-07-31/64753705043_655007119171be9eeac9_48.png" style="margin:auto;">
	      </div>
	    </div>
	  `
	}
}
