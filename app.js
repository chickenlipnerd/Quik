Ext.application({
    name: 'QS', /* Global namespace for the application */
    appFolder: /\/$/g.test(location.href.split('?')[0]) ? "app" : "/app",
    //models: ['KpiConcept', 'KpiTrend'],
    //stores: ['KpiConcepts', 'KpiTrends'],
    controllers: [
        /*'KpiTrend',
        'KpiConcept',
        'TabViewer',
        'Toolbar'*/
       'Report',
       'DynamicReport'
	],
    autoCreateViewport: true,
	launch: function() {
	    //console.log("The Application has successfully been launched and is ready to use.");
	}
});
