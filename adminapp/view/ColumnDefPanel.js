Ext.define('QS.view.ColumnDefPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.columndefpanel',
    closable: true,
    
    /*listeners: {
        scope: this,
        'afterrender': function() {
            Ext.ComponentQuery.query('reportviewer')[0].setLoading(false);
        }
    },*/
   
    initComponent: function() {

        this.callParent(arguments);
    }
});
