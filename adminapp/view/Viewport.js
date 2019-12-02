Ext.define('QSAdmin.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'QSAdmin.extra.HelperMethods',
        'QSAdmin.view.*',
        'QSAdmin.controller.DynamicGrid',
        'Ext.selection.CellModel',
        'Ext.layout.container.Border',
        'Ext.layout.container.Column',
        'Ext.chart.*',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.grid.PagingScroller',
        'Ext.ux.grid.FiltersFeature',
        'Ext.state.*',
        'Ext.form.*',
        'Ext.window.MessageBox',
        'Ext.fx.target.Element',
        'Ext.layout.container.Column',
        'Ext.tab.Panel',
        'Ext.ux.CheckColumn'
    ],

    layout: 'border',

    initComponent: function() {
        this.items = [{
            region: 'center',
            xtype: 'adminviewer'
        }/*, {
            xtype: 'panel',
            html: '<input type="text" name="inputField" />',
            region: 'south',
            //width: 880
        }*/];
        
        this.callParent();
    }
});
