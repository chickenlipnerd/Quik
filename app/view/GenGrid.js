Ext.define('QS.view.GenGrid', {
    extend: 'Ext.grid.Panel',
    viewConfig: {
        loadMask: false,
        style: {overflow: 'auto', overflowX: 'hidden'}
    },
    scroll: false,
    closable: true,
    tbar: [{
        xtype: 'tbtext',
        text: 'add date and refresh here...',
        reorderable: false
    }],
    stripeRows: true,
    features: [],
    columns: [],
    initComponent: function () {

        this.superclass.extras = new QS.common.HelperMethods();
        this.extras = new QS.common.HelperMethods();
        
        this.callParent(arguments);
    }
});
