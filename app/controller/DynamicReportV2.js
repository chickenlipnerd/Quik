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
                    sDatePicker.setValue(new Date(startDate));
                }
                
                if (Ext.util.Cookies.get(reportName + 'EDate') == null) {
                    var ed = new Date(item.data.ToDate);
                    
                    endDate = Ext.Date.format(ed, 'Y,m,d');
                    eDatePicker.setValue(ed);
                } else {
                    endDate = Ext.util.Cookies.get(reportName + 'EDate');
                    eDatePicker.setValue(new Date(endDate));
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
    
    saveGrid: function (grid) {
        /// save all the meta properties
        /// save all the widths
        /// save sort by properties in the columns object
        /// save the render and summaryRenderer
        /// see Admin.js as an example.
        console.log(grid.columns);
    },
    
    createGridReport: function (name, rType, columnInfo, params, menu) {
        
        ///create a model
        // - predefine fields based on the JSON
        // - iterate through coldef collection find names and data types 
        // - decode the json and add formatting functions
        var columns = Ext.JSON.decode(columnInfo),
            dynFields = [],
            helperMethods = new QS.common.HelperMethods(),
            dynFilters = [];

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
        
        //// override the store first with a new prefetch method to fix buffering and infinite scrolling
        //Ext.override(Ext.data.Store, {
        //    prefetch: function(options) {
        //        var me = this,
        //            pageSize = me.pageSize,
        //            operation;
        //
        //        if (pageSize) {
        //            if (me.lastPageSize && pageSize != me.lastPageSize) {
        //                Ext.error.raise("pageSize cannot be dynamically altered");
        //            }
        //            if (!me.pageMap.pageSize) {
        //                me.pageMap.pageSize = pageSize;
        //            }
        //        }
        //
        //        else {
        //            me.pageSize = me.pageMap.pageSize = pageSize = options.limit;
        //        }
        //
        //        me.lastPageSize = pageSize;
        //
        //        if (!options.page) {
        //            options.page = me.getPageFromRecordIndex(options.start);
        //            options.start = (options.page - 1) * pageSize;
        //            options.limit = Math.ceil(options.limit / pageSize) * pageSize;
        //        }
        //
        //        if (me.pagesRequested[options.page] == undefined) {
        //            me.pagesRequested[options.page] = true;
        //            
        //            options = Ext.apply({
        //                action : 'read',
        //                filters: me.filters.items,
        //                sorters: me.sorters.items,
        //                groupers: me.groupers.items
        //            }, options);
        //
        //            operation = new Ext.data.Operation(options);
        //
        //            if (me.fireEvent('beforeprefetch', me, operation) !== false) {
        //                me.loading = true;
        //                me.proxy.read(operation, me.onProxyPrefetch, me);
        //            }
        //        }
        //
        //        return me;
        //    }
        //}); // end of overriding Ext.data.Store prefetch function
        
        var dynStore = Ext.create('Ext.data.Store', {
            
            // related to buffering
            pageSize: 500,
            // allow the grid to interact with the paging scroller by buffering
            buffered: true,     //in extjs 4.1 this and autoLoad: true is all you need
            // never purge any data, we prefetch all up front
            purgePageCount: 0,
            // related to buffering
            
            model: 'dynModel',
            //autoLoad: false,
            autoLoad: true, // in extjs 4.1 this and buffered: true is all you need
            //stateful: true,
            //autoDestroy: true, ///??? true is default
            listeners: {
                beforeload: function() {
                    Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                },
                load: function() {
                    Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                },
                beforeprefetch: function () {
                    Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                },
                prefetch: function (options) {
                    Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                }
            }
        });
        
        c = columns.length;
        i = 0;
        for (; i < c; i++) {
            var sRenderer = helperMethods[columns[i].renderer]
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
            local: false,
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
                //icon: icon: './resources/images/control_rewind.png',
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
                icon: './resources/images/control_rewind.png',
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
                close: function () {
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
