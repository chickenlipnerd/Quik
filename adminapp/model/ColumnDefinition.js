Ext.define('QSAdmin.model.ColumnDefinition', {
	extend: 'Ext.data.Model',
	fields:
    [
        { name: 'name', type: 'string'  }
    ],
    
    proxy: {
        type: 'ajax',
        url: /\/$/g.test(location.href.split('?')[0]) ? "columndefinitions.aspx" : "/columndefinitions.aspx",
        reader: {
            type: 'json',
            root: 'root',
            successProperty: 'success'
        },
        /*extraParams: {      // Set in Controller code - example here
            uid: 540,
            sp: 'terKPIConceptV2',
            sDate: '2011,12,01',
            eDate: '2011,12,07',
            org: 'TJCorp',
            company: '',
            market: '',
            dm: '',
            storenum: ''
        },*/
        actionMethods: {
            read: 'POST'
        },
        timeout: 120000 
    }
});
