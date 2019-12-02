Ext.define('QS.controller.KpiTrend', {
    extend: 'Ext.app.Controller',
    stores: ['KpiTrends'],

    views: ['kpitrend.List'],

    init: function () {
        this.control({
            'kpitrendresults': {
                //itemdblclick: this.editUser
                render: this.onPanelRendered
            }
        });
    },
    
    onPanelRendered: function() {
        console.log("On Render: Controller for KPI Trend Results Grid");
    }

});
