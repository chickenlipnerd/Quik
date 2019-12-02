/// <reference path="../../Scripts/jquery-olu1.7.2-vsdoc.js" />
/// <reference path="../../Scripts/jquery-1.7.2.js" />
/// <reference path="file://C:/Apps/extjs/ext-all-debug-w-comments.js" />

/// Admin controller to manage adding new reports to the system

Ext.define('QSAdmin.controller.Admin', {
    extend: 'Ext.app.Controller',
    stores: [
        'StoredProcList',
        'ColumnDefinition'
    ],
    views: [
        'Viewer'/*,
        'AdminForm',
        'ColumnDefPanel'*/
    ],
    
    refs: [{
        ref: 'adminViewer',
        selector: 'adminviewer'
    }],

    init: function () {
        
        var re1digit = /^\d{1}$/,   //regular expression defining a 1 digit number
            re2digit = /^\d{2}$/,   //regular expression defining a 2 digit number
            re5digit = /^\d{5}$/,   //regular expression defining a 5 digit number
            wholeNumber = /^\s*\d+\s*$/;
        Ext.apply(Ext.form.field.VTypes, {
            numeric: function(val, field) {
                if ( (re1digit.test(val)) || (re2digit.test(val)) ) {
                    return true;
                } else {
                    return false;
                }
            },
            numericText: 'Must be a one or two digit whole number.'
        });
        
        var spStore; // this.getStoredProcListStore();
        var spColStore; // this.getColumnDefinitionStore(); 
                
        this.control({
            'adminviewer': {
                beforerender: function (viewer) {
                    spStore = this.getStoredProcListStore();
                    spStore.load();
                    
                    spColStore = this.getColumnDefinitionStore();
                    //spColStore.load();
                },
                
                afterrender: function(viewer) {
                    
                    var htmlPart = Ext.create('Ext.Panel', {
                        region: 'east',
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
                        id: 'Procedure',
                        store: spStore,//this.getStoredProcListStore(),
                        queryMode: 'local',//'remote',
                        typeAhead: true, 
                        listeners: {
                            select: function(combo, records, eOpts ) {
                                
                                var colForm = Ext.getCmp('formcolumnsdefs');
                                colForm.removeAll();

                                var colStore, itsProxy, sParms,
                                    sProcedure, 
                                    sSDate, 
                                    sEDate, 
                                    sOrg, 
                                    sCompany, 
                                    sMarket, 
                                    sDm, 
                                    sStorenum; 
        
                                colStore = spColStore;
                                
                                sProcedure = Ext.getCmp('Procedure').getValue();
                                sSDate = Ext.getCmp('sDate').getValue();
                                sEDate = Ext.getCmp('eDate').getValue();
                                sOrg = Ext.getCmp('org').getValue();
                                sCompany = Ext.getCmp('company').getValue();
                                market = Ext.getCmp('market').getValue();
                                sDm = Ext.getCmp('dm').getValue();
                                sStorenum = Ext.getCmp('storenum').getValue();
                                
                                sParms = { sp: sProcedure, uid: '540', sDate: sSDate, eDate: sEDate, org: sOrg, company: sCompany, market: sMarket, dm: sDm, storenum: sStorenum };
                                itsProxy = colStore.getProxy();
                                
                                itsProxy.extraParams = sParms;
                                colStore.setProxy(itsProxy);
                                
                                colStore.load();
                            }
                        }
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
                    /// start of Formatting combo box
                    
                    var ColumnDefPanel = Ext.create('Ext.form.Panel', {
                        region: 'south',
                        alias: 'columndefs',
                        id: 'columndefs',
                        items: [{
                            xtype: 'form',
                            id: 'formcolumnsdefs',
                            name: 'formcolumnsdefs',
                            frame: true,
                            title: 'Column Definition',
                            bodyStyle: 'padding: 5px 5px 0',
                            //width: 800,
                            anchor: '100%',
                            
                            ///items: [{// column definition example 1 fieldset
                            ///    xtype: 'fieldset',
                            ///    title: 'val',
                            ///    layout: 'column', //'anchor',
                            ///    defaultType: 'textfield',
                            ///    fieldDefaults: {
                            ///        labelAlign: 'top',
                            ///        msgTarget: 'side',
                            ///        labelWidth: 150
                            ///    },
                            ///    
                            ///    items: [{
                            ///        xtype: 'checkbox', // checkbox to select the field
                            ///        metaname: 'fieldenabled',
                            ///        fieldLabel: 'Enable Field',
                            ///        checked: true
                            ///    }, {
                            ///        fieldLabel: 'Custom Column Name', // textfield to name the field
                            ///        metaname: 'header'
                            ///    }, {
                            ///        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                            ///        metaname: 'datatype',
                            ///        value: 'string'
                            ///    }, {
                            ///        xtype: 'combo',    // dropdown to specify formatting
                            ///        fieldLabel: 'Formatting',
                            ///        queryMode: 'local',
                            ///        store: formattingStore,
                            ///        displayField: 'name',
                            ///        valueField: 'value',
                            ///        metaname: 'renderer'
                            ///    }]
                            ///
                            ///}, {// column definition example 2 fieldset
                            ///    xtype: 'fieldset',
                            ///    title: 'name', // name of the column as it is in the stored procedure
                            ///    layout: 'column', //'anchor',
                            ///    defaultType: 'textfield',
                            ///    fieldDefaults: {
                            ///        labelAlign: 'top',
                            ///        msgTarget: 'side',
                            ///        labelWidth: 150
                            ///    },
                            ///
                            ///    items: [{
                            ///        xtype: 'checkbox', // checkbox to select the field
                            ///        metaname: 'fieldenabled',
                            ///        fieldLabel: 'Enable Field',
                            ///        checked: true
                            ///    }, {
                            ///        fieldLabel: 'Custom Column Name', // textfield to name the field
                            ///        metaname: 'header'
                            ///    }, {
                            ///        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                            ///        metaname: 'datatype',
                            ///        value: 'int'
                            ///    }, {
                            ///        xtype: 'combo',    // dropdown to specify formatting
                            ///        fieldLabel: 'Formatting',
                            ///        queryMode: 'local',
                            ///        store: formattingStore,
                            ///        displayField: 'name',
                            ///        valueField: 'value',
                            ///        metaname: 'renderer'
                            ///    }]
                            ///
                            ///}]
                        }]

                    });

                    var createWebReport = Ext.create('Ext.form.Panel', {
                        url:/\/$/g.test(location.href.split('?')[0]) ? "webreportsadmin.aspx/Create" : "/webreportsadmin.aspx/Create",
                        frame: true,
                        region: 'west',
                        alias: 'createwebreports',
                        id: 'createwebreports',
                        title: 'Create a new web report',
                        bodyStyle:'padding:5px 5px 0',
                        width: 400,
                        fieldDefaults: {
                            msgTarget: 'side',
                            labelWidth: 150
                        },
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
                            }, statusCombo, dateRangeTypeCombo,
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
                            //// List of standard report stored procedure parameters
                            //sDate.ToString(), 
                            //eDate.ToString(), 
                            //org.ToString(), 
                            //company.ToString(), 
                            //market.ToString(), 
                            //dm.ToString(), 
                            //storenum.ToString()
                            items: [{
                                xtype: 'datefield',
                                fieldLabel: 'Start Date',
                                name: 'sDate',
                                id: 'sDate'
                            }, {
                                xtype: 'datefield',
                                fieldLabel: 'End Date',
                                name: 'eDate',
                                id: 'eDate'
                            }, {
                                fieldLabel: 'Organization',
                                name: 'org',
                                id: 'org'
                            }, {
                                fieldLabel: 'Company',
                                name: 'company',
                                id: 'company'
                            }, {
                                fieldLabel: 'Market',
                                name: 'market',
                                id: 'market'
                            }, {
                                fieldLabel: 'DM',
                                name: 'dm',
                                id: 'dm'
                            }, {
                                fieldLabel: 'Store Number',
                                name: 'storenum',
                                id: 'storenum'
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
                            
                            items: [storedProcCombo, {
                                xtype: 'hidden',
                                //fieldLabel: 'Column Definition',
                                name: 'ColumnDefinition',
                                id: 'ColumnDefinition'
                            }]
                            
                        }],
                
                        buttons: [{
                            text: 'Create',
                            formBind: true,
                            handler: function() {
                                var columndata = Ext.getCmp('formcolumnsdefs'),
                                    colinfo = [];
                                    
                                columndata.items.each(function (coldef, index, length) {

                                    var dataIndex = coldef.title,  // cantaining fieldset
                                        colobj = {};
                                    
                                    if (coldef.items.items[0].value) {
                                        colobj = { 
                                            "header": (typeof coldef.items.items[1].value === 'undefined' || coldef.items.items[1].value == "") ? dataIndex : coldef.items.items[1].value,
                                            "dataIndex": dataIndex,
                                            "datatype": coldef.items.items[2].value,
                                            "renderer": coldef.items.items[3].value
                                        }
                                        
                                        colinfo.push(colobj);
                                    }
                                    
                                    // each fieldset contains checkbox, textbox, hidden, combo
                                    //coldef.items.each(function (colmeta, index, length) {
                                    //    var colInfo = [], colData = {};
                                    //    
                                    //    if (colmeta.metaname == 'fieldenabled') {
                                    //        colData = { addField: colmeta.value };
                                    //        colInfo.push(colData);
                                    //    }
                                    //                                            
                                    //    colobj = { "header": headername, "dataIndex": colmeta.value };
                                    //    console.log(colmeta);
                                    //}, this);
                                    
                                }, this);

                                //console.log(Ext.JSON.encode(colinfo));
                                ///var tempObj = Ext.JSON.encode(colinfo);
                                ///console.log(tempObj);
                                ///tempObj = Ext.JSON.decode(tempObj);
                                ///console.log(tempObj);
                                
                                var coldefFrmField = Ext.getCmp('ColumnDefinition'),
                                    coldefString = Ext.JSON.encode(colinfo);
                                    
                                coldefFrmField.setValue(coldefString);
                                
                                columndata.up('form').getForm().reset();
                                                                    
                                var form = this.up('form').getForm();
                                
                                if (form.isValid()) {
                                    form.submit({
                                        success: function(form, action) {
                                            Ext.Msg.alert('Success', action.result.msg);
                                            //form.reset();
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result.msg);
                                        }
                                    });
                                }
                            }
                        }/*,{
                            text: 'Cancel'
                        }*/]
                    });
                        
                    viewer.add(createWebReport);
                    viewer.add(ColumnDefPanel);
                    //viewer.add(this.getAdminFormView());
                }
            }
        });
        
        this.getColumnDefinitionStore().on('beforeload', function() {
            Ext.ComponentQuery.query('adminviewer')[0].setLoading('loading data');
        });     

        this.getColumnDefinitionStore().on('load', function() {
            Ext.ComponentQuery.query('adminviewer')[0].setLoading(false);
        });

        this.getColumnDefinitionStore().on({
            load: this.createColumnSets,
            scope: this
        });
    },
    
    createColumnSets: function() {
        var viewPanel = Ext.ComponentQuery.query('adminviewer')[0],
            colStore = this.getColumnDefinitionStore(),
            colForm = Ext.getCmp('formcolumnsdefs'); 
            
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
        /// start of Formatting combo box

        //colForm.removeAll();

        viewPanel.setLoading('loading column configuration panel');
        
        colStore.data.each( function (item, index, length) {
            if (index > 0) return;

            //console.log(item.raw);
            for (x in item.raw) {
                //console.log(x);
                //console.log(item.raw[x]);
                colForm.add(Ext.create('Ext.form.FieldSet', {
                    title: x,
                    collapsible: false,
                    layout: 'column',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'side',
                        msgTarget: 'side',
                        labelWidth: 150
                    },
                    
                    items: [{
                        xtype: 'checkbox', // checkbox to select the field
                        metaname: 'fieldenabled',
                        fieldLabel: '&nbsp;&nbsp;Enable Field',
                        checked: true
                    }, {
                        fieldLabel: '&nbsp;&nbsp;Custom Column Name', // textfield to name the field
                        metaname: 'header',
                        value: x
                    }, {
                        //xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                        readOnly: true,
                        fieldLabel: '&nbsp;&nbsp;DataType',
                        metaname: 'datatype',
                        value: item.raw[x]
                    }, {
                        xtype: 'combo',    // dropdown to specify formatting
                        fieldLabel: '&nbsp;&nbsp;Formatting',
                        queryMode: 'local',
                        store: formattingStore,
                        displayField: 'name',
                        valueField: 'value',
                        metaname: 'renderer'
                    }]
                    
                }));
            }
        })
        
        viewPanel.setLoading(false);
        
    }
    
    ///setStoreParms: function() {
    ///    var colStore, itsProxy, sParms,
    ///        Procedure, 
    ///        sDate, 
    ///        eDate, 
    ///        org, 
    ///        company, 
    ///        market, 
    ///        dm, 
    ///        storenum; 
    ///    
    ///    colStore = this.getColumnDefinitionStore();
    ///    
    ///    Procedure = Ext.getCmp('Procedure').getValue();
    ///    sDate = Ext.getCmp('sDate').getValue();
    ///    eDate = Ext.getCmp('eDate').getValue();
    ///    org = Ext.getCmp('org').getValue();
    ///    company = Ext.getCmp('company').getValue();
    ///    market = Ext.getCmp('market').getValue();
    ///    dm = Ext.getCmp('dm').getValue();
    ///    storenum = Ext.getCmp('storenum').getValue();
    ///    
    ///    sParms = { sp: data.get('Procedure'), uid: data.get('UserId'), sDate: startDate, eDate: endDate, org: data.get('Organization'), company: data.get('Company'), market: data.get('Market'), dm: data.get('DM'), storenum: data.get('Store') };
    ///    itsProxy = colStore.getProxy();
    ///    
    ///    itsProxy.extraParms = sParms;
    ///    theStore.setProxy(itsProxy);
    ///    
    ///    return true;
    ///}

});
