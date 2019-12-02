Ext.define('QS.model.KpiConcept', {
	extend: 'Ext.data.Model',
	fields:
    [
        {name: 'Store', type: 'string'},
        {name: 'Org', type: 'string'},
        {name: 'MM', type: 'string'},
        {name: 'DM', type: 'string'},
        {name: 'Loc', type: 'string'},
        {name: 'KPI', type: 'string'},
        {name: 'Val1', type: 'float'},
        {name: 'Val2', type: 'float'},
        {name: 'Val3', type: 'float'},
        {name: 'Rank', type: 'int'},
        {name: 'MaxRank', type: 'int'},
        {name: 'RankPerc', type: 'float'},
        {name: 'Band', type: 'int'},
        {name: 'FBC', type: 'string'}
    ],
    
    proxy: {
        type: 'ajax',
        //headers: { 'Content-Type': 'application/json;charset=utf-8'},  //This tells ASP.NET to return JSON formatted response
        //url: /\/$/g.test(location.href.split('?')[0]) ? "kpiconcept.aspx" : "/kpiconcept.aspx",
        url: /\/$/g.test(location.href.split('?')[0]) ? "reportproc.aspx" : "/reportproc.aspx",
        reader: {
            type: 'json',
            root: 'kpiconcept',
            successProperty: 'success'
        },
        /*extraParams: {      // Set in controller - example here
            uid: 501,
            sDate: '2011,12,01',
            eDate: '2011,12,07'
        },*/
        actionMethods: {
            read: 'POST'
        }, 
        timeout: 240000
    }
});
