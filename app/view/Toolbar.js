Ext.define('QS.view.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.kpitoolbar',
    items: [{
        xtype: 'datefield',
        name: 'startDate',
        id: 'startDate',
        alias: 'date.startDate',
        fieldLabel: 'Start Date',
        hidden: false,
        stateful: false
    }, {
        xtype: 'datefield',
        name: 'endDate',
        id: 'endDate',
        alias: 'date.endDate',
        fieldLabel: 'End Date',
        hidden: false,
        stateful: false
    }, {
        xtype: 'splitbutton',
        itemId: 'choosereport',
        text: 'Choose Report',
        // selections will be handled in it's own store
        //menu: new Ext.menu.Menu({ // this is also valid, but not the new way.
        menu: Ext.create(Ext.menu.Menu, {
            id: 'reportmenu',
            itemId: 'reportmenu'/*,
            items: [{
                itemId: 'mnukpiconcept',
                alias: 'menu.kpiconceptresults',
                id: 'mnukpiconcept',
                text: 'KPI Concept', 
            }, {
                itemId: 'mnukpitrendchart',
                alias: 'menu.kpitrendchart',
                id: 'mnukpitrendchart',
                text: 'KPI Trend', 
            }, {
                itemId: 'mnuqsoperations',
                alias: 'menu.qsoperations',
                id: 'mnuqsoperations',
                text: 'Sales Ledger', //QS Operations
            }]*/
        })
    }, {
        text: 'Refresh',
        icon: './resources/images/refresh.gif'
    }],

    initComponent: function() {
        //console.log("Initialize the actual toolbar");
        
        this.callParent();
    }
});
