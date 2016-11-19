import './code-block.scss';
import template from './code-block.html'

export class codeBlockComponent {
    constructor() {
      "ngInject";

      // this.
    }
}

export default {
	bindings: {
		'title': '@',
		'label': '@'
	  },
  controller: codeBlockComponent,
  controllerAs: 'vm',
  template
}