/// <reference path="../../Scripts/jquery-1.7.2-vsdoc.js" />
/// <reference path="../../Scripts/jquery-1.7.2.js" />
/// <reference path="file://C:/Apps/extjs/ext-all-debug-w-comments.js" />


/// get column definition from the database in raw json format
/// use a generic template for a grid
/// apply the grid column definition to the grid template
/// apply the name from the menu to the name of the grid
/// create a new model with a store and apply it to the grid
///   All the models will call the same back end controller
///   The extra parameters will be filled in with the default date from the
///   preference store as well as the stored procedure to call
/// Will also need a toolbar template to be inserted on to each grid panel
///   will have startDate and endDate and be stateful
///   will also have a refresh button to reload the store with chosen
///   dates
///   
/// 

Ext.define('QS.controller.DynamicReport', {
    extend: 'Ext.app.Controller',
    stores: [
        'UserParms',
        'KpiConcepts'
    ],
    views: [
        'kpiconcept.List',
        'Toolbar',
        'Viewer',
        'GenGrid'
    ],
    
    refs: [{
        ref: 'splitbutton',
        selector: 'kpitoolbar > splitbutton'
    }, {
        ref: 'tabViewer',
        selector: 'reportviewer'
    }],

    init: function () {

        var isMenuBuilt = false;
        
        this.control({
            'kpitoolbar > splitbutton': {
                menushow: function (splitbutton) {
                    //console.log(isMenuBuilt);
                    if (!isMenuBuilt) {
                        this.buildMenu(splitbutton);
                        isMenuBuilt = true;
                    }
                }
            }
        });
    },
    
    buildMenu: function(splitbutton) {

        var userparms, newButton;
        
        userparms = this.getUserParmsStore();
        
        splitbutton.menu.removeAll();

        userparms.data.each(function (item, index, length) {
            // for each record set up user a menu and event to fire the actual report
            console.log(item);
            newButton = splitbutton.menu.add({text: item.data.ReportName});
            
            newButton.addListener('click', function(menu) { 
                //alert(item.data.ReportName + " button was clicked")
                var params = {'sDate': '12/01/2012', 'eDate': '12/01/2012', 'uid': '540', 'org': 'tjcorp','company': '', 'market': '', 'dm': '', 'storenum': '' };
                
                this.createGridReport(item.data.ReportName, 1, item.data.ColumnDefinition, params); 
            }, this);
                        
        }, this);
    },
    
    getDataType: function(val) {
        switch(val) {
            case 'money':
                return 'float';
                break;
            case 'varchar':
                return 'string';
                break;
            case 'decimal':
                return 'float';
                break;
            default:
                return 'string';
        }
    },
    
    createGridReport: function (name, rType, columnInfo, params) {
        
        ///create a model
        // - predefine fields based on the JSON
        // - iterate through coldef collection find names and data types 
        // - decode the json and add formatting functions
        var columns = Ext.JSON.decode(columnInfo),
            dynFields = [],
            helperMethods = new QS.extra.HelperMethods();

        var i = 0;
        var c = columns.length;
        for (;i < c; i++) {
            dynFields.push({"name": columns[i].dataIndex, "type": this.getDataType(columns[i].datatype)});
        }
        
        // - assign the feilds to the model
        Ext.define('dynModel', {
            extend: 'Ext.data.Model',
            fields: dynFields,
            proxy: {
                type: 'ajax',
                url: /\/$/g.test(location.href.split('?')[0]) ? "reportproc.aspx" : "/reportproc.aspx",
                reader: {
                    type: 'json',
                    root: 'root',
                    successProperty: 'success'
                },
                extraParams: params,
                actionMethods: {
                    read: 'POST'
                }, 
                timeout: 240000
            }
        });
        
        ///create a store
        
        var dynStore = Ext.create('Ext.data.Store', {
            model: 'dynModel',
            autoLoad: false,
            stateful: true,
            autoDestroy: true ///???
        });
        
        //create a grid
        var dynGrid = Ext.create('Ext.grid.Panel', {
            alias: 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results',
            title: name,
            store: dynStore,
            closable: true,
            columns: columns
        });
        
        dynStore.load();
        
        var tabView = this.getTabViewer();
        
        tabView.addReport(dynGrid);
        
        ////
        //// OLD - REPLACE THIS
        ////
        
        // store needs a model
        Ext.define('GridDefinition', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'columns', type: 'string' },
                { name: 'grid', type: 'string' }
            ]
            
        });
        
        //Ext.define
                
        /// need the store to provide column and features definition via JSON eval
        var GridDefinitions = Ext.create('Ext.data.Store', {
            storeId: 'griddefinitions',
            model: 'GridDefinition',
            autoLoad: true,
            stateful: true,
            /*sorters: [],
            groupField: '',*/
            proxy: {
                type: 'ajax',
                api: {
                    read: 'data/dyngrid.json'
                },
                
                reader: {
                    type: 'json',
                    root:'qs',
                    successProperty: 'success'
                }
            },
            
            loadMask: 'Quick Serve ' + 'is loading',
            
            setLoadMask: function(msg) {
                this.storeMessage = msg;
            }
        });
        
        Ext.define('Example', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'name', type: 'string'},
                { name: 'val', type: 'float' }
            ]
        });
        
        var Examples = Ext.create('Ext.data.Store', {
            storeId: 'Examples',
            model: 'Example',
            data: [{
                name: 'Val1',
                val: 1,
            }, {
                name: 'Val2',
                val: 4.5
            }]
        });
        
//        var columns = eval('(' + "[{header: 'Name', dataIndex: 'name'}, {header: 'Value', dataIndex: 'val', renderer: 'formatPercent'}]" + ')');
        var columns = Ext.JSON.decode("[{header: 'Name', dataIndex: 'name'}, {header: 'Value', dataIndex: 'val', renderer: 'formatPercent'}]");
        
        var x = columns.length;
        var i = 0;
        for (; i < x; i++) {
            if (columns[i].renderer !== undefined && typeof columns[i].renderer === "string") {
                switch (columns[i].renderer) {
                    case 'formatPercent': 
                        columns[i].renderer = function (value) {
                            return '<span style="font-weight: bold;">Max Rank: </span>' + '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
                        }
                        break;
                    case 'formatFloat':
                        columns[i].renderer = function (value) {
                            return '<span style="font-weight: italic;">Studio: </span>' + '<span style="font-weight: bold;">&amp;' + value + '</span>';
                        }
                        break;
                    default:
                        columns[i].renderer = null;
                }
            }
        }
                
        // Create a grid report based on store information
        var theReport = Ext.create('Ext.grid.Panel', {
            alias: 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results',
            title: name,
            tbar: [{xtype: 'tbtext', text: 'Sort Order', reorderable: false}],
            store: Examples,
            closable: true,
            extras: new QS.extra.HelperMethods(),
            columns: columns
            // *good* columns: eval('(' + "[{header: 'Value', dataIndex: 'val', renderer: function(value) {var adjVal; adjVal = parseFloat(value).toFixed(2); return this.extras.formatPercent(adjVal);}}, {header: 'Name', dataIndex: 'name'}]" + ')')
            // *decent* columns: eval('(' + "[{header: 'Value', dataIndex: 'val', renderer: function(value) {return '<span style=\"font-weight: bold;\">Max Rank: </span>' + '<span style=\"font-weight: bold;\">' + this.extras.formatNumber(value) + '</span>';}}, {header: 'Name', dataIndex: 'name'}]" + ')')
        });
        
        //var theReport = new QS.view.GenGrid();
        //theReport.title = name;
        //theReport.alias = 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results';
        //theReport.store = Examples;
        //theReport.columns = eval('(' + "[{header: 'Value', dataIndex: 'val', renderer: function(value) {var adjVal; adjVal = parseFloat(value).toFixed(2); return this.extras.formatPercent(adjVal);}}, {header: 'Name', dataIndex: 'name'}]" + ')');
        
        var tabView = this.getTabViewer();
        
        tabView.addReport(theReport)
                        
    }
});
