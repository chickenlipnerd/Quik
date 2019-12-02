Ext.application({
    name: 'QS', /* Global namespace for the application */
    appFolder: /\/$/g.test(location.href.split('?')[0]) ? "app" : "/app",
    controllers: [
       'Admin'
	],
    autoCreateViewport: false,
    launch: function () {
        //console.log("The Admin Application has successfully been launched and is ready to use.");
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    xtype: 'adminviewer',
                    region: 'center'
                }
            ]
        });
    }
});
