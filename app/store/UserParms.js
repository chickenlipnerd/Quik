Ext.define('QS.store.UserParms', {
    extend: 'Ext.data.Store',
    model: 'QS.model.UserParms',
    autoLoad: false,
    stateful: true,
    
    //Could override the models default proxi here
    //Comment out to use the return from the database
    /*proxy: {
        type: 'ajax',
        api: {
            read: 'data/userparms.json'
        },
        
        reader: {
            type: 'json',
            root: 'up',
            successProperty: 'success'
        }
    }*/
});
