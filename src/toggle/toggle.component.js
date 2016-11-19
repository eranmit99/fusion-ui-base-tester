import './toggle.scss';
import template from './toggle.html'

export class ToggleController {
    constructor() {
      "ngInject";
       this.toggleWithPrefix = "Prefix " + this.toggleText;
    }
}

export default {
  bindings: {
    label: '@',
    value: '=',
    disabled: '=',
    ngModel: '='
  },
  controller: ToggleController,
  controllerAs: 'vm',
  template
}
