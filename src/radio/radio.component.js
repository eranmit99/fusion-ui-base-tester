import './radio.scss';
import template from './radio.html'

export class RadioController {
    constructor() {
      "ngInject";
       this.radioPrefix = 'fusion-radio-';
    }
}

export default {
	bindings: {
		label: '@',
		name: '@',
		id: '@',
		value: '@',
		disabled: '<',
		ngModel: '='
	},
	controller: RadioController,
	controllerAs: 'vm',
 	template
}