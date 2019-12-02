Ext.define('QS.store.KpiTrends', {
    extend: 'Ext.data.Store',
    model: 'QS.model.KpiTrend',
    autoLoad: false,
    groupField: 'Per',
    stateful: true,
    
    // Custom Properties and methods
    loadMask: 'KPI Trend Report',   
    
    setLoadMask: function(msg) {
        this.storeMessage = msg;
    },
    
    //Could override the models default proxi here
});
