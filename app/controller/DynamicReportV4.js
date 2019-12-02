/// <reference path="../../Scripts/jquery-1.7.2-vsdoc.js" />
/// <reference path="../../Scripts/jquery-1.7.2.js" />
/// <reference path="file://C:/Apps/extjs/ext-all-debug-w-comments.js" />

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
    }, {
        ref: 'startDate',
        selector: 'kpitoolbar [name="startDate"]'
    }, {
        ref: 'endDate',
        selector: 'kpitoolbar [name="endDate"]'
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
            //console.log(item);
            var reportName = item.data.ReportName;
            
            newButton = splitbutton.menu.add({
                text: reportName, 
                id: 'webreportid-' + item.data.WebReportId
            });
            
            newButton.addListener('click', function(menu) {
                var ignoreIf = item.data.WebReportId;
                if ( ignoreIf == 1 || ignoreIf == 2 || ignoreIf == 3 ) return;
                
                var sDatePicker, eDatePicker, startDate, endDate;
                
                sDatePicker = this.getStartDate();
                eDatePicker = this.getEndDate();
                
                if (Ext.util.Cookies.get(reportName + 'SDate') == null) {
                    var d = new Date(item.data.FromDate);
                                
                    startDate = Ext.Date.format(d, 'Y,m,d');
                    sDatePicker.setValue(d);
                } else {
                    startDate = Ext.util.Cookies.get(reportName + 'SDate');
                    sDatePicker.setValue(new Date(startDate.replace(/,/g,'/')));
                }
                
                if (Ext.util.Cookies.get(reportName + 'EDate') == null) {
                    var ed = new Date(item.data.ToDate);
                    
                    endDate = Ext.Date.format(ed, 'Y,m,d');
                    eDatePicker.setValue(ed);
                } else {
                    endDate = Ext.util.Cookies.get(reportName + 'EDate');
                    eDatePicker.setValue(new Date(endDate.replace(/,/g,'/')));
                }

                //alert(item.data.ReportName + " button was clicked")
                //var params = {'sp': 'terKPIConceptV2','sDate': '01/01/2012', 'eDate': '01/14/2012', 'uid': '540', 'org': 'tjcorp','company': '', 'market': '', 'dm': '', 'storenum': '' };
                var params = {   
                    'sp':       item.data.Procedure,
                    'sDate':    startDate,
                    'eDate':    endDate,
                    'uid':      item.data.UserId.toString(),
                    'org':      item.data.Organization,
                    'company':  item.data.Company,
                    'dm':       item.data.DM,
                    'storenum': item.data.Store
                }
                
                menu.disable();
                
                this.createGridReport(item.data.ReportName, 1, item.data.ColumnDefinition, params, menu); 
            }, this);
                        
        }, this);
    },
        
    dataTypeLookup: {
        'int':           'int',
        'tinyint':       'int',
        'smallint':      'int',
        'numeric':       'int',
        'varchar':       'string',
        'char':          'string',
        'nvarchar':      'string',
        'decimal':       'float',
        'float':         'float',
        'money':         'float',
        'smallmoney':    'float',
        'smalldatetime': 'date',
        'datetime':      'date',
        'date':          'date'
    },
    
    // TODO: Place unction in GridFactory.js
    saveGrid: function (grid) {
        /// save all the meta properties
        /// save all the widths
        /// save sort by properties in the columns object
        /// save the render and summaryRenderer
        /// see Admin.js as an example.
        console.log(grid.columns);
    },
    
    // TODO: centralize functionality to QS.common.GridFactory in /app/common/GridFactory.js
    createGridReport: function (name, rType, columnInfo, params, menu) {
        
        ///create a model
        // - predefine fields based on the JSON
        // - iterate through coldef collection find names and data types 
        // - decode the json and add formatting functions
        var columns = Ext.JSON.decode(columnInfo),
            dynFields = [],
            helperMethods = new QS.common.HelperMethods(),
            dynFilters = [],
            groupField = '';
            sortCfg = null;

        var i = 0,
            c = columns.length,
            $type = '',
            $index = '';
        for (;i < c; i++) {
            $type = this.dataTypeLookup[columns[i].datatype];
            $index = columns[i].dataIndex;
            
            dynFields.push({'name': $index, 
                            'type': $type, 
                            'flex': 1 });
            
            
            if ($type == 'date') {
                dynFields[i].convert = helperMethods.convertJsonDate;
                dynFilters.push({'type': 'date', 'dataIndex': $index, 'dateFormat': 'm/d/Y'});
            } else {
                //dynFilters.push({'dateFormat': 'm/d/Y', 'type': 'date', 'dataIndex': columns[i].dataIndex});
                dynFilters.push({'type': $type, 'dataIndex': $index});
            }
            
            if (typeof columns[i].grouperField != 'undefined') groupField = columns[i].grouperField;
            
            if (columns[i].sortState != null) {
                sortCfg = {
                    name: $index,
                    direction: columns[i].sortState
                };
            } 

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
            
            //// related to buffering
            //pageSize: 5000,
            //// allow the grid to interact with the paging scroller by buffering
            //buffered: true,     //in extjs 4.1 this and autoLoad: true is all you need
            //// never purge any data, we prefetch all up front
            //purgePageCount: 0,
            //// related to buffering
            
            model: 'dynModel',
            //autoLoad: false,
            autoLoad: true, // in extjs 4.1 this and buffered: true is all you need
            //stateful: true,
            //autoDestroy: true, ///??? true is default
            
            groupField: groupField,
            
            //sortInfo: sortCfg,
            
            listeners: {
                beforeload: function() {
                    Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                },
                load: function(store) {
                    Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                    
                    if (sortCfg != null) {
                        store.sort(sortCfg.name, sortCfg.direction)
                    }
                },
                beforeprefetch: function () {
                    Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                },
                prefetch: function (options) {
                    Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                    
                    if (sortCfg != null) {
                        store.sort(sortCfg.name, sortCfg.direction)
                    }
                }
            }
        });
        
        c = columns.length;
        i = 0;
        for (; i < c; i++) {
            var sRenderer = false;
            //var theDataIndex = columns[i].dataIndex;
            
            sRenderer = helperMethods[columns[i].renderer];
            
            //if (columns[i].renderer == 'filterRepeat') {
            //    helperMethods.temp[theDataIndex] = null;
            //    
            //    sRenderer = function (value, metaData, record, rowIndex) {
            //        
            //        return helperMethods.filterRepeat(value, rowIndex, theDataIndex);
            //    };
            //} else {
            //    sRenderer = helperMethods[columns[i].renderer];
            //}
            
            // Use to be just these three lines of code in for block
            //var sRenderer = helperMethods[columns[i].renderer];
            columns[i].renderer = sRenderer;
            columns[i].summaryRenderer = sRenderer;
        }
        
        var groupingFeature = Ext.create(Ext.grid.feature.GroupingSummary, {
            hideGroupHeader: false,
            enableGroupingMenu: true,
            groupHeaderTpl: '{name}',
            extras: new QS.common.HelperMethods()
        });
        
        var filterFeature = Ext.create(Ext.ux.grid.FiltersFeature, {
            encode: true,
            local: true,       // can't filter locally on buffered grid
            filters: dynFilters
        });
        
        //create a grid
        var dynGrid = Ext.create('Ext.grid.Panel', {
            
            //////Not needed according to sencha 4.1 release migration guide ??
            // related to buffering
            //verticalScroller: {
            //    xtype: 'paginggridscroller',
            //    activePrefetch: false
            //},
            //loadMask: false,
            //disableSelection: true,
            //invalidateScrollerOnRefresh: false,
            //viewConfig: {
            //    trackOver: false,
            //},
            // related to buffering
            
            //alias: 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results',
            alias: name.replace(/\s/g, '').toLowerCase() + 'results',
            id: name.replace(/\s/g, '').toLowerCase() + 'results',
            features: [groupingFeature, filterFeature],
            
            tbar: [{
                text: 'Save As',
                //icon: icon: '/resources/images/control_rewind.png',
                handler: function() {
                    var thisGrid = Ext.getCmp(name.replace(/\s/g, '').toLowerCase() + 'results');
                    /// save all the meta properties
                    /// save all the widths
                    /// save sort by properties in the columns object
                    /// save the render and summaryRenderer
                    /// see Admin.js as an example.
                    //this.saveGrid(thisGrid);
                    var c = thisGrid.columns.length,
                        i = 0;
                    for (; i < c; i++) {
                        console.log(thisGrid.columns[i].dataIndex);
                        console.log(thisGrid.columns[i].datatype);
                        console.log(thisGrid.columns[i].width);
                        console.log(thisGrid.columns[i].hidden);
                        console.log(thisGrid.columns[i].header);
                        console.log(thisGrid.columns[i].metadatatype);
                        if (typeof thisGrid.columns[i].renderer != 'undefined') {
                            console.log('Renderer function: ' + thisGrid.columns[i].renderer.$name);
                        }
                        console.log(thisGrid.columns[i].metarenderer);
                        console.log(thisGrid.columns[i].metasummaryrenderer);
                        console.log(thisGrid.columns[i].sortState);
                    }
                }
            }, '-', {
                text: 'Clear Filter Data',
                handler: function () {
                    var thisGrid = Ext.getCmp(name.replace(/\s/g, '').toLowerCase() + 'results');
                    thisGrid.filters.clearFilters();
                }
            }, {
                text: 'Clear Grouping',
                icon: '/resources/images/control_rewind.png',
                handler: function() {
                    var thisGrid = Ext.getCmp(name.replace(/\s/g, '').toLowerCase() + 'results');
                    thisGrid.features[0].disable();
                }
            }],

            title: name,
            store: dynStore,
            closable: true,
            columns: columns,
            
            listeners: {
                close: function (grid) {
                    Ext.util.Cookies.clear(grid.title + 'SDate');
                    Ext.util.Cookies.clear(grid.title + 'EDate');
                    menu.enable();
                }
            }
        });
        
        // to buffer use guaranteeRange - triggers the store load
        // autoload is set to true...don't load the store
        //dynStore.guaranteeRange(0, 199);
        //dynStore.load();
        
        var tabView = this.getTabViewer();
        
        tabView.addReport(dynGrid);
                        
    }
});
