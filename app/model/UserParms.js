Ext.define('QS.model.UserParms', {
	extend: 'Ext.data.Model',
	fields:
    [
        { name: 'UserId', type: 'int'},
        { name: 'ReportName', type: 'string' },
        { name: 'Procedure', type: 'string' },
        { name: 'WebReportId', type: 'int' },
        { name: 'WebReportSettingId', type: 'int' },
        { name: 'CustomReportName', type: 'string' },
        { name: 'Type', type: 'int'  },
        { name: 'Organization', type: 'string' },
        { name: 'ColumnDefinition', type: 'string' },
        { name: 'Market', type: 'string' },
        { name: 'Company', type: 'string' },
        { name: 'DM', type: 'string' },
        { name: 'Store', type: 'string' },
        {
            name: 'FromDate',   
            type: 'string',
            convert: function(val, record) {        // move to helper
                var nDate,
                    date;
                    
                if (val != null) {
                    nDate = Number(val.substr(6,13));
                    date = new Date(nDate);
                } else {
                    nDate = new Date();
                    nDate.setDate(1);
                    date = nDate;
                }
                
                return Ext.Date.format(date, 'm/d/Y');
            } 
        },
        {
            name: 'ToDate', 
            type: 'float',
            convert: function(val, record) {
                var nDate,
                    date;
                    
                if (val != null) {
                    nDate = Number(val.substr(6,13));
                    date = new Date(nDate);
                } else {
                    date = new Date();
                }
                
                return Ext.Date.format(date, 'm/d/Y');
            } 
        }
    ],
    
    proxy: {
        type: 'ajax',
        url: /\/$/g.test(location.href.split('?')[0]) ? "userparms.aspx" : "/userparms.aspx",
        reader: {
            type: 'json',
            root: 'userparms',
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
