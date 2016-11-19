'use strict';
import menuTemplate from './templates/main-menu.html'

export default ($window, fusionFrameState, $templateCache, $state, $location) => {
	/**
     * @ngInject
     */
    return {
      restrict: 'E',
      replace: true,
      scope: {
        collection: '='
      },
      template: menuTemplate,
      link: function(scope, element, window) {
        element.on('mouseleave', () => {
          if(fusionFrameState.getDevice() !== 'mobile') {
            scope.$broadcast('menu:left', fusionFrameState.isCollapsed);
          }
        });

        scope.$on('destroy', () => {
          element.off('mouseleave')
        })

      },
      controller: function($scope, $state) {
        $scope.setCurrentItem = () => {
          $scope.currentItem = $scope.collection.find((item) => {
            return (!!item.state && item.state.includes($location.$$path.split('/')[1]));
          });
        }

        $scope.setCurrentItem();

        $scope.selected = function(item) {
          if($scope.currentItem === item) {
            $scope.currentItem = null;
            return;
          }
          $scope.currentItem = item;
        };
      }
    }
  };
