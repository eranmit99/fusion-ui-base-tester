'use strict';
import template from './templates/main-menu-item.html'

export default ($window, $compile, $templateCache, $state, $location, fusionFrameState) => {
	/**
     * @ngInject
     */
    return {
      restrict: 'E',
      replace: true,
      scope: {
        item: '=',
        selected: '&'
      },
      template: template,

      link: function(scope, element, attrs, window) {
        if (angular.isArray(scope.item.children)) {
          var el = angular.element(element[0].querySelector('.sub-menu'));
          el.append("<fusion-main-frame-menu collection='item.children'></fusion-main-frame-menu>");
          element.addClass('hasSubMenu')
          $compile(el.contents())(scope);
        }

      },
      controller: function($scope, $state, $element, $timeout) {
        $scope.state = $state;
        $scope.StateService = fusionFrameState;

        function resetOpen() {
          if(!$element.hasClass('active') && $element.hasClass('open')) {
            $scope.$parent.setCurrentItem();
            $element.removeClass('open');
          }
        }

        $scope.$on('menu:left', (e, collapsed) => {
          if(collapsed) {
            resetOpen();
            return;
          }
          $timeout(resetOpen, 2000);
        });

      }
    }
  };
