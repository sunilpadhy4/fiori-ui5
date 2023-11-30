sap.ui.define([],function(){
	
	sap.ui.core.Control.extend("oft.fiori.controls.CustomControl",{
		
		//metadata
		metadata: {
			properties: {
				"mario": "",
				"color": "",
				"zumba": ""
			},
			methods: {},
			events: {}
		},
		init  : function(){
			this.setColor("blue");
		},
		renderer: function(oRm,oControl){
			//Talk to browser and hey browser can u put a heading tag for me
			//oRm.write("<h1 style='color:" + oControl.getColor()  + "'>" + oControl.getMario() + "</h1>");
			//huge code, not easy to understand, error prone
			oRm.write("<h1");
			oRm.addStyle("color", oControl.getColor());
			oRm.addStyle("border", oControl.getZumba());
			oRm.writeStyles();
			oRm.write(">" + oControl.getMario() + "</h1>");
		}
			
	});
		
});