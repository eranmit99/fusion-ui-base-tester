import './fixed-panel.scss';
import template from './fixed-panel.html'

export default ($timeout) => {
	return {
		scope: {
			container: '@'
		},
		link: function($scope, $element) {
			$scope.container = $scope.container || 'main-view';
			$scope.attachHandler = () => {
				let pane = document.querySelector('#'+$scope.container);
				let thTop = $element[0].offsetTop;
				let inner       = $element[0].querySelector('.fixed-panel-inner');
				let paneHeight = pane.scrollHeight;

				$element[0].style.height = innerHeight+'px';
				inner.style.position = 'absolute';
				
				if (!pane)
					return false;

				pane.addEventListener('scroll', (e) => {
					let scrolled    = e.srcElement.scrollTop;
					let diff        = Math.max(0, scrolled-thTop);
					let innerHeight = inner.clientHeight;
					let innerTop = Math.min(paneHeight-(innerHeight+50), diff)

					inner.style.marginTop = innerTop+'px';
				});
			}

			$timeout($scope.attachHandler)
		},
		transclude: true,
		controllerAs: 'vm',
		template: template
	}
}
