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
        
        this.control({
            'adminviewer': {
                beforerender: function (viewer) {
                    /*var spStore = this.getStoredProcListStore();
                    spStore.load();*/
                },
                
                afterrender: function(viewer) {
                    
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
                    
                    /*var formattingCombo = Ext.create('Ext.form.field.ComboBox', {
                        fieldLabel: 'Formatting',
                        displayField: 'name',
                        valueField: 'value',
                        store: statusStore,
                        queryMode: 'local',
                        name: 'FormattingOptions',
                        //width: 40
                    });*/
                    /// end of Status Combo configuration
                    
                    var ColumnDefPanel = Ext.create('Ext.form.Panel', {
                        region: 'east',
                        alias: 'columndefs',
                        id: 'columndefs',
                        items: [{
                            xtype: 'form',
                            id: 'formcolumnsdefs',
                            name: 'formcolumnsdefs',
                            frame: false,
                            title: 'Column Definition',
                            bodyStyle: 'padding: 5px 5px 0',
                            //width: 800,
                            anchor: '100%',
                            
                            items: [{// column definition example 1 fieldset
                                xtype: 'fieldset',
                                title: 'val',
                                layout: 'column', //'anchor',
                                defaultType: 'textfield',
                                fieldDefaults: {
                                    labelAlign: 'top',
                                    msgTarget: 'side',
                                    labelWidth: 150
                                },
                                
                                //items: [{// column definition example 1
                                //    xtype: 'container',
                                //    anchor: '100%',
                                //    layout: 'column',
                                //    defaultType: 'textfield',
                                    items: [{
                                        xtype: 'checkbox', // checkbox to select the field
                                        metaname: 'fieldenabled',
                                        fieldLabel: 'Enable Field',
                                        checked: true
                                    }, {
                                        fieldLabel: 'Custom Column Name', // textfield to name the field
                                        metaname: 'customcolumnname'
                                    }, {
                                        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                                        metaname: 'datatype'
                                    }, {
                                        xtype: 'combo',    // dropdown to specify formatting
                                        fieldLabel: 'Formatting',
                                        queryMode: 'local',
                                        store: formattingStore,
                                        displayField: 'name',
                                        valueField: 'value',
                                        metaname: 'formatting'
                                    }]
                                //}]
                            }, {// column definition example 2 fieldset
                                xtype: 'fieldset',
                                title: 'name', // name of the column as it is in the stored procedure
                                layout: 'column', //'anchor',
                                defaultType: 'textfield',
                                /*defaults: {
                                    anchor: '100%'
                                },*/
                                fieldDefaults: {
                                    labelAlign: 'top',
                                    msgTarget: 'side',
                                    labelWidth: 150
                                },
                                //items: [{ // column definition example 2
                                //    xtype: 'container',
                                //    anchor: '100%',
                                //    layout: 'column',
                                //    defaultType: 'textfield',
                                    items: [{
                                        xtype: 'checkbox', // checkbox to select the field
                                        metaname: 'fieldenabled',
                                        fieldLabel: 'Enable Field',
                                        checked: true
                                    }, {
                                        fieldLabel: 'Custom Column Name', // textfield to name the field
                                        metaname: 'customcolumnname'
                                    }, {
                                        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                                        metaname: 'datatype'
                                    }, {
                                        xtype: 'combo',    // dropdown to specify formatting
                                        fieldLabel: 'Formatting',
                                        queryMode: 'local',
                                        store: formattingStore,
                                        displayField: 'name',
                                        valueField: 'value',
                                        metaname: 'formatting'
                                    }]
                                //}]
                            }]
                        }]
                    });

                    var createWebReport = Ext.create('Ext.form.Panel', {
                        url:/\/$/g.test(location.href.split('?')[0]) ? "webreportsadmin.aspx/Create" : "/webreportsadmin.aspx/Create",
                        frame: true,
                        alias: 'createwebreports',
                        id: 'createwebreports',
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
                            items: [storedProcCombo, {
                                fieldLabel: 'Column Definition',
                                name: 'ColumnDefinition',
                                id: 'columndefFormField'
                            }]
                        }/*, {
                            xtype: 'fieldset',
                            title: 'Column Data Configuration',
                            layout: 'anchor',
                            defaultType: 'textfield',
                            defaults: {
                                anchor: '100%'
                            },
                                /// [
                                /// {header: "Value", dataIndex: "val", renderer: "formatPercent"}, 
                                /// {header: "Name", dataIndex: "name"}
                                /// ]
                                /// label associated with the column name in the database
                                /// check box to choose field
                                /// text field to name the field
                                /// hidden field to keep the data type information
                                /// dropdown to specify formatting
                            items: [{ // beginning of one column set
                                xtype: 'fieldset',
                                alias: 'columndeflist',
                                id: 'columndeflist',
                                title: 'val', // name of the column as it is in the stored procedure
                                layout: 'anchor',
                                defaultType: 'textfield',
                                ///defaults: {
                                ///    anchor: '100%'
                                ///},
                                fieldDefaults: {
                                    labelAlign: 'top',
                                    msgTarget: 'side'
                                },
                                items: [{
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        xtype: 'checkbox', // checkbox to select the field
                                        name: 'FieldEnabled',
                                        fieldLabel: 'Enable Field'
                                    }, {
                                        fieldLabel: 'Custom Column Name', // textfield to name the field
                                        name: 'CustomColumnName'
                                    }, {
                                        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                                        name: 'DataType'
                                    }, {
                                        xtype: 'combo',    // dropdown to specify formatting
                                        fieldLabel: 'Formatting',
                                        queryMode: 'local',
                                        store: formattingStore,
                                        displayField: 'name',
                                        valueField: 'value'
                                    }]
                                }]
                            }, {
                                xtype: 'fieldset',
                                title: 'name', // name of the column as it is in the stored procedure
                                layout: 'anchor',
                                defaultType: 'textfield',
                                ///defaults: {
                                ///    anchor: '100%'
                                ///},
                                fieldDefaults: {
                                    labelAlign: 'top',
                                    msgTarget: 'side'
                                },
                                items: [{
                                    xtype: 'container',
                                    anchor: '100%',
                                    layout: 'column',
                                    defaultType: 'textfield',
                                    items: [{
                                        xtype: 'checkbox', // checkbox to select the field
                                        name: 'FieldEnabled',
                                        fieldLabel: 'Enable Field'
                                    }, {
                                        fieldLabel: 'Custom Column Name', // textfield to name the field
                                        name: 'CustomColumnName'
                                    }, {
                                        xtype: 'hidden', // hidden field to keep the data type information - might become column metadata
                                        name: 'DataType'
                                    }, {
                                        xtype: 'combo',    // dropdown to specify formatting
                                        fieldLabel: 'Formatting',
                                        queryMode: 'local',
                                        store: formattingStore,
                                        displayField: 'name',
                                        valueField: 'value'
                                    }]
                                }]
                            }]
                        }*/],
                
                        buttons: [{
                            text: 'Create',
                            formBind: true,
                            handler: function() {
                                var columndata = Ext.getCmp('formcolumnsdefs'),
                                    colinfo = [];
                                    
                                columndata.items.each(function (coldef, index, length) {
                                    console.log("This is " + coldef.title);
                                    
                                    var headername = coldef.title,
                                        colObj = {};
                                        
                                    coldef.items.each(function (colmeta, index, length) {
                                        colobj = { "header": headername, "dataIndex": colmeta.value };
                                        console.log(colmeta);
                                    }, this);
                                    
                                    colinfo.push(colobj);
                                    
                                }, this);
                                
                                console.log(colinfo);
                                console.log(Ext.JSON.encode(colinfo));
                                
                                var coldefFrmField = Ext.getCmp('columndefFormField'),
                                    coldefString = Ext.JSON.encode(colinfo);
                                    
                                coldefFrmField.setValue(coldefString);
                                                                    
                                var form = this.up('form').getForm();
                                
                                console.log(form);
                                
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
                        }*/]
                    });
                        
                    viewer.add(createWebReport);
                    viewer.add(ColumnDefPanel);
                    //viewer.add(this.getAdminFormView());
                }
            }
        });
    }
});
