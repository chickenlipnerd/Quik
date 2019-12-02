Ext.define('QS.common.GridFactory', {
    
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
    
    formattingLookup: {
        'Currency': 'formatMoney',
        'Percent': 'formatPercent',
        'Number': 'formatNumber',
        'Date': 'formatDate',
        //'Filter_Repeats': 'filterRepeat'
    },
    
    summaryTypeLookup: {
        'formatMoney': 'sum',
        'formatPercent': 'average',
        'formatNumber': 'sum'
    },
    
    // Gets items from a preview of the grid differently than the column definition grid
    // from a fully generated grid with stores and models
    // we only want column info - we'll generate the model and store
    //      from the Report viewer
    getPreviewGridColumns: function (previewGrid) {
        var columnData = previewGrid.columns,
            store = previewGrid.getStore(),
            grouperField = '',
            columninfo = [];
            
        if (typeof store.groupers.first() != 'undefined') {
            grouperField = store.groupers.first().property;
        }

        var i = 0,
            c = columnData.length;            
        for (; i < c; i++) {
            var columnobj = {}, 
                columnChange = columnData[i],
                sRenderer = null;
                
            if (typeof columnChange.renderMeta != 'undefined') {
                sRenderer = columnChange.renderMeta;
            } else {
                sRenderer = (typeof columnChange.renderer != 'undefined') ? columnChange.renderer.$name : null;
            }
                
            columnobj.header = columnChange.initialConfig.header;
            columnobj.dataIndex = columnChange.dataIndex;
            columnobj.datatype = columnChange.datatype;
            columnobj.hideRepeats = columnChange.hideRepeats;
            columnobj.renderer = sRenderer;
            columnobj.summaryType = columnChange.summaryType;
            columnobj.summaryRenderer = sRenderer;
            columnobj.width = columnChange.width;
            columnobj.hidden = columnChange.hidden;
            columnobj.sortState = columnChange.sortState;
            //columnobj.locked = false;
            
            if (columnobj.dataIndex === grouperField) {
                columnobj.grouperField = grouperField;
            }
            
            columninfo.push(columnobj);
        }
        
        return columninfo;
    },
    
    getJsonColConfig: function (grid) {
        var colsDefGrid = grid,
            columndata = grid.getSelectionModel();
            columninfo = [];
            
        columndata.selected.each( function (item) {

            var columnobj = {};
            
            columnobj.header =          (typeof item.data.customName === 'undefined' || item.data.customName == '') ? item.data.dataIndex : item.data.customName;
            columnobj.dataIndex =       item.data.dataIndex;
            columnobj.datatype =        item.data.dataType;
            columnobj.hideRepeats =   	item.data.hideRepeats;
            columnobj.renderer =        this.formattingLookup[item.data.formatting];
            columnobj.summaryType =     this.summaryTypeLookup[this.formattingLookup[item.data.formatting]];
            columnobj.summaryRenderer = this.formattingLookup[item.data.formatting];
        
            columninfo.push(columnobj);
            
        }, this);
        
        var coldefString = Ext.JSON.encode(columninfo);
            
        return coldefString;
        
    },

    createGridReport: function (isPreview, name, params, columnInfo, rType, menu) {
        
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
        
        var dynStore = Ext.create('Ext.data.Store', {
            
            //// related to buffering
            //pageSize: 5000,
            //// allow the grid to interact with the paging scroller by buffering
            //buffered: true,     //in extjs 4.1 this and autoLoad: true is all you need
            //// never purge any data, we prefetch all up front
            //purgePageCount: 0,
            //// related to buffering
            
            model: 'dynModel',
            autoLoad: false, // in extjs 4.1 this and buffered: true is all you need
            listeners: {
                beforeload: function() {
                    // Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                    QS.common.GridFactory.prototype.beforeLoad();
                },
                load: function() {
                    // Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                    QS.common.GridFactory.prototype.load();
                },
                beforeprefetch: function () {
                    // Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
                    QS.common.GridFactory.prototype.beforeLoad();
                },
                prefetch: function () {
                    // Ext.ComponentQuery.query('viewport')[0].setLoading(false);
                    QS.common.GridFactory.prototype.load();
                }
            }
        });

        c = columns.length;
        i = 0;
        for (; i < c; i++) {
            var sRenderer = false;/*, hideRepeats = false, dataIndex = columns[i].dataIndex;*/

            // TODO: if hideRepeats enabled hide repeats

            sRenderer = helperMethods[columns[i].renderer];
            columns[i].renderer = sRenderer;
            columns[i].summaryRenderer = sRenderer;
            //columns[i].beforeRender = function () {console.log(this)};
        }
        
        var groupingFeature = Ext.create(Ext.grid.feature.GroupingSummary, {
            hideGroupHeader: false,
            enableGroupingMenu: true,
            groupHeaderTpl: '{name}',
            extras: new QS.common.HelperMethods()
        });
        
        var filterFeature = Ext.create(Ext.ux.grid.FiltersFeature, {
            encode: true,
            local: true,
            filters: dynFilters
        });
        
        var _gridId = (isPreview) ? 'gridpreview' : name.replace(/\s/g, '').toLowerCase() + 'results';
        
        //create a grid
        var dynGrid = Ext.create('Ext.grid.Panel', {
            
            //alias: 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results',
            alias: name.replace(/\s/g, '').toLowerCase() + 'results',
            id: _gridId, //id: name.replace(/\s/g, '').toLowerCase() + 'results',
            features: [groupingFeature, filterFeature],
            
            listeners: {

                beforerender: function (grid) {
                    //console.log(grid);
                },
            },
            
            tbar: [{
                text: 'Clear Filter Data',
                handler: function (button) {
                    var thisGrid = Ext.getCmp(_gridId);
                    //var thisGrid = button.up(_gridId);
                    thisGrid.filters.clearFilters();
                }
            }, {
                text: 'Clear Grouping',
                icon: '/resources/images/control_rewind.png',
                handler: function(button) {
                    var thisGrid = Ext.getCmp(_gridId);
                    //var thisGrid = button.up(_gridId);
                    thisGrid.features[0].disable();
                }
            }],

            title: name,
            store: dynStore,
            closable: true,
            columns: columns,
            
        });
        
        return dynGrid;
                        
    },
    
    beforeLoad: function () {
        Ext.ComponentQuery.query('viewport')[0].setLoading('Loading data...');
    },
    
    load: function () {
        Ext.ComponentQuery.query('viewport')[0].setLoading(false);
    }
    
});
