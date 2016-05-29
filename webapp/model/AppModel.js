jQuery.sap.declare("com.roche.chwt.model.AppModel");
sap.ui.define([
		"sap/ui/model/json/JSONModel",
		"sap/ui/Device",
		"sap/ui/model/resource/ResourceModel",
		"sap/ui/model/odata/v2/ODataModel"]);
		
		sap.ui.model.Model.extend("com.roche.chwt.model.AppModel", {
			_oModel: null, // oData Model class
			
			AppModel: function (sServiceUrl) {
				this._oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, {
					disableHeadRequestForToken: false, // if service does not suppor head request (405) set to True
					tokenHandling: true,
					json: true,
					useBatch: false

				});
				this.readModelData();
			},
			readModelData: function() {
				console.log("reading model data")
			}

		});