Ext.define('QS.model.ReportFieldsSetting', {
	extend: 'Ext.data.Model',
	fields:
    [
        { name: 'WebReportFieldSettingId', type: 'int'  },
        { name: 'DefaultFieldName', type: 'string'  },
        { name: 'Procedure', type: 'string'  },
        { name: 'CustomFieldName', type: 'string' },
        { name: 'SortOrder', type: 'int'  },
        { name: 'Visible', type: 'int'  }
    ],
    
    proxy: {
        type: 'ajax',
        url: /\/$/g.test(location.href.split('?')[0]) ? "reportfieldssetting.aspx" : "/reportfieldssetting.aspx",
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
