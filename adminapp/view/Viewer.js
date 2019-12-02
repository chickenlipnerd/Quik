Ext.define('QSAdmin.view.Viewer', {
    extend: 'Ext.panel.Panel',
//    extend: 'Ext.form.Panel',
    alias: 'widget.adminviewer',
    autoScroll: true,

    /*requires: [
        
    ],*/
    
    items: [],
    
    activeItem: 0,
    margins: '5 5 5 5',
    
    cls: 'preview',
    
    initComponent: function () {

        this.callParent(arguments);
    }
});
