Ext.define('QS.view.Viewer', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.reportviewer',

    requires: [
        'QS.view.kpiconcept.List',
        'QS.view.kpitrend.List',
        'QS.view.kpitrend.Chart',
        'QS.view.qsoperations.List'
    ],
    
    items: [],
    
    activeItem: 0,
    margins: '5 5 5 5',
    
    cls: 'preview',
    
    initComponent: function () {
        //this.items = [{}];
        this.callParent(arguments);
    },

    addReport: function (report) {
        // TODO: add some logic todetect if a specific tab already exists
        try 
        {
            active = this.add(report);
            this.setActiveTab(active);
            return true;
        } catch(e) {
            return false;
        }
    }
});
