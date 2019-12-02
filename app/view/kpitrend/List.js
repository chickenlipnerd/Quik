Ext.define('QS.view.kpitrend.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kpitrendresults',
    store: 'KpiTrends',
    title: 'KPI Trend',
    closable: true,
    //stateful: true,
    //closable: true,
    //stateId: 'trendState',
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupHeader: false,
        enableGroupingMenu: true
    }],
    columns: [
        { header: 'Org', dataIndex: 'Org', flex: 1 },
        { header: 'MM', dataIndex: 'MM', flex: 1 },
        { header: 'DM', dataIndex: 'DM', flex: 1 },
        { header: 'Loc', dataIndex: 'Loc', flex: 1 },
        { header: 'Store', dataIndex: 'Store', flex: 1 },
        { header: 'KPI', dataIndex: 'KPI', flex: 1 },
        { header: 'Per', dataIndex: 'Per', flex: 1 },
        { header: 'Val1', dataIndex: 'Val1', flex: 1 },
        { header: 'Val2', dataIndex: 'Val2', flex: 1 },
        { header: 'ReportValue', dataIndex: 'ReportValue', flex: 1 },
        { header: 'BenchMark', dataIndex: 'BenchMark', flex: 1 },
        { header: 'BenchMark2', dataIndex: 'BenchMark2', flex: 1 }
    ],

    initComponent: function () {
        this.callParent(arguments);
    }

});
