Ext.define('QS.controller.Report', {
    extend: 'Ext.app.Controller',
    stores: [
        'KpiConcepts', 
        'KpiTrends', 
        'QsOperations',
        'UserParms',
        'ReportFieldsSetting'
    ],

    views: [
        'kpitrend.List',
        'kpiconcept.List',
        'qsoperations.List',
        'kpitrend.Chart',
        'kpitrend.Chartpct',
        'kpitrend.ChartpctCa',
        'GenPanel',
        'Toolbar', 
        'Viewer'
    ],
    
    refs: [{
        ref: 'tabViewer',
        selector: 'reportviewer'
    }, {
        ref: 'kpiList',
        selector: 'kpiconceptresults'
    },{
        ref: 'qsopList',
        selector: 'kpiconceptresults'
    }, {
        ref: 'kpiTrendChart',
        selector: 'kpitrendchart'
    }, {
        ref: 'kpiConceptMnuBtn',
        selector: 'kpitoolbar > splitbutton > menu [id="webreportid-1"]'
    }, {
        ref: 'kpiConceptMnuBtnD',
        selector: 'kpitoolbar > splitbutton > menu [text="Sales Concept Dyn"]'
    }, {
        ref: 'kpiTrendMnuBtn',
        selector: 'kpitoolbar > splitbutton > menu [id="webreportid-2"]'
    }, {
        ref: 'qsOperationsMnuBtn',
        selector: 'kpitoolbar > splitbutton > menu [id="webreportid-3"]'
    }, {
        ref: 'startDate',
        selector: 'kpitoolbar [name="startDate"]'
    }, {
        ref: 'endDate',
        selector: 'kpitoolbar [name="endDate"]'
    }],

    init: function () {
        
        this.dateOpts = { startDate: "", endDate: "" };

        this.control({
            // Manage the startDate
            'kpitoolbar [name="startDate"]': {
                blur: function (sDate) {
                    // Attempt to remember user selection for Start Date if a report is loaded
                    var startDate, activetab;
            
                    startDate = (sDate.value != null) ? Ext.Date.format(sDate.value, 'Y,m,d') : "";
                    activetab = this.getActiveTab();
                                        
                    if (activetab != null) {
                        parmstore = this.getUserParmsStore();
                        if (parmstore.find("ReportName", activetab.title) >= 0 && startDate !== "") {
                            Ext.util.Cookies.set(activetab.title + 'SDate', startDate);
                        } else {
                            Ext.util.Cookies.clear(activetab.title + 'SDate');
                        }
                    }
                }
            },

            // Manage the endDate
            'kpitoolbar [name="endDate"]': {
                blur: function (eDate) {
                    // Attempt to remember user selection for End Date if a report is loaded
                    var endDate, activetab;
            
                    endDate = (eDate.value != null) ? Ext.Date.format(eDate.value, 'Y,m,d') : "";
                    activetab = this.getActiveTab();
                    
                    if (activetab != null) {
                        parmstore = this.getUserParmsStore();
                        if (parmstore.find("ReportName", activetab.title) >= 0 && endDate !== "") {
                            Ext.util.Cookies.set(activetab.title + 'EDate', endDate);
                        } else {
                            Ext.util.Cookies.clear(activetab.title + 'EDate');
                        }
                    }
                }
            },
            
            // Manage Refresh button
            'kpitoolbar [text="Refresh"]': {
                click: function() {
                    var activetab, store, title;
                    
                    //store = this.getQsOperationsStore();
                    activetab = this.getActiveTab();
                    
                    if (activetab != null) {
                        //if (activetab.title == 'KPI Trend Report') {
                        //    store = this.getKpiTrendsStore();
                        //} else {
                        //    store = activetab.store;
                        //}
                        store = activetab.store;
                        title = activetab.title;                  
                        
                        this.setStoreParms(store, title, true);
                        store.removeAll();
                        store.load();
                    }
                }
            },
            // End manage Refresh button
            
            // Manage the tab viewer
            'reportviewer': {
                beforerender: function(viewer) {
                    
                    this.getUserParmsStore().load();
                },
                
                tabchange: function (viewer, report) {
                    
                    var parmstore, storerec, data, startDate, endDate,
                        sDatePicker, eDatePicker,
                        reportName = report.title;
        
                    parmstore = this.getUserParmsStore();
                    storerec = parmstore.find("ReportName", reportName);
                    data = parmstore.getAt(storerec);
                    
                    sDatePicker = this.getStartDate();
                    eDatePicker = this.getEndDate();
                    
                    if (Ext.util.Cookies.get(reportName + 'SDate') == null) {
                        var d = new Date(data.get('FromDate'));
                                    
                        startDate = Ext.Date.format(d, 'Y,m,d');
                        sDatePicker.setValue(d);
                    } else {
                        startDate = Ext.util.Cookies.get(reportName + 'SDate');
                        sDatePicker.setValue(new Date(startDate.replace(/,/g, '/')));
                    }
                    
                    if (Ext.util.Cookies.get(reportName + 'EDate') == null) {
                        var ed = new Date(data.get('ToDate'));
                        
                        endDate = Ext.Date.format(ed, 'Y,m,d');
                        eDatePicker.setValue(ed);
                    } else {
                        endDate = Ext.util.Cookies.get(reportName + 'EDate');
                        eDatePicker.setValue(new Date(endDate.replace(/,/g, '/')));
                    }

                }
            },

            // Manage the Toolbar menu options display
            'kpitoolbar > splitbutton > menu': {
                beforerender: function(menu) {
                    // load user prefered parameters
                    var userparmData, x;
                    
                    userparmData = this.getUserParmsStore();
                    x = userparmData.getCount();  // find a way to make this a for each
                    
                    if (x>0) {                
                        var i=0;
                        for (;i<x;i++) {

                            menu.add({text: userparmData.data.items[i].data.ReportName});
                        }
                    }
                }
            },

            // Managing the QS Operations (Sales Ledger) report
            'qsoperationsresults': {
                close: function(grid) {
                    // TODO: display a message to allow user to confirm closing a report
                    //alert('You closed the grid! ' + grid.getId());
                    Ext.util.Cookies.clear(grid.title + 'SDate');
                    Ext.util.Cookies.clear(grid.title + 'EDate');
                    this.getQsOperationsMnuBtn().enable();
                },

                added: function(grid) {

                    grid.store.removeAll();
                },

                afterrender: function(grid) {
                    grid.store.load();
                    this.getQsOperationsMnuBtn().disable();
                },

                scrollershow: function(scroller, orientation, eOpts) {
                    if (orientation=='vertical') {
                        scroller.hidden = true;
                        scroller.hideMode = 'display';
                        scroller.width = 0;
                    }
                }
            },

            'qsoperationsresults > toolbar [text="Refresh"]': {
                click: function() {
                    var activetab, store, title;
                    
                    //store = this.getQsOperationsStore();
                    activetab = this.getActiveTab();
                    store = activetab.store; 
                    title = activetab.title;                  
                    
                    this.setStoreParms(store, title, true);
                    store.removeAll();
                    store.load();
                }
            },
            
            // TODO: set up global events that repsond to date changes and set the appropriate 
            // parameters and cookie values. For now move Refresh to the top and remove dates from 
            // individual reports. Disable refresh button for the KPI Trend tab.
            /*'* > toolbar > [name="startDate"]': {
                change: function() {
                    alert("process for any datefield");
                }
            },*/
            
            'qsoperationsresults > toolbar > [name="startDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },
            
            'qsoperationsresults > toolbar > [name="endDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },

            'qsoperationsresults > toolbar [text="Store Name"]': {
                click: function(button) {
                    var qsOpsStore = this.getQsOperationsStore();
                    qsOpsStore.clearFilter();
                    qsOpsStore.sort(button.sortData.property, button.sortData.direction);
                    this.changeSortDirection(button, true);
                }
            },

            // TODO: find a way to combine into one event for all menus?
            // handler for 
            'kpitoolbar > splitbutton > menu [id="webreportid-3"]': {      // QsOperations Report
                click: function(menu) {
                    // first paramater is ignored in the method being called 
                    this.application.fireEvent('opentab', this.getQsoperationsListView());
                }
            },

            // Managing the KPI Concept report
            'kpiconceptresults > toolbar [text="Refresh"]': {
                click: function() {
                    var activetab, store;
                    
                    store = this.getKpiConceptsStore();
                    activetab = this.getActiveTab();

                    this.setStoreParms(store, activetab.title, true);
                    store.removeAll();
                    store.load();
                }
            },

            'kpiconceptresults > toolbar [text="KPI Type"]': {
                click: function(button) {
                    this.getKpiConceptsStore().clearFilter();
                    this.getKpiConceptsStore().sort(button.sortData.property, button.sortData.direction);
                    this.changeSortDirection(button, true);
                }
            },

            'kpiconceptresults > toolbar [text="Rank"]': {
                click: function(button) {
                    this.getKpiConceptsStore().clearFilter();
                    this.getKpiConceptsStore().sort(button.sortData.property, button.sortData.direction);
                    this.changeSortDirection(button, true);
                }
            },

            'kpiconceptresults': {
                close: function(grid) {
                    // TODO: display a message to allow user to confirm closing a report
                    //alert('You closed the grid! ' + grid.getId());
                    Ext.util.Cookies.clear(grid.title + 'SDate');
                    Ext.util.Cookies.clear(grid.title + 'EDate');
                    this.getKpiConceptMnuBtn().enable();
                },
                added: function(grid) {
                    grid.store.removeAll();
                },
                afterrender: function(grid) {
                    grid.store.load();
                    this.getKpiConceptMnuBtn().disable();
                }
            },
            
            'kpiconceptresults > toolbar > [name="startDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },
            
            'kpiconceptresults > toolbar > [name="endDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },

            // TODO: find a way to combine into one event for all menus?
            // handler for 
            'kpitoolbar > splitbutton > menu [id="webreportid-1"]': {
                click: function(menu) {
                    // first paramater is ignored in the method being called
                    this.application.fireEvent('opentab', this.getKpiconceptListView());
                }
            },

            // Managing the KPI Trend Chart report
            'genpanel': {
                close: function(chart) {
                    //Ext.util.Cookies.clear(chart.title + 'SDate');
                    //Ext.util.Cookies.clear(chart.title + 'EDate');
                    this.getKpiTrendMnuBtn().enable();
                },

                afterrender: function(chart) {
                    this.getKpiTrendMnuBtn().disable();
                }
            },

            'genpanel > toolbar': {
                click: function() {
                    alert("BOING!");
                }
            },
            
            'genpanel > toolbar > [name="startDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },
            
            'genpanel > toolbar > [name="endDate"]': {
                blur: function(datefield) {
                    var reportTitle = this.getQsoperationsListView();
                    this.application.fireEvent('datechange', datefield, reportTitle.prototype.title);
                }
            },

            'kpitoolbar > splitbutton > menu [id="webreportid-2"]': {
                click: function() {
                    /// initialize store from the server
                    //get the store for this report
                    var trendStore = this.getKpiTrendsStore();

                    // set the store parms  - retrieves the date and soon the logon parameters
                    this.setStoreParms(trendStore, 'KPI Trend Report', false);

                    // load the master store
                    trendStore.load();
                }
            },

            // New event for dynamic creation of a grid style report. All fields definitions and sort order come from the database
            'kpitoolbar > splitbutton > menu [text="Sales Concept Dyn"]': {
                click: function() {
                    var dConceptReportStore = this.getReportFieldsSettingStore();
                    this.setStoreParms(dConceptReportStore, 'KPI Concept', false);
                    dConceptReportStore.load();
                }
            },

            // Managing the toolbar
            'kpitoolbar > splitbutton': {
                click: function(button) {
                    button.showMenu();
                }
            }
        });
        
        this.application.on({
            opentab: this.displayReport,
            scope: this
        });

        this.getUserParmsStore().on('load', function(store) {
            // Extjs has iterators! Whoo hoo!
            /*store.data.each(function (item, index, length) {
                Ext.util.Cookies.set(item.data.ReportName + 'SDateChanged', false);
                Ext.util.Cookies.set(item.data.ReportName + 'EDateChanged', false);
            }, this);*/ // don't load on initialize
            
            /*var x = store.getCount();  // find a way to make this a for each
            if (x>0) {                
                var i=0;
                for (;i<x;i++) {
                    //console.log(this);
                    //console.log(store.data.items[i].data.ReportName);
                }
            }*/
        });
        
        this.getQsOperationsStore().on('beforeload', function(store) {
//            Ext.ComponentQuery.query('reportviewer')[0].findLayoutController().setLoading('Loading Sales Ledger Report. This could take up to two minutes...');
            Ext.ComponentQuery.query('viewport')[0].setLoading('Loading Sales Ledger Report. This may take a moment...');
        });
        
        this.getQsOperationsStore().on('load', function() {
//            Ext.ComponentQuery.query('reportviewer')[0].findLayoutController().setLoading(false);
            Ext.ComponentQuery.query('viewport')[0].setLoading(false);
        }); 

        this.getKpiConceptsStore().on('beforeload', function(store) {
//            Ext.ComponentQuery.query('reportviewer')[0].findLayoutController().setLoading('Loading KPI Report. This could take up to two minutes...');
            Ext.ComponentQuery.query('viewport')[0].setLoading('Loading KPI Report. This may take a moment...');
        });
        
        this.getKpiConceptsStore().on('load', function() {
//            Ext.ComponentQuery.query('reportviewer')[0].findLayoutController().setLoading(false);
            Ext.ComponentQuery.query('viewport')[0].setLoading(false);
        }); 
        
        this.getKpiConceptsStore().on('afterload', function() {
            this.sort('RankPerc', 'ASC');
        }); 

        this.getKpiTrendsStore().on('beforeload', function() {
            //Ext.ComponentQuery.query('reportviewer')[0].setLoading();
//            Ext.ComponentQuery.query('reportviewer')[0].findLayoutController().setLoading('Loading KPI Trend data...');
            Ext.ComponentQuery.query('viewport')[0].setLoading('Loading KPI Trend data...');
        });
        
        // TODO: make this filter dynamic based on selected Store and KPI value
        // Sales KPI
        this.getKpiTrendsStore().on({
            load: this.createCharts,
            scope: this
        });
        
        // part of a dynamic report generation in grid style
        this.getReportFieldsSettingStore().on({
            load: this.createGridReport,
            scope: this
        });
        
        // experiment to get date change information
        this.application.on({
            datechange: this.changeDate,
            scope: this
        });
    },
    
    changeDate: function(dateField, reportName) {
        if (dateField.name == 'startDate') {
            this.dateOpts.startDate = Ext.Date.format(dateField.value, 'Y,m,d');
        }
        
        if (dateField.name == 'endDate') {
            this.dateOpts.endDate = Ext.Date.format(dateField.value, 'Y,m,d');
        }
    },
        
    createGridReport: function() {
        // need the store to for field settings and get a list of columns to add
        var theStore = this.getReportFieldsSettingStore();
        
        var theGridStore = this.getKpiConceptsStore();
        theGridStore.load();
        
        // fill this collection object with columns from the database store, ReportFieldsSetting
        var theCol = new Ext.grid.Column();
        
        // use for in loop item in the store add a column
        /*theCol.add({header: 'Default Field Name', dataIndex: 'DefaultFieldName'},
                   {header: 'Custom Field Name', dataIndex: 'CustomFieldName'});*/
        var x = theStore.data.getCount();
        for (var i=0; i < x; i++) {
            var colDef = {};
            
            if (theStore.data.items[i].data.CustomFieldName == "") {
                colDef.header = theStore.data.items[i].data.DefaultFieldName;
            } else {
                colDef.header = theStore.data.items[i].data.CustomFieldName;
            }   // for each record get columns data
            
            colDef.dataIndex = theStore.data.items[i].data.DefaultFieldName;
            
            theCol.add(colDef);
        }

        var dynamicGrid = Ext.create('Ext.grid.Panel', {
                            closable: true,
                            title: 'Dynamic Grid', 
                            //columns: [{header: 'Default Field Name', dataIndex: 'DefaultFieldName'}], 
                            columns: theCol.getGridColumns(),
                            store: theGridStore
            });
            
        
            
        // last step is to add the tab to the report viewer
        var myTabViewer = Ext.ComponentQuery.query('reportviewer');
        var myTabView = myTabViewer[0];
        myTabView.addReport(dynamicGrid);
    },
    
    selectedStoreId: 0,
    
    createCharts: function() {
        if (this.selectedStoreId == 0) {
            this.selectedStoreId = 1001;
        }
        
        // Beginning with KPI: Sales
        // clone the store
        var storeData = this.getKpiTrendsStore().data.clone();
        // create a new KPI Trend store
        var storeStore = new QS.store.KpiTrends();
        // deap copy the data
        var x = storeData.getCount();
        if (x>0) {
            var i=0;
            for (;i<x;i++) {
                storeStore.add(storeData.items[i]);
            }
        } else {
            storeStore = null;
        }
        // run the filter
        //if (storeStore.isStore == true && storeStore != null) {
        if (storeStore != null) { 
            storeStore.filterBy(function(rec) {
                if (rec.data.KPI=='Sales' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // build trend style charts and apply the new stores to them
        var storeChart = new QS.view.kpitrend.Chart();
        // assign it's store an id
        storeChart.store.storeId = 'storesales';
        // assign store to new chart
        storeChart.store = storeStore;
        // set the size of the chart
        storeChart.width = 600;
        storeChart.height = 400;
        /// end of Daily Sales
        
        // repeat for new store per KPI - Average Check
        var avgCheckStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                avgCheckStore.add(storeData.items[i]);
            }
        } else {
            avgCheckStore = null;
        }
        // filter store
        //if (avgCheckStore.isStore == true && avgCheckStore != null) {
        if (avgCheckStore != null) {
            avgCheckStore.filterBy(function(rec) {
                if (rec.data.KPI=='Average Check' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // do previous group of steps again for the other charts
        var avgCheckChart = new QS.view.kpitrend.Chart();
        avgCheckChart.store.storeId = 'avgcheckstore';
        avgCheckChart.store = avgCheckStore;
        avgCheckChart.width = 600;
        avgCheckChart.height = 400;
        /// end of Average Check
        
        // repeat for new store per KPI - Average Wage
        // perform deap copy
        var avgWageStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                avgWageStore.add(storeData.items[i]);
            }
        } else {
            avgWageStore = null;
        }
        // filter store
        //if (avgWageStore.isStore == true && avgWageStore != null) {
        if (avgWageStore != null) {
            avgWageStore.filterBy(function(rec) {
                if (rec.data.KPI=='Average Wage' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var avgWageChart = new QS.view.kpitrend.Chart();
        avgWageChart.store.storeId = 'avgwagestore';
        avgWageChart.store = avgWageStore;
        avgWageChart.width = 600;
        avgWageChart.height = 400;
        /// end of Average Wage Chart

        // repeat for new store per KPI - Sales Comp
        // perform deap copy
        var salesCompStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                salesCompStore.add(storeData.items[i]);
            }
        } else {
            salesCompStore = null;
        }
        // filter store
        //if (salesCompStore.isStore == true && salesCompStore != null) {
        if (salesCompStore != null) {
            salesCompStore.filterBy(function(rec) {
                if (rec.data.KPI=='Sales Comp' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var salesCompChart = new QS.view.kpitrend.Chartpct();
        salesCompChart.store.storeId = 'salescompstore';
        salesCompChart.store = salesCompStore;
        salesCompChart.width = 600;
        salesCompChart.height = 400;
        /// end of Sales Comp
        
        // repeat for new store per KPI - Labor Trends
        // perform deap copy
        var laborTrendsStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                laborTrendsStore.add(storeData.items[i]);
            }
        } else {
            laborTrendsStore = null;
        }
        // filter store
        //if (laborTrendsStore.isStore == true && laborTrendsStore != null) {
        if (laborTrendsStore != null) {
            laborTrendsStore.filterBy(function(rec) {
                if (rec.data.KPI=='Labor' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var laborTrendsChart = new QS.view.kpitrend.Chartpct();
        laborTrendsChart.store.storeId = 'labortrendsstore';
        laborTrendsChart.store = laborTrendsStore;
        laborTrendsChart.width = 600;
        laborTrendsChart.height = 400;
        /// end of Labor Trends

        // repeat for new store per KPI - Ticket Comp
        // perform deap copy
        var ticketCompStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                ticketCompStore.add(storeData.items[i]);
            }
        } else {
            ticketCompStore = null;
        }
        // filter store
        //if (ticketCompStore.isStore == true && ticketCompStore != null) {
        if (ticketCompStore != null) {
            ticketCompStore.filterBy(function(rec) {
                if (rec.data.KPI=='Ticket Comp' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var ticketCompChart = new QS.view.kpitrend.Chartpct();
        ticketCompChart.store.storeId = 'ticketcompstore';
        ticketCompChart.store = ticketCompStore
        ticketCompChart.width = 600;
        ticketCompChart.height = 400;
        /// end of Ticket Comp

        // repeat for new store per KPI - TPMH
        // perform deap copy
        var tmphStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                tmphStore.add(storeData.items[i]);
            }
        } else {
            tmphStore = null;
        }
        // filter store
        //if (tmphStore.isStore == true && tmphStore != null) {
        if (tmphStore != null) {
            tmphStore.filterBy(function(rec) {
                if (rec.data.KPI=='TMPH' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var tmphChart = new QS.view.kpitrend.Chart();
        tmphChart.store.storeId = 'tmphstore';
        tmphChart.store = tmphStore
        tmphChart.width = 600;
        tmphChart.height = 400;
        /// end of TPMH

        // repeat for new store per KPI - Cash Variance
        // perform deap copy
        var cashVarianceStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                cashVarianceStore.add(storeData.items[i]);
            }
        } else {
            cashVarianceStore = null;
        }
        // filter store
        //if (cashVarianceStore.isStore == true && cashVarianceStore != null) {
        if (cashVarianceStore != null) {
            cashVarianceStore.filterBy(function(rec) {
                if (rec.data.KPI=='Cash Variance' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var cashVarianceChart = new QS.view.kpitrend.ChartpctCa();
        cashVarianceChart.store.storeId = 'cashvariancestore';
        cashVarianceChart.store = cashVarianceStore
        cashVarianceChart.width = 600;
        cashVarianceChart.height = 400;
        /// end of Cash Variance

        // repeat for new store per KPI - SPMH
        // perform deap copy
        var spmhStore = new QS.store.KpiTrends();
        x = storeData.getCount();
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                spmhStore.add(storeData.items[i]);
            }
        } else {
            spmhStore = null;
        }
        // filter store
        //if (spmhStore.isStore == true && spmhStore != null) {
        if (spmhStore != null) {
            spmhStore.filterBy(function(rec) {
                if (rec.data.KPI=='SPMH' && Ext.util.Format.trim(rec.data.Store.replace(/^[ 0]/g,''))==this.selectedStoreId) {
                    //console.log(rec.data.Store)
                    return true;
                }
        
                return false;
            }, this);
        }
        // end of deap copy and filtering
        // do previous group of steps again for the other charts
        var spmhChart = new QS.view.kpitrend.Chart();
        spmhChart.store.storeId = 'spmhstore';
        spmhChart.store = spmhStore
        spmhChart.width = 600;
        spmhChart.height = 400;
        /// end of SPMH

        // create a data for select field based on the store
        var kpiStores = new QS.store.KpiTrends(),
            distinctStores = [];

        x = storeData.getCount();
        
        if (x > 0) {
            var i = 0;
            for (;i < x; i++) {
                kpiStores.add(storeData.items[i]);
            }
        } else {
            kpiStores = null;
        }
        //generate a list of distinct Stores for the select field
        //if (kpiStores.isStore == true && kpiStores != null) {
        if (kpiStores != null) {
            kpiStores.filterBy(function(rec) {
                var nx = distinctStores.length,
                    ni = 0,
                    okToAdd = true;
    
                for (; ni < nx; ni++) {
                    if (distinctStores[ni][0] === rec.data.Store) {
                        //console.log("don't add " + rec.data.Store);
                        okToAdd = false;
                        break;
                    }
                }
                
                if (okToAdd === true) { 
                    distinctStores.push([rec.data.Store, rec.data.Store]);
                }    
    
            }, this);
        }
        
        var storeSelectionStore = new Ext.data.ArrayStore({
            fields: ['storeid', 'displayText'],
            data: distinctStores.sort()
        });
                
        // need a panel to add charts on to - use Gereric template file.
        var kpiPanel = new QS.view.GenPanel();
        // maybe add a tool bar, but use kpiPanel.add() instead
        kpiPanel.title = "KPI Trend Report";

        kpiPanel.add([{
            itemId: 'kpipanel',
            alias: 'widget.trendtoolbar',
            xtype: 'panel',
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: [{
                    xtype: 'combo',
                    transform: 'stateSelect',
                    itemId: 'store_select',
                    id: 'store_select',
                    fieldLabel: 'Choose Store ID',
                    name: 'store_metric',
                    forceSelection: true,
                    width: 200,
                    labelWidth: 100,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'storeid',
                    displayField: 'displayText',
                    triggerAction: 'all',
                    value: '' + this.selectedStoreId,
                    store: storeSelectionStore,
                    listeners: {
                        scope: this,
                        'select': function(select) { 
                            //console.log('select change has just happened on the combobox.' + select.getValue());
                            var storeId = select.getValue();
                            if (storeId != '' || storeId !== null) {
                                
                                this.selectedStoreId = Number(storeId);
                                kpiPanel.destroy();     // definitely not bulletproof - danger of running out of memory
                                this.createCharts();
                            }
                        },
                        'afterrender': function(select) {
                            //if (this.selectedStoreId == 0) {
                                //this.selectedStoreId = 1001;
                            //}
                            select.setValue(this.selectedStoreId);
                        }  
                    }
                }]
            }, {
                dock: 'top',
                title: 'Average Check - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [storeChart],
            }, {
                dock: 'top',
                title: 'Daily Average Sales - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [avgCheckChart]
            }, {
                dock: 'top',
                title: 'Average Wage - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [avgWageChart]
            }, {
                dock: 'top',
                title: 'Sales Comp - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [salesCompChart]
            }, {
                dock: 'top',
                title: 'Labor Trends - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [laborTrendsChart]
            }, {
                dock: 'top',
                title: 'Ticket Comp - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [ticketCompChart]
            }, {
                dock: 'top',
                title: 'TMPH - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [tmphChart]
            }, {
                dock: 'top',
                title: 'Cash Variance - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [cashVarianceChart]
            }, {
                dock: 'top',
                title: 'SPMH - Store: ' + this.selectedStoreId,
                collapsible: true,
                items: [spmhChart]
            }]              
        }]);
        
        // last step is to add the tab to the report viewer
        var myTabViewer = Ext.ComponentQuery.query('reportviewer');
        var myTabView = myTabViewer[0];
        myTabView.addReport(kpiPanel);      // remember to disable the load event for kpiReports
//        var rptView = Ext.ComponentQuery.query('reportviewer')[0]; //.setLoading(false);
//        rptView.findLayoutController().setLoading(false);
        var rptView = Ext.ComponentQuery.query('viewport')[0]; //.setLoading(false);
        rptView.setLoading(false);
    },
    
    getActiveTab: function () {
        var tabview, activetab, retVal;
        
        tabview = this.getTabViewer();
        if (typeof tabview !== "undefined") {
            activetab = tabview.getActiveTab();
            
            if (typeof activetab !== "undefined") {
                retVal = activetab;
            } else {
                retVal = null;
            }
        } else {
            retVal = null;
        }
        
        return retVal;
    },
    
    displayReport: function(report) {
        var viewer = this.getTabViewer(),   // get Tab from refs cause it should exist
            reportToDisplay = report.create();

        this.setStoreParms(reportToDisplay.store, reportToDisplay.title, false);
        
        viewer.addReport(reportToDisplay);
    },
    
    setStoreParms: function(store, reportName, isRefresh) {
        var parmstore, storerec, data, startDate, endDate,
            sDatePicker, eDatePicker;
        
        parmstore = this.getUserParmsStore();
        storerec = parmstore.find("ReportName", reportName);
        data = parmstore.getAt(storerec);
        
        sDatePicker = this.getStartDate();
        eDatePicker = this.getEndDate();
        
        if (Ext.util.Cookies.get(reportName + 'SDate') == null) {
            var d = new Date(data.get('FromDate'));
                        
            startDate = Ext.Date.format(d, 'Y,m,d');
            sDatePicker.setValue(d);
        } else {
            startDate = Ext.util.Cookies.get(reportName + 'SDate');
            sDatePicker.setValue(new Date(startDate.replace(/,/g, '/')));
        }
        
        if (Ext.util.Cookies.get(reportName + 'EDate') == null) {
            var ed = new Date(data.get('ToDate'));
            
            endDate = Ext.Date.format(ed, 'Y,m,d');
            eDatePicker.setValue(ed);
        } else {
            endDate = Ext.util.Cookies.get(reportName + 'EDate');
            eDatePicker.setValue(new Date(endDate.replace(/,/g, '/')));
        }

        // TODO: set up extra params for each store
        var sParams = { sp: data.get('Procedure'), uid: data.get('UserId'), sDate: startDate, eDate: endDate, org: data.get('Organization'), company: data.get('Company'), market: data.get('Market'), dm: data.get('DM'), storenum: data.get('Store') },
            theStore = store,
            itsProxy = theStore.getProxy();
            
        itsProxy.extraParams = sParams;
        
        theStore.setProxy(itsProxy);
        
        // TODO: try/catch? 
        return true;
    },
    
    // for KPI Concept TODO: make resusable for all controllers
    changeSortDirection: function(button, changeDirection) {
        var sortData = button.sortData,
            iconCls  = button.iconCls;
        
        if (sortData) {
            if (changeDirection !== false) {
                button.sortData.direction = Ext.String.toggle(button.sortData.direction, "ASC", "DESC");
                button.setIconCls(Ext.String.toggle(iconCls, "sort-asc", "sort-desc"));
            }
        }
    },
    
    showMask: function(msg) {
//        this.getTabViewer().findLayoutController().setLoading(msg);
        Ext.ComponentQuery.query('viewport')[0].setLoading(msg);
    },
    
    hideMask: function() {
//        this.getTabViewer().findLayoutController().setLoading(false);
        Ext.ComponentQuery.query('viewport')[0].setLoading(msg);
    },
        
    onPanelRendered: function() {
        // TODO: Load a default report
        //console.log("On Render: Controller for KPI Concept Results Grid");
    }
});
