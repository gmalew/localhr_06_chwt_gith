sap.ui.define([
	"com/roche/chwt/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("com.roche.chwt.controller.Main", {
		_oModel: null,
		_bPreventModelUpdate: false,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.roche.chwt.webapp.view.Master
		 */
		onInit: function() {
			this._oModel = this.getOwnerComponent().getModel();
			this.setModel(new JSONModel(), "config");
			//	debugger;
			this.readData(this);
			
			
		},

		onRadioButtonSelect: function(oEvent) {
			var sWorkingTime = this.getView().getModel("config").getData().WorkingTime;
			var sSelectedIndex = oEvent.getParameter("selectedIndex");
			var aMap = ["750", "775", "800"];
			var sSel = aMap[sSelectedIndex];
			this.updateMyData(sSel, this);
		},

		showSuccessToastMessage: function() {
			var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			MessageToast.show(oBundle.getText("toastMessage.success"));
		},
		
		readData: function(oContext) {
			this._oModel.read("/ConfigurationSet/", {
				success: function(oData, oResponse) {
					var data = oData.results[0];
					oContext.getView().getModel("config").setData(data);
					oContext.getView().getModel("config").refresh();
				}
			});
		},

		updateMyData: function(bNewValue, oContext) {
			// get current data from model
			var oNewData = oContext.getView().getModel("config").getData();
			// update value to the desired one
			oNewData.WorkingTime = bNewValue;
			this._oModel.create("/ConfigurationSet/",
				oNewData, {
					success: function() {
						// set new data and refresh
						oContext.getView().getModel("config").setData(oNewData);
						oContext.getView().getModel("config").refresh();
						oContext.showSuccessToastMessage();
					},
					error: function() {
						console.log("Update error");
					}
				});

		}

	});
});