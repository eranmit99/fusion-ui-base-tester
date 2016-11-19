'use strict';

export default ['$window', '$rootScope', function($window, $rootScope) {
    const breakingPoint = 1279;
    let service = {};
    let breakpoint;
    let breakpointValues = ['mobile', 'tablet', 'smLaptop'];
    let curBreakpoint = refreshValue();

    service.isCollapsed = $window.innerWidth >= 1280 ? false : true;

    function refreshValue() {
      breakpoint = $window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
      return breakpoint;
    }

    function manageBreakpoints()  {
      refreshValue();
      if (curBreakpoint !== breakpoint && breakpointValues.indexOf(breakpoint) !== -1) {
        curBreakpoint = breakpoint;
        service.isCollapsed && service.set(false);
      }
    }

    service.getScreenSize = () => {
      return breakpoint;
    }

    service.set = (state) => {
      service.isCollapsed = state;
      $rootScope.$broadcast('collapsed:changed', service.isCollapsed, breakingPoint);
    }

    service.get = () => {
      return service.isCollapsed;
    }

    service.getDevice = () => {
      return refreshValue();
    }

    service.change = () => {
      service.isCollapsed = !service.isCollapsed;
      $rootScope.$broadcast('collapsed:changed', service.isCollapsed, breakingPoint);
    }

    return service;

  }];
