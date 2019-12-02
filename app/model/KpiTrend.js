Ext.define('QS.model.KpiTrend', {
	extend: 'Ext.data.Model',
	fields:
    [
        {name: 'Org', type: 'string'},
        {name: 'MM', type: 'string'},
        {name: 'DM', type: 'string'},
        {name: 'Loc', type: 'string'},
        {name: 'Store', type: 'string'},
        {name: 'KPI', type: 'string'},
        {name: 'Per', type: 'string'},
        {name: 'Val1', type: 'float'},
        {name: 'Val2', type: 'float'},
        {name: 'ReportValue', type: 'float'},
        {name: 'BenchMark', type: 'float'},
        {name: 'BenchMark2', type: 'float'}
    ],
    
    proxy: {
        type: 'ajax',
        url: /\/$/g.test(location.href.split('?')[0]) ? "reportproc.aspx" : "/reportproc.aspx",
        reader: {
            type: 'json',
            root: 'kpitrend',
            successProperty: 'success'
        },
        /*extraParams: {      // Set in Controller code - example here
            uid: 501,
            sDate: '2011,12,01',
            eDate: '2011,12,07'
        },*/
        actionMethods: {
            read: 'POST'
        },
        timeout: 120000 
    }
});
