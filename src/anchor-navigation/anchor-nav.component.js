import './anchor-nav.scss';
import template from './anchor-nav.html'

export default ($timeout) => {
	return {
		scope: {
			topLevel: '@',
			secondLevel: '@',
			container: '@'
		},
		link: function($scope, element) {
			$scope.collection = {};
			$scope.topLevel = $scope.topLevel || 'h2';
			$scope.secondLevel = $scope.secondLevel || 'h3';
			$scope.scrollTo = (node) => {
				if (!node)
					return false

				let pane = document.querySelector('#'+$scope.container);
				let anchor = node.anchor;
				let target = pane.querySelector('#'+anchor);
				let top = node.top;

				pane.scrollTop = top;
			}

			$scope.toggleSubNav = (item) => {
				if (!item)
					return false;
				item.opened = !item.opened;
			}

			$scope.onPaneScroll = () => {
				let pane = document.querySelector('#'+$scope.container);
				let paneHeight = pane.clientHeight;
				let scrollHeight = pane.scrollHeight;

				pane.addEventListener('scroll', function(e) {
					let top = e.srcElement.scrollTop;
					$scope.active = $scope.getActiveItem(top, $scope.collection);

					if ($scope.active !== null &&
						$scope.collection[$scope.active].children && 
						$scope.collection[$scope.active].children.length) {
							if ($scope.collection[$scope.active].opened == null)
								$scope.collection[$scope.active].opened = true;
							let childs = $scope.collection[$scope.active].children;
							if( scrollHeight < top+paneHeight )
								$scope.subActive = childs.length-1;
							else 
								$scope.subActive = $scope.getActiveItem(top, childs);
					}
					$scope.$apply();
				});
			}

			$scope.$watch('active', (val) => {
				if( val != null && typeof val != 'undefined' && $scope.collection[val].opened === false ) {
				console.log($scope.collection[val]);
					$scope.collection[val].opened = null;
				}
			})

			$scope.pickCurrentTop = () => {
				let pane = document.querySelector('#'+$scope.container);
				let scrollTop = pane.scrollTop;

				return scrollTop;
			}

			$scope.getActiveItem = (top, collection) => {
				for (let i = 0; i <	collection.length; i++) {
					let cur     = collection[i];
					let next    = collection[i+1]
					let curTop  = cur.top;
					let nextTop = next ? next.top : false;

					if (i == 0 && top < curTop)
						return null;
					if( i == collection.length-1 )
						return collection.length-1;
					if (top >= curTop && top < nextTop)
						return i;
				}

				return collection.length-1;
			}

			$scope.fetchTitles = () => {
				if (!$scope.container)
					return false

				let pane = document.querySelector('#'+$scope.container);
				if (!pane || typeof pane != 'object')
					return false

				let titles = [];

				let paneTitles = pane.querySelectorAll($scope.topLevel+','+$scope.secondLevel);

				for (let i = 0; i < paneTitles.length; i++) {
					let t       = paneTitles[i];
					let tag     = t.tagName.toLowerCase();
					let href    = t.getAttribute('id');
					let title   = t.innerHTML;
					let paneTop = pane.offsetTop;
					let top     = t.offsetTop - paneTop;
	
					let tObj  = {
						title: title,
						anchor: href,
						opened: null,
						top
					}

					if (i == 0 || tag == $scope.topLevel) {
						titles.push(tObj);
						continue;
					}

					if (!titles[titles.length-1].children) {
						titles[titles.length-1].children = [];
					}

					titles[titles.length-1].children.push(tObj);
				}
				$scope.collection = titles;
			}

			let init = () => {
				$scope.fetchTitles();
				$scope.onPaneScroll();
			}

			$timeout(init);
		},
		controllerAs: 'vm',
		template: template
	}
}