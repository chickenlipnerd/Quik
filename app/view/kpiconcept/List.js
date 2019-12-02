Ext.define('QS.view.kpiconcept.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kpiconceptresults',
    store: 'KpiConcepts',
    title: 'KPI Concept',
    viewConfig: {
        loadMask: false,
        style: {overflow: 'auto', overflowX: 'hidden'}
    },
    //autoScroll: true,
    scroll: false,
    closable: true,
    tbar: [{
        xtype: 'tbtext',
        text: 'Sort Order:',
        reorderable: false
    }, {
        text: 'KPI Type',
        sortData: {property: 'KPI', direction: 'DESC'},
        iconCls: 'sort-asc' // store is configured to initially sort asc
    }, {
        text: 'Rank',
        sortData: {property: 'Rank', direction: 'DESC'},
        iconCls: 'sort-asc' // store is configured to initially sort asc
    }/*, '-', {
        xtype: 'datefield',
        name: 'startDate',
        fieldLabel: 'Start Date',
        labelWidth: '1em',
        stateful: true,
        hidden: false
    }, {
        xtype: 'datefield',
        name: 'endDate',
        fieldLabel: 'End Date',
        labelWidth: '1em',
        stateful: true,
        hidden: false
    }, {
        text: 'Refresh',
        icon: '/resources/images/refresh.gif'
    }*/],
    //stateful: true,
    //stateId: 'conceptState',
    stripeRows: true,
    //loadMask: true,
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupHeader: true,
        enableGroupingMenu: false,
        
        extras: new QS.common.HelperMethods()

    }/*, {
        ftype: 'summary'
    }*/],
    columns: [{
        id: "Val1",
        header: "Chain Avg.", 
        //width: 100, 
        dataIndex: 'Val1', 
        flex: 2, 
        sortable: true,
        renderer: function(value) {
            //var adjVal;
            
            if(value < 1) {
                //adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            } else {
                //adjVal = (parseFloat(value)).toFixed(2)
                return this.extras.formatMoney(value);
            }
        },
        filter: {
            type: 'float',
            // specify disabled to disable the filter menu
            disabled: true
        },
        summaryType: 'average',
        field: {
            xtype: 'numberfield'
        },
        summaryRenderer: function(value) {
            //var adjVal;
            
            if(value < 1) {
                //adjVal = (parseFloat(value) *100.0).toFixed(2);
                return this.extras.formatPercent(value);
            } else {
                //adjVal = (parseFloat(value)).toFixed(2)
                return this.extras.formatMoney(value);
            }
        }
    }, {
        header: 'Max Rank',
        dataIndex: 'MaxRank',
        flex: 1,
        hidden: false,
        hideMode: 'visibility',
        filter: {
            type: 'float',
            disabled: true
        },
        summaryType: 'average',
        summaryRenderer: function(value) {
            return '<span style="font-weight: bold;">Max Rank: </span>' + '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
        },
        
        renderer: function(value, metaData, record, rowIndex) {
            return this.extras.filterRepeats(value, rowIndex, 'curMaxRank')
        }
        /*renderer: function(value, metaData, record, rowIndex) {
            
            if (rowIndex == 0 || this.curMaxRank != value) {
                this.curMaxRank = value;
                return value;
            } else {
                return '';
            }
        }*/
    }, {
        header: 'KPI', 
        dataIndex: 'KPI', 
        /*flex: 1,*/ 
        sortable: true,
        hidden: true
    }, {
        id: "Rank",
        header: "Rank", 
        //width: 60, 
        dataIndex: 'Rank', 
        flex: 1, 
        hidden: false,
        sortable: true,
        filter: {
            type: 'int'
            // specify disabled to disable the filter menu
            //, disabled: true
        }
    }, {
        id: "Store",
        header: "Restaurant", 
        //width: 80, 
        dataIndex: 'Store', 
        flex: 1, 
        sortable: true,
        //renderer: Ext.util.Format.dateRenderer('m/d/Y'),
        filter: {
            type: 'string'
            // specify disabled to disable the filter menu
            //, disabled: true
        }
    }, {
        id: "Loc",
        header: "Loc", 
        //width: 100, 
        dataIndex: 'Loc', 
        flex: 2, 
        sortable: true,
        //renderer: Ext.util.Format.dateRenderer('m/d/Y'),
        filter: {
            type: 'string'
            // specify disabled to disable the filter menu
            //, disabled: true
        }
    }, {
        id: "Band",
        header: "Band", 
        //width: 40, 
        dataIndex: 'Band',
        flex: 1, 
        sortable: true,
        filter: {
            type: 'list',
            options: ['1', '2', '3', '4']
            //,phpMode: true
        }               
    }, {
        id: "RankPerc",
        header: "Percentile Rank", 
        //width: 100, 
        dataIndex: 'RankPerc',
        flex: 1,
        renderer: function(value) {
            var icos = {
                    'lowerPct': '/resources/images/arrow_down.gif',
                    'upperPct': '/resources/images/arrow_left.gif',
                    'avgPct':   '/resources/images/arrow_right.gif'

                },
                ico = icos.lowerPct;
                
            if (value > .66) {
                ico = icos.upperPct;
            }
            
            if (value >= .33 && value <= .66) {
                ico = icos.avgPct;
            }
            
            if (value < .33) {
                ico = icos.lowerPct;
            }
            
            return '<span style="display:inline-block;width:20px;height:16px;background:transparent url(' + ico + ') no-repeat;"></span>' + (parseFloat(value) *100.0).toFixed(2) + "%"; 
        },
        sortable: true,
        filter: {
            type: 'string'
            // specify disabled to disable the filter menu
            ,disabled: true
        }
    }],
    
    //curMaxRank: 0,      //hold previous value used to allow dynamic display of KPI max rank data
    
    initComponent: function () {

        this.superclass.extras = new QS.common.HelperMethods();
        this.extras = new QS.common.HelperMethods();
        
        this.callParent(arguments);
    }

});
