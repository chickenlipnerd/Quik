Ext.define('QS.model.StoredProcList', {
	extend: 'Ext.data.Model',
	fields:
    [
        { name: 'name', type: 'string'  }
    ],
    
    proxy: {
        type: 'ajax',
        url: /\/$/g.test(location.href.split('?')[0]) ? "webreportsadmin.aspx/getsplist" : "/webreportsadmin.aspx/getsplist",
        reader: {
            type: 'json',
            root: 'root',
            successProperty: 'success'
        },
        /*extraParams: {      // Set in Controller code - example here
            uid: 501,
            sDate: '2011,12,01',
            eDate: '2011,12,07'
        },*/
        actionMethods: {
            read: 'GET'
        },
        timeout: 120000 
    }
});
