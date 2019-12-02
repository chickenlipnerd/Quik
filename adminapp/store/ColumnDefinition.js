Ext.define('QSAdmin.store.ColumnDefinition', {
    extend: 'Ext.data.Store',
    model: 'QSAdmin.model.ColumnDefinition',
    autoLoad: false,
    stateful: true,
    
    //Could override the models default proxi here
});
