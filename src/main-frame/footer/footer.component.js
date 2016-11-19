'use strict';

import template from './templates/footer.html'

export default () => {
	/**
     * @ngInject
     */
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      template: template
    }
  };
