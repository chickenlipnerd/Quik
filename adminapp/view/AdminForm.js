Ext.define('QS.view.AdminForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adminform',
    url:/\/$/g.test(location.href.split('?')[0]) ? "webreportsadmin.aspx/Create" : "/webreportsadmin.aspx/Create",
    frame: true,
    alias: 'createwebreports',
    title: 'Create a new web report',
    bodyStyle:'padding:5px 5px 0',
    width: 400,
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 150
    },
    //defaultType: 'textfield',
    defaults: {
        anchor: '100%'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Web Report Info',
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [{
            fieldLabel: 'Report Name',
            name: 'ReportName',
            allowBlank: false
        }, this.statusCombo, this.dateRangeTypeCombo,
        {
            xtype: 'datefield',
            fieldLabel: 'Seed Date',
            name: 'SeedDate',
        }, {
            fieldLabel: 'Seed Increment',
            name: 'SeedIncrement',
            allowBlank: false,
            vtype: 'numeric'
        }, {
            //fieldLabel: 'Type',
            xtype: 'hidden',
            name: 'Type',
            value: 1,
        }]
    }, {
        xtype: 'fieldset',
        title: 'Stored Procedure Parameters',
        collapsible: true,
        collapsed: true,
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        /*sDate.ToString(), 
        eDate.ToString(), 
        org.ToString(), 
        company.ToString(), 
        market.ToString(), 
        dm.ToString(), 
        storenum.ToString()*/
        items: [{
            xtype: 'datefield',
            fieldLabel: 'Start Date',
            name: 'sDate'
        }, {
            xtype: 'datefield',
            fieldLabel: 'End Date',
            name: 'eDate'
        }, {
            fieldLabel: 'Organization',
            name: 'org',
        }, {
            fieldLabel: 'Company',
            name: 'company'
        }, {
            fieldLabel: 'Market',
            name: 'market'
        }, {
            fieldLabel: 'DM',
            name: 'dm'
        }, {
            fieldLabel: 'Store Number',
            name: 'storenum'
        }]
    }, {
        xtype: 'fieldset',
        title: 'Stored Procedure Configuration',
        collapsible: false,
        collapsed: false,
        defaultType: 'textfield',
        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },
        items: [ this.storedProcCombo, {
            fieldLabel: 'Column Definition',
            name: 'ColumnDefinition'
        }]
    }],

    buttons: [{
        text: 'Create',
        formBind: true,
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.msg);
                        form.reset();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.msg);
                    }
                });
            }
        }
    }/*,{
        text: 'Cancel'
    }*/],

    listeners: {
        scope: this,
        'beforerender': function() {
            
        }
    },

    initComponent: function() {
        var htmlPart = Ext.create('Ext.Panel', {
            region: 'top',
            html: '<a href="/Admn.aspx/Create">Create New Web Report</a>',
            width: 300,
            height: 100,
            padding: 20,
            style: {
                color: '#000000',
                backgroundColor: '#FFFFFF'
            }
        });
        
        var storedProcCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Procedure',
            displayField: 'name',
            name: 'Procedure',
            store: this.getStoredProcListStore(),
            queryMode: 'remote',
            typeAhead: true
        });
        
        /// start of Status combo box
        Ext.define('StatusModel', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'int', name: 'value'},
                {type: 'string', name: 'name'}
            ]
        });
        
        var statusList = [
            {"value": 1, "name": "Active"},
            {"value": 0, "name": "Inactive"}
        ];
        
        var statusStore = Ext.create('Ext.data.Store', {
            model: 'StatusModel',
            data: statusList
        });
        
        var statusCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Status',
            displayField: 'name',
            valueField: 'value',
            store: statusStore,
            queryMode: 'local',
            name: 'Status',
            //width: 40
        });
        /// end of Status Combo configuration
        
        /// start of DateRangeType combo box
        Ext.define('DateRangeTypeModel', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'int', name: 'value'},
                {type: 'string', name: 'name'}
            ]
        });
        
        var DateRangeTypeList = [
            {"value": 1, "name": "WTD"},
            {"value": 2, "name": "MTD"},
            {"value": 3, "name": "PTD"},
            {"value": 4, "name": "Daily"}
        ];
        
        var dateRangeTypeStore = Ext.create('Ext.data.Store', {
            model: 'DateRangeTypeModel',
            data: DateRangeTypeList
        });
        
        var dateRangeTypeCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Date Range Type',
            displayField: 'name',
            valueField: 'value',
            store: dateRangeTypeStore,
            queryMode: 'local',
            name: 'DateRangeType',
            //width: 40
        });
        /// end of DateRangeType Combo configuration
        
        /// start of Formatting combo box
        Ext.define('FormattingCboModel', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'string', name: 'value'},
                {type: 'string', name: 'name'}
            ]
        });
        
        var formatingList = [
            {"value": 'formatCurrency', "name": "Currency"},
            {"value": 'formatPercent', "name": "Percent"},
            {"value": 'formatNumber', "name": "Number"},
            {"value": 'formatString', "name": "String"}
        ];
        
        var formattingStore = Ext.create('Ext.data.Store', {
            model: 'FormattingCboModel',
            data: formatingList
        });
        
        this.callParent(arguments);
    }
});
