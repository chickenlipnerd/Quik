Ext.define('QSAdmin.controller.DynamicGrid', {
    
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
        'Filter_Repeats': 'filterRepeat'
    },
    
    summaryTypeLookup: {
        'formatMoney': 'sum',
        'formatPercent': 'average',
        'formatNumber': 'sum'
    },
    
    getJsonColConfig: function (grid, coldata) {
        var colsDefGrid = grid,
            columndata = coldata,
            columninfo = [];
            
        columndata.data.each( function (item) {
            if (item.data.enableField) {
                var columnobj = {};
                
                columnobj.header =          (typeof item.data.customName === 'undefined' || item.data.customName == '') ? item.data.dataIndex : item.data.customName;
                columnobj.dataIndex =       item.data.dataIndex;
                columnobj.datatype =        item.data.dataType;
                columnobj.renderer =        this.formattingLookup[item.data.formatting];                    
                columnobj.summaryType =     this.summaryTypeLookup[this.formattingLookup[item.data.formatting]];
                columnobj.summaryRenderer = this.formattingLookup[item.data.formatting];
                //columnobj.locked =          false;
                
                //var columnobj = {
                //    "header":               (typeof item.data.customName === 'undefined' || item.data.customName == '') ? item.data.dataIndex : item.data.customName,
                //    "dataIndex":            item.data.dataIndex,
                //    "datatype":             item.data.dataType,
                //    "metadatatype":         item.data.dataType,
                //    "renderer":             this.formattingLookup[item.data.formatting],
                //    "metarenderer":         this.formattingLookup[item.data.formatting],
                //    "summaryType":          this.summaryTypeLookup[this.formattingLookup[item.data.formatting]],
                //    "summaryRenderer":      this.formattingLookup[item.data.formatting],
                //    "metasummaryrenderer":  this.formattingLookup[item.data.formatting]
                //};
            
                columninfo.push(columnobj);
            }
            
        }, this);
        
        //console.log(Ext.JSON.encode(columninfo));
        var coldefFrmField = Ext.getCmp('ColumnDefinition'),
            coldefString = Ext.JSON.encode(columninfo);
            
        return coldefString;
        
    },

    createGridReport: function (name, params, columnInfo, rType, menu) {
        
        ///create a model
        // - predefine fields based on the JSON
        // - iterate through coldef collection find names and data types 
        // - decode the json and add formatting functions
        var columns = Ext.JSON.decode(columnInfo),
            dynFields = [],
            helperMethods = new QSAdmin.extra.HelperMethods(),
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
            //autoLoad: false,
            autoLoad: false, // in extjs 4.1 this and buffered: true is all you need
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
            var sRenderer = null;
            var theDataIndex = columns[i].dataIndex;
            
            if (columns[i].renderer == 'filterRepeat') {
                
                sRenderer = function (value, metaData, record, rowIndex) {
                    
                    return helperMethods.filterRepeat(value, rowIndex, theDataIndex);
                };
            } else {
                sRenderer = helperMethods[columns[i].renderer];
            }
            
            // Use to be just these three lines of code in for block
            //var sRenderer = helperMethods[columns[i].renderer];
            columns[i].renderer = sRenderer;
            columns[i].summaryRenderer = sRenderer;
        }
        
        var groupingFeature = Ext.create(Ext.grid.feature.GroupingSummary, {
            hideGroupHeader: false,
            enableGroupingMenu: true,
            groupHeaderTpl: '{name}',
            extras: new QSAdmin.extra.HelperMethods()
        });
        
        var filterFeature = Ext.create(Ext.ux.grid.FiltersFeature, {
            encode: true,
            local: true,
            filters: dynFilters
        });
        
        //create a grid
        var dynGrid = Ext.create('Ext.grid.Panel', {
            
            //alias: 'widget.' + name.replace(/\s/g, '').toLowerCase() + 'results',
            alias: name.replace(/\s/g, '').toLowerCase() + 'results',
            id: name.replace(/\s/g, '').toLowerCase() + 'results',
            features: [groupingFeature, filterFeature],
            
            tbar: [{
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
            
        });
        
        return dynGrid;
                        
    }
});
