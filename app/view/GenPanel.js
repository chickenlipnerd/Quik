Ext.define('QS.view.GenPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.genpanel',
    closable: true,
    
    listeners: {
        scope: this,
        'afterrender': function() {
            Ext.ComponentQuery.query('reportviewer')[0].setLoading(false);
        }
    },

    /*tbar: ['-', {
        xtype: 'datefield',
        name: 'startDate',
        fieldLabel: 'Start Date',
        labelWidth: '1em',
        hidden: false
    }, {
        xtype: 'datefield',
        name: 'endDate',
        fieldLabel: 'End Date',
        labelWidth: '1em',
        hidden: false
    }, {
        text: 'Refresh',
        icon: './resources/images/refresh.gif',
        hidden: false
    }],*/
   
    initComponent: function() {
        this.setAutoScroll(true);
        this.callParent(arguments);
    }
});
