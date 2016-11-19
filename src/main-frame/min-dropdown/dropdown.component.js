import template from './templates/min-dropdown.html'

export default ($window, $compile, $templateCache, $document) => {
	/**
     * @ngInject
     */
    return {
        restrict: 'E',
        scope: {
            ngModel: '=?',
            options: '=',
            onChange: '&?',
            dropdownIcon: '@'
        },
        template: template,
        link: function(scope, element, window) {
            scope.options = scope.options || [];

            let handler = function(event) {
                if (!element[0].contains(event.target)) {
                     scope.opened = false;
	                scope.$digest()
                 }
            }

            $document.on('click', handler);
            scope.$on('$destroy', function() {
                $document.off('click', handler);
            });
        },
        controller: function($scope) {

        }
    }
};
