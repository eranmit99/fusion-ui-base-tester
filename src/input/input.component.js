import './input.scss';
import template from './input.html'

export class inputComponent {
    constructor() {
      "ngInject";
    }
}

export default {
	bindings: {
	    placeholder: '@',
	    error: '@',
	    readonly: '@',
	    required: '=',
	    name: '@',
	    disabled: '=',
	    ngModel: '=',
	    size: '@',
	    loading: '=',
	    icon: '@',
	    btn: '@',
	    onChange: '=',
	    btnAction: '='
	  },
  controller: inputComponent,
  controllerAs: 'vm',
  template
}
