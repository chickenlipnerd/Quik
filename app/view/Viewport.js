Ext.define('QS.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'QS.common.HelperMethods',
        //'QS.view.Viewer',
        'QS.view.ToolbarPanel',
        /*'QS.view.Toolbar',
        'QS.view.GenPanel',
        'QS.view.kpiconcept.List',
        'QS.view.kpitrend.List',
        'QS.view.kpitrend.Chart',*/
        'QS.view.*',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'Ext.chart.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.ux.grid.FiltersFeature'
    ],

    layout: 'border',

    initComponent: function() {
        this.items = [{
            region: 'north',
            xtype: 'toolbarpanel'
        }, {
            region: 'center',
            xtype: 'reportviewer'
        }];
        
        this.callParent();
    }
});
