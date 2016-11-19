'use strict';

import template from './templates/header.html'

export default ($window, $templateCache, $rootScope, fusionFrameState) => {
	/**
     * @ngInject
     */
    return {
      restrict: 'E',
      replace: true,
      scope: {
        menu: '=',
        actions: '='
      },
      template: template,
      controller: function($scope, $rootScope) {
        $scope.changeMenuState = () => {
          fusionFrameState.change();
        };

        $scope.callAction = (event) => {
          $rootScope.$broadcast(event);
        };
      }
    }
  };
