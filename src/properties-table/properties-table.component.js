import './properties-table.scss';
import template from './properties-table.html'

export class propertiesTableComponent {
	constructor() {
		"ngInject";
		(this.columnTitles = () => {
			if( !this.data )
				return false

			this.headers = [];
			this.data.forEach((item) => {
				let keys = Object.keys(item);
				for( let i = 0; i < keys.length; i++ ) {
					let key = keys[i];
					if( this.headers.indexOf(key) >= 0 )
						continue;
					this.headers.splice(i, 0, key);
				}
			})
		})()
	}
}

export default {
	bindings: {
	    data: '<'
	  },
  controller: propertiesTableComponent,
  controllerAs: 'vm',
  template
}
