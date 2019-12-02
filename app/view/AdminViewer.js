Ext.define('QS.view.AdminViewer', {
    extend: 'Ext.panel.Panel',
//    extend: 'Ext.form.Panel',
    alias: 'widget.adminviewer',
    autoScroll: true,

    requires: [
        'QS.common.HelperMethods',
        'QS.common.GridFactory',
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
    
    items: [],
    
    activeItem: 0,
    margins: '5 5 5 5',
    
    cls: 'preview',
    
    initComponent: function () {

        this.callParent(arguments);
    }
});
