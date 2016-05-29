sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/roche/chwt/model/models",
	"com/roche/chwt/controller/ErrorHandler"
], function(UIComponent, Device, models, ErrorHandler) {
	"use strict";
	return UIComponent.extend("com.roche.chwt.Component", {
		metadata: {
			version: "1.0.0",
			rootView: {
				viewName: "com.roche.chwt.view.Main",
				type: "XML"
			},
			dependencies: {
				libs: [
					"sap.ui.core",
					"sap.m",
					"sap.ui.layout"
				]
			},
			config: {
				"i18nBundle": "com.roche.chwt.i18n.i18n",
				"serviceUrl": "/sap/opu/odata/sap/ZH38PT_DE_TIME_CHG_SRV/",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				"serviceConfig": {
					"name": "ZH38PT_DE_TIME_CHG_SRV",
					"serviceUrl": "/sap/opu/odata/sap/ZH38PT_DE_TIME_CHG_SRV/"
				}
			}
		},
		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();
			// creating and setting the necessary models			
			// set Model from Service
			var oModel = models.createModel(mConfig.serviceUrl);
			this.setModel(oModel);
			this._createMetadataPromise(oModel);
			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// error handling			
			this._oErrorHandler = new ErrorHandler(this);
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments); // Initialize router
			// this.getRouter().initialize();
		},
		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				if (!Device.support.touch) {
					// apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},
		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ListSelector and ErrorHandler are destroyed.
		 * @public
		 * @override
		 */
		destroy: function() {
			this._oErrorHandler.destroy();
			this.getModel().destroy();
			this.getModel("i18n").destroy();
			this.getModel("device").destroy();
			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		},
		/**
		 * Creates a promise which is resolved when the metadata is loaded.
		 * @param {sap.ui.core.Model} oModel the app model
		 * @private
		 */
		_createMetadataPromise: function(oModel) {
			this.oWhenMetadataIsLoaded = new Promise(function(fnResolve, fnReject) {
				// eslint-disable-line no-undef
				oModel.attachEventOnce("metadataLoaded", fnResolve);
				oModel.attachEventOnce("metadataFailed", fnReject);
			});
		}
	});
});