Ext.define('QS.view.ToolbarPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.toolbarpanel',
    items: [{
        xtype: 'kpitoolbar'
    }],
   
    //TODO: get rid of this ...put in view.Viewport
    initComponent: function() {
        //console.log("Initialize the Toolbar's panel Panel");
        this.callParent(arguments);
    }
});
