'use strict';

export default function() {
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
}