Ext.define('QS.store.SpecMatrix', {
    extend: 'Ext.data.Store',
    model: 'QS.model.KpiTrend',
    autoLoad: true,
    groupField: 'Per',
    stateful: true,

    //Could override the models default proxi here
});
