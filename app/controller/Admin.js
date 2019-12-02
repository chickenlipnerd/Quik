/// <reference path="../../Scripts/jquery-1.7.2-vsdoc.js" />
/// <reference path="../../Scripts/jquery-1.7.2.js" />
/// <reference path="file://C:/Apps/extjs/ext-all-debug-w-comments.js" />

/// Admin controller to manage adding new reports to the system

Ext.define('QS.controller.Admin', {
    extend: 'Ext.app.Controller',
    stores: [
        'StoredProcList',
        'ColumnDefinition'
    ],
    views: [
        'AdminViewer'
        /*,
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
            reDigit = /\d+/,        //regular expression defining digits only.
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
        
        var summaryTypeLookup = {
            'formatMoney': 'sum',
            'formatPercent': 'average',
            'formatNumber': 'sum'
        };
                
        this.control({
            'adminviewer': {
                beforerender: function (viewer) {
                    spStore = this.getStoredProcListStore();
                    spStore.load();
                    
                    spColStore = this.getColumnDefinitionStore();
                    //spColStore.load();
                },
                
                afterrender: function(viewer) {
                    
                    Ext.QuickTips.init();
                    
                    var htmlPart = Ext.create('Ext.Panel', {
                        region: 'south',
                        html: '<a href="/Admn.aspx/Create">Create New Web Report</a>',
                        width: '100%',
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
                        allowBlank: false,
                        listeners: {
                            select: function(combo, records, eOpts ) {
                                 
                                var pg = Ext.getCmp('gridpreview'),
                                    cg = Ext.getCmp('gridColDefs');
                                
                                if (typeof pg != 'undefined') {
                                    pg.close();
                                }
                                
                                if (typeof cg != 'undefined') {
                                    cg.store.removeAll();
                                }
                                
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
                                sSDate = Ext.getCmp('sDateParam').getValue();
                                sEDate = Ext.getCmp('eDateParam').getValue();
                                sOrg = Ext.getCmp('orgParam').getValue();
                                sCompany = Ext.getCmp('companyParam').getValue();
                                market = Ext.getCmp('marketParam').getValue();
                                sDm = Ext.getCmp('dmParam').getValue();
                                sStorenum = Ext.getCmp('storenumParam').getValue();
                                
                                sParms = { sp: sProcedure, /*uid: '540', */sDate: sSDate, eDate: sEDate, org: sOrg, company: sCompany, market: sMarket, dm: sDm, storenum: sStorenum };
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
                        allowBlank: false,
                        editable: false
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
                        allowBlank: false,
                        editable: false,
                        //width: 40
                        listeners: {
                            select: function (combo, records, eOpts) {
                                var sdf = Ext.getCmp('seedDateField'), 
                                    sif = Ext.getCmp('seedIncrementField')
                                    cb = Ext.getCmp('btnCreate'),
                                    pb = Ext.getCmp('btnPreview'),
                                    form = this.up('form').getForm();
                                
                                if (combo.value == 2 || combo.value == 4) {
                                    sdf.disable();
                                    sif.disable();
                                    sdf.reset();
                                    sif.reset();
                                } else {
                                    sdf.enable();
                                    sif.enable();
                                    sdf.reset();
                                    sif.reset();
                                }
                                
                                if (form.isValid()) {
                                    pb.enable();
                                    cb.enable();
                                } else {
                                    pb.disable();
                                    cb.disable();
                                }
                            }
                        }
                    });
                    /// end of DateRangeType Combo configuration
                    
                    /// start of Formatting combo box - Not being used at the moment
                    Ext.define('FormattingCboModel', {
                        extend: 'Ext.data.Model',
                        fields: [
                            {type: 'string', name: 'value'},
                            {type: 'string', name: 'name'}
                        ]
                    });
                    
                    var formattingList = [
                        {"value": 'formatMoney',        "name": "Currency"},
                        {"value": 'formatPercent',      "name": "Percent"},
                        {"value": 'formatNumber',       "name": "Number"},
                        {"value": 'formatDate',         "name": "Date"}
                    ];
                    
                    var formattingStore = Ext.create('Ext.data.Store', {
                        model: 'FormattingCboModel',
                        data: formattingList
                    });
                    /// end of Formatting combo box

                    // sample static data for the store
                    var myData = [
                        //[true, 'stuff', 'stuff', 'stuff'],
                        //[true, 'stuff1', 'stuff1', 'stuff1'],
                        //[true, 'stuff2', 'stuff2', 'stuff2'],
                        //[true, 'stuff3', 'stuff3', 'stuff3']
                    ];
                    
                    var ds = Ext.create('Ext.data.ArrayStore', {
                        fields: [
                            //{ name: 'enableField', type: 'bool' },
                            { name: 'dataIndex', type: 'string'},
                            { name: 'customName', type: 'string' },
                            { name: 'dataType', type: 'string' },
                            //{ name: 'hideRepeats', type: 'bool'},
                            { name: 'formatting', type: 'string' }
                        ],
                        data: myData
                    });
                    
                    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    });
                
                    var sm = Ext.create('Ext.selection.CheckboxModel', {
                        mode: 'SIMPLE',
                        checkOnly: true
                    });
                    
                    /*
                     * Here is where we create the Form
                     */
                    
                    var formPanel = Ext.create('Ext.panel.Panel', {
                        frame: true,
                        alias: 'formPanel',
                        id: 'formPanel',
                        title: 'Web Admin Console',
                        bodyPadding: 5,
                        //height: '100%',
                        height: 590,    // height to accomodate preview
                        minHeight: 590,
                        width: '100%',
                        layout: 'column',
                        
                        items: [{
                            xtype: 'form',
                            url:/\/$/g.test(location.href.split('?')[0]) ? "webreportsadmin.aspx/Create" : "/webreportsadmin.aspx/Create",
                            frame: true,
                            alias: 'createwebreports',
                            id: 'createwebreports',
                            title: 'Create a new web report',
                            bodyStyle:'padding:5px 5px 0',
                            columnWidth: 0.30,
                            height: 540,
                            //maxWidth: 500,
                            //minWidth: 540,
                            //maxWidth: 400,
                            fieldDefaults: {
                                msgTarget: 'side',
                                labelWidth: 150
                            },
                            defaults: {
                                anchor: '100%'
                            },
                    
                            items: [{
                                xtype: 'fieldset',
                                title: 'Stored Procedure Parameters',
                                collapsible: false,//true,
                                collapsed: false,
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
                                    name: 'sDateParam',
                                    id: 'sDateParam',
                                    allowBlank: false
                                }, {
                                    xtype: 'datefield',
                                    fieldLabel: 'End Date',
                                    name: 'eDateParam',
                                    id: 'eDateParam',
                                    allowBlank: false
                                }, {
                                    fieldLabel: 'Organization',
                                    name: 'orgParam',
                                    id: 'orgParam',
                                    allowBlank: false
                                }, {
                                    fieldLabel: 'Company',
                                    name: 'companyParam',
                                    id: 'companyParam'
                                }, {
                                    fieldLabel: 'Market',
                                    name: 'marketParam',
                                    id: 'marketParam'
                                }, {
                                    fieldLabel: 'DM',
                                    name: 'dmParam',
                                    id: 'dmParam'
                                }, {
                                    fieldLabel: 'Store Number',
                                    name: 'storenumParam',
                                    id: 'storenumParam'
                                }, storedProcCombo]
                                                                
                            }, {
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
                                    id: 'ReportName',
                                    allowBlank: false
                                },  statusCombo, 
                                    dateRangeTypeCombo,
                                {
                                    id: 'seedDateField',
                                    xtype: 'datefield',
                                    fieldLabel: 'Seed Date',
                                    name: 'SeedDate',
                                    allowBlank: false
                                }, {
                                    id: 'seedIncrementField',
                                    fieldLabel: 'Seed Increment',
                                    name: 'SeedIncrement',
                                    allowBlank: false,
                                    vtype: 'numeric'
                                }, {
                                    xtype: 'hidden',
                                    name: 'Type',
                                    value: 1,
                                }, {
                                    xtype: 'hidden',
                                    //fieldLabel: 'Column Definition',
                                    name: 'ColumnDefinition',
                                    id: 'ColumnDefinition',
                                }]
                            }],
                    
                            buttons: [{
                                text: 'Reset',
                                formBind: false,
                                handler: function () {
                                    var form = this.up('form').getForm(),
                                        gc = Ext.getCmp('gridColDefs'),
                                        preview = Ext.getCmp('gridpreview');
                                    
                                    form.reset();
                                    gc.getStore().removeAll();
                                    
                                    //var data = gc.getStore().data;
                                    //data.item.each() {
                                    //    console.log('');
                                    //    
                                    //}
                                    
                                    if (typeof preview != 'undefined') {
                                        preview.close();
                                    }
                                }
                            }, {
                                text: 'Preview',
                                id: 'btnPreview',
                                formBind: true,
                                handler: function () {
                                    //var createPreview = new QS.common.GridFactory();
                                    //createPreview.showMessage();
                                    //viewer.add(htmlPart);
                                    // Call the GridFactory modules createGridReport(name, params, columnInfo)
                                    var colsDefGrid = Ext.getCmp('gridColDefs'),
                                        columndata = colsDefGrid.getStore(),
                                        dynamicGrid = new QS.common.GridFactory(),
                                        //preview = Ext.getCmp('gridpreview'),
                                        columninfo;

                                    var pg = Ext.getCmp('gridpreview');
                                
                                    if (typeof pg != 'undefined') {
                                        pg.close();
                                    }
                                        
                                    columninfo = dynamicGrid.getJsonColConfig(colsDefGrid);
                                    //console.log(columninfo);
    
                                    var report, reportName, sParms,
                                        sProcedure, 
                                        sSDate, 
                                        sEDate, 
                                        sOrg, 
                                        sCompany, 
                                        sMarket, 
                                        sDm, 
                                        sStorenum; 
            
                                    reportName = Ext.getCmp('ReportName').getValue();
                                    sProcedure = Ext.getCmp('Procedure').getValue();
                                    sSDate = Ext.getCmp('sDateParam').getValue();
                                    sEDate = Ext.getCmp('eDateParam').getValue();
                                    sOrg = Ext.getCmp('orgParam').getValue();
                                    sCompany = Ext.getCmp('companyParam').getValue();
                                    market = Ext.getCmp('marketParam').getValue();
                                    sDm = Ext.getCmp('dmParam').getValue();
                                    sStorenum = Ext.getCmp('storenumParam').getValue();
                                    
                                    sParms = { sp: sProcedure, /*uid: '540', */sDate: sSDate, eDate: sEDate, org: sOrg, company: sCompany, market: sMarket, dm: sDm, storenum: sStorenum };
                                    
                                    report = dynamicGrid.createGridReport(true, reportName, sParms, columninfo);
                                    report.region = 'south';
                                    report.height = 540;
                                    
                                    viewer.add(report);
                                    report.store.load();
    
                                }
                            }, {
                                text: 'Create',
                                id: 'btnCreate',
                                formBind: true,
                                handler: function() {
                                    // TODO: put into own module - DynamicGrid.js
                                    var columninfo = [],
                                        previewGrid = Ext.getCmp('gridpreview');
                                        
                                    if (typeof previewGrid == 'object') {
                                        var gf = new QS.common.GridFactory();
                                        
                                        columninfo = gf.getPreviewGridColumns(previewGrid);                                      
                                    } else {
                                        var colsDefGrid = Ext.getCmp('gridColDefs'),
                                            columndata = colsDefGrid.getStore(),
                                            //columninfo = [],
                                            formattingLookup = {
                                                'Currency': 'formatMoney',
                                                'Percent': 'formatPercent',
                                                'Number': 'formatNumber',
                                                'Date': 'formatDate'//,
                                                //'Filter_Repeats': 'filterRepeat'
                                            };
                                            
                                        columndata.data.each( function (item) {
                                            if (item.data.enableField) {
                                                var columnobj = {};
                                                
                                                columnobj.header =          (typeof item.data.customName === 'undefined' || item.data.customName == '') ? item.data.dataIndex : item.data.customName;
                                                columnobj.dataIndex =       item.data.dataIndex;
                                                columnobj.datatype =        item.data.dataType;
                                                columnobj.renderer =        formattingLookup[item.data.formatting];
                                                columnobj.summaryType =     summaryTypeLookup[formattingLookup[item.data.formatting]];
                                                columnobj.summaryRenderer = formattingLookup[item.data.formatting];
                                                                                            
                                                columninfo.push(columnobj);
                                            }
                                            
                                        }, this);
                                        
                                    }
                                    
                                    //console.log(Ext.JSON.encode(columninfo));
                                    var coldefFrmField = Ext.getCmp('ColumnDefinition'),
                                        coldefString = Ext.JSON.encode(columninfo);
                                        
                                    coldefFrmField.setValue(coldefString);
                                    
                                    //columndata.up('form').getForm().reset();
                                                                      
                                    var form = this.up('form').getForm();
                                    
                                    if (form.isValid()) {
                                        form.submit({
                                            success: function(form, action) {
                                                Ext.Msg.alert('Status', action.result.msg);
                                                //form.reset();
                                            },
                                            failure: function(form, action) {
                                                Ext.Msg.alert('Status', action.result.msg);
                                            }
                                        });
                                    }
                                }
                            }]
                            
                        }, {
                            columnWidth: 0.70,
                            xtype: 'gridpanel',
                            id: 'gridColDefs',
                            store: ds,
                            stateful: false,
                            height: 540,
                            minWidth: 540,
                            title: 'Column Definition',
                
                            columns: [/*,*/{
                                id: 'dataIndex',
                                header: 'Proc Column Name',
                                dataIndex: 'dataIndex',
                                flex: 1,
                                sortable: false,
                                hidden: true
                            },{
                                id: 'customName',
                                header: 'Custom Name',
                                dataIndex: 'customName',
                                //width: 125
                                flex: 1, 
                                sortable: false,
                                editor: {
                                    allowBlank: false
                                }
                            }, {
                                id: 'dataTypeInfo',
                                header: 'Data Type',
                                dataIndex: 'dataType',
                                sortable: false,
                                //width: 125
                                flex: 1,
                            },/* {
                                id: 'enableHideRepeats',  
                                header: 'Hide Repeats',
                                xtype: 'checkcolumn',
                                dataIndex: 'hideRepeats',
                                sortable: false,
                                width: 88
                            },*/ {
                                id: 'formatFunction',
                                header: 'Formatting',
                                dataIndex: 'formatting',
                                sortable: false,
                                //width: 145
                                flex: 1,
                                editor: {
                                    xtype: 'combo',
                                    editable: true,
                                    typeAhead: false,
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    store: [
                                        ['Currency',        'Currency'],
                                        ['Percent',         'Percent'],
                                        ['Number',          'Number'],
                                        ['Date',            'Date']//,
                                        //['Filter_Repeats',  'Filter_Repeats']
                                    ],
                                    lazyRender: true,
                                    listClass: 'x-combo-list-small'
                                }
                            }],
                            
                            //selModel: {
                            //    selType: 'cellmodel'
                            //},
                            selModel: sm,
                            
                            plugins: [cellEditing]
                            
                        }]
                        
                    });

                    viewer.add(formPanel);
                    //viewer.add(htmlPart);
                    
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
        
    createColumnSets: function () {
        var viewPanel = Ext.ComponentQuery.query('adminviewer')[0],
            colStore = this.getColumnDefinitionStore();

        var coldefgrid = Ext.getCmp('gridColDefs'), 
            itsStore = coldefgrid.getStore();
        
        itsStore.removeAll(true);
        //itsStore.destroy();
        
        formatDefaults = {              
            'int':          'Number',  
            'tinyint':      'Number',  
            'smallint':     'Number',  
            'numeric':      'Number',  
            'varchar':      '',        
            'char':         '',        
            'nvarchar':     '',        
            'decimal':      'Percent', 
            'float':        'Number',  
            'money':        'Currency',
            'smallmoney':   'Currency',
            'smalldatetime':'Date',
            'datetime':     'Date',    
            'date':         'Date'     
        };
        
        viewPanel.setLoading('loading column configuration panel');
        
        colStore.data.each( function (item, index, length) {
            if (index > 0) return;
            
            var aFields = [];
            
            for (x in item.raw) {                
                // [enableField, dataIndex, customName, dataType, filterRepeats, formatting]
                aFields.push([ /*true, */x, x, item.raw[x], /*false,*/ formatDefaults[item.raw[x]] ]);
            };
            
            itsStore.insert(0, aFields);

            //console.log(item.raw);
            
        });
        
        viewPanel.setLoading(false);
        
        //coldefgrid.getSelectionModel().selectAll();
        
    }

});
