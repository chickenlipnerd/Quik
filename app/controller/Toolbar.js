Ext.define('QS.controller.Toolbar', {
    extend: 'Ext.app.Controller',

    views: ['Toolbar', 'Viewer'],

    init: function () {
        this.control({
            'kpitoolbar': {
                beforerender: function(toolbar) {
                    console.log("Controller for " + toolbar.xtype);
                }
            }
        });
    },
    
    addInitialTools: function(toolbar) {
        toolbar.initComponent();
    } 
});
