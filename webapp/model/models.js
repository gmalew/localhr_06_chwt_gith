sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/odata/v2/ODataModel"
], function(JSONModel, Device, ResourceModel, ODataModel) {
	"use strict";

	return {
		createResourceModel: function(sBundleName) {
			var oResourceModel = new ResourceModel({
				bundleName: sBundleName
			});
			return oResourceModel;
		},
		createModel: function(sServiceUrl) {
			var oModel = new ODataModel(sServiceUrl, {
				disableHeadRequestForToken: false, // if service does not suppor head request (405) set to True
				tokenHandling: true,
				json: true,
				useBatch: false
			
			});
			
			return oModel;
		},
		
		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	};

});