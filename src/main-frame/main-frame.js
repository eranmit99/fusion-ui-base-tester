'use strict';

import template from './templates/main-frame.html'

angular.module('app')
  .provider('mainFrameConfig', function() {
    this.setMenuConfig = function (config) {
      this.menuItems = config;
    };

    this.setHeaderMenu = function(config) {
      this.headerMenu = config;
    };

    this.setAdditionalActions = function(config) {
      this.additionalActions = config;
    };

    this.$get = function () {
      return this;
    };

  })
  .directive('mainFrame', ['$window','$templateCache', 'DashboardStateService', '$state', '$location', function($window, $templateCache, DashboardStateService, $state, $location) {
    return {
      restrict: 'E',
      replace: true,
      scope: {

      },
      template: template,
      controller: function($scope, mainFrameConfig, $state) {
        $scope.DashboardStateService = DashboardStateService;
        $scope.menuItems = mainFrameConfig.menuItems ? mainFrameConfig.menuItems : [];
        $scope.headerMenu = mainFrameConfig.headerMenu ? mainFrameConfig.headerMenu : [];
        $scope.additionalActions = mainFrameConfig.additionalActions ? mainFrameConfig.additionalActions : [];
      }
    }
  }]);
