export default function ($scope, $timeout) {
	this.active = this.active || 0;
	this.tabSet = '';
	this.tabs = [];

	this.setActive = (tab) => {
		if( !tab )
			return false

		if( this.tabs.indexOf(tab) < 0 ) {
			tab = this.tabs[tab.tabId];
		}
		for( let i in this.tabs ) {
			this.tabs[i].active = false;
		}
		tab.active = true;
		this.active = tab.tabId ? tab.tabId : this.tabs.indexOf(tab);
	}

	$timeout(() => {
		if( (this.active || this.active === 0) && this.tabs[this.active] )
			this.tabs[this.active].active = true;
	})
}