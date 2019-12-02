Ext.define('QS.store.QsOperations', {
    extend: 'Ext.data.Store',
    model: 'QS.model.QsOperations',
    autoLoad: false,
    stateful: true,
    groupField: 'StoreName',
    
    sorters: [{
        property: 'StoreName', direction: 'ASC'
    }],
    
    // Proxy override - delete when no access to a database
    // Comment out when using the database
    //proxy: {
    //    type: 'ajax',
    //    api: {
    //        read: 'data/qsoperations.json'
    //    },
    //    
    //    reader: {
    //        type: 'json',
    //        root: 'qs',
    //        successProperty: 'success'
    //    }
    //},// end of proxy override
    
    /*listener: {
        load: function(my, records, successful, operation, eOpts) {
            console.log(my + " " + records + " " + successful + " " + operation + " " + eOpts);
        }
    },*/
    
    // TODO: move this to a standalone object and add the behavior where needed
    // Custom Properties and methods
    loadMask: 'QS Operations Report is loading...',   
    
    setLoadMask: function(msg) {
        this.storeMessage = msg;
    },

    // Could override the default models proxi here
});
