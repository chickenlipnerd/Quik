Ext.define('QSAdmin.store.StoredProcList', {
    extend: 'Ext.data.Store',
    model: 'QSAdmin.model.StoredProcList',
    autoLoad: false,
    stateful: true,
    
    //Could override the models default proxi here
});
