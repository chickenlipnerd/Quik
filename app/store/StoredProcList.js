Ext.define('QS.store.StoredProcList', {
    extend: 'Ext.data.Store',
    model: 'QS.model.StoredProcList',
    autoLoad: false,
    stateful: true,
    
    //Could override the models default proxi here
});
