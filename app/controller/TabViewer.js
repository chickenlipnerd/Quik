Ext.define('QS.controller.TabViewer', {
    extend: 'Ext.app.Controller',

    views: ['Viewer'],

    init: function () {
        this.control({
            'reportviewer': {
                add: function(viewer) {
                    console.log("after adding a tab " + viewer.xtypes);
                },
                // adding beforerender has adverse effect on scrollbars - sometimes they done't show up unless'
                // you force a refresh of the view port
                afterrender: function(viewer) {
                    console.log('viewer on render fired');
                    //this is for testing purposes. This should be triggered by Choose Report button
                    viewer.addReport('KPI Concept Grid Report', 'kpiconceptresults');
                    viewer.addReport('KPI Trend Grid Report', 'kpitrendresults');
                    viewer.addReport('KPI Trend Chart Report', 'kpitrendchart');
                }
            }
        });
        
        // TODO: Add Events

    },
    
    onPanelRendered: function() {
        console.log("Controller for the Report Viewer");
    }
});
