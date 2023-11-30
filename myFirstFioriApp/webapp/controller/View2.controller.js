sap.ui.define([
	"oft/fiori/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function(Controller, MessageAPI, StatusMessage) {
	"use strict";

	return Controller.extend("oft.fiori.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf oft.fiori.view.View2
		 */
		onInit: function() {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
		},
		herculis: function(oParams){
			//Whenever route changes this method will get called
			debugger;
			//Read the URL hash tag, read the index passed by View 1 in URL params
			var sPath = oParams.getParameters().arguments.fruitId;
			//Prepare the address of selected fruit using the index
			sPath = "/" + sPath;
			//Bind that address of selected fruit with the current view
			this.getView().bindElement({
				path: sPath
				// parameters: {
				// 	expand: "ToSupplier"
				// }
			});
			//console.log(oParams);
		},
		onAnubhav: function(){
			sap.m.MessageBox.alert("wow, you hovered")	;
		},
		onBack: function(){
			//Step 1: get the app object from base class method
			//Step 2: navigate to view1 - idView1
			this.getAppObject().to("idView1");
		},
		popupClose: function(choice){

			if(choice === "OK"){
				var oFirtTab = this.getView().byId("zumba");
				oFirtTab.setVisible(false);
				
				StatusMessage.show("Your request has been approved successfully!");	
			}
		},
		onAccept: function(){
			//alert("")	;
			MessageAPI.confirm("Would you like to approve sir?",{
				title:"Anubhav",
				onClose: this.popupClose.bind(this)
			});
		},
		cityPopup: null,
		countryPopup: null,
		inputFieldIdonWhichF4inTableWasPressed: null,
		onCityConfirm: function(oEvent){
			var oItem = oEvent.getParameter("selectedItem");
			sap.ui.getCore()
				.byId(this.inputFieldIdonWhichF4inTableWasPressed)
				.setValue(oItem.getTitle());
		},
		onF4Help: function(oEvent){
			
			this.inputFieldIdonWhichF4inTableWasPressed = oEvent.getSource().getId();
			
		   	//StatusMessage.show("This page is under construction...");
		   	if(this.cityPopup == null){
		   		//creating ALV object
			   	this.cityPopup = new sap.ui.xmlfragment("oft.fiori.fragments.Popup", this);
			   	//setting FC
			   	this.getView().addDependent(this.cityPopup);
			   	//Set table for first display
			   	this.cityPopup.bindAggregation("items", {
					path: "/cities",
					template: new sap.m.StandardListItem({
						title:"{city}",
						description: "{famousFor}"
					})
				});	
				//Set custom toolvbar event lcl_event_handler
				this.cityPopup.attachConfirm(this.onCityConfirm, this);
		   	}
		   	
		   	this.cityPopup.open();
		},
		onFilter: function(){
			//StatusMessage.show("This page is under construction...");
			this.countryPopup = new sap.ui.xmlfragment("oft.fiori.fragments.Popup", this);
			//this statement will give access to all what view knows - all the models
			//which are available at the view level
			this.getView().addDependent(this.countryPopup);
			this.countryPopup.bindAggregation("items", {
				path: "/countries",
				template: new sap.m.StandardListItem({
					title:"{name}",
					description: "{code}"
				})
			});
		   	this.countryPopup.open();
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf oft.fiori.view.View2
		 */
		onBeforeRendering: function() {
			
		},
		onAfterRendering: function(){
			var val = this.getAnubhav();
			
			this.getView().getAggregation("content")[0].setTitle(val);
		}

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf oft.fiori.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf oft.fiori.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});