Ext.define('QS.store.KpiConcepts', {
    extend: 'Ext.data.Store',
    model: 'QS.model.KpiConcept',
    autoLoad: false,
    groupField: 'KPI',
    stateful: true,
    sorters: [{
        property: 'KPI', direction: 'ASC'
    }, {
        property: 'Rank', direction: 'ASC'
    }],
    
    // TODO: move this to a standalone object and add the behavior where needed
    // Custom Properties and methods
    loadMask: 'KPI Concept Report',   
    
    setLoadMask: function(msg) {
        this.storeMessage = msg;
    },

    // Could override the default models proxi here
});
