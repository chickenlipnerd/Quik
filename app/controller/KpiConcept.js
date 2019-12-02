Ext.define('QS.controller.KpiConcept', {
    extend: 'Ext.app.Controller',
    stores: ['KpiConcepts'],

    views: ['kpiconcept.List'],

    init: function () {
        this.control({
            'kpiconceptresults': {
                itemdblclick: function(grid) {
                    console.log("Double click event ");
                },
                render: this.onPanelRendered,
                afterlayout: function(grid) {
                    console.log("After Layout: Controller is working for KPI Concepts grid View")
                }
            }
        });
    },
    
    onPanelRendered: function() {
        console.log("On Render: Controller for KPI Concept Results Grid");
    }
});
