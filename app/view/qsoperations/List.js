Ext.define('QS.view.qsoperations.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.qsoperationsresults',
    store: 'QsOperations',
    title: 'Sales Ledger',
    loadMask: false,
    //viewConfig: {
    //    loadMask: false,
    //    style: {overflow: 'auto', overflowX: 'hidden', overflowY: 'scroll'}
    //},
    //autoScroll: true,
    scroll: true,
    closable: true,
    tbar: [{
        xtype: 'tbtext',
        text: 'Sort Order:',
        reorderable: false
    }, {
        text: 'Store Name',
        sortData: {property: 'StoreName', direction: 'DESC'},
        iconCls: 'sort-asc' // store is configured to initially sort asc
    }, '-', {
        text: 'Clear Filter Data',
        handler: function () {
            var thisGrid = Ext.ComponentQuery.query('qsoperationsresults')[0];
            thisGrid.filters.clearFilters();
        }
    }, {
        text: 'Clear Grouping',
        icon: '/resources/images/control_rewind.png',
        handler: function() {
            var thisGrid = Ext.ComponentQuery.query('qsoperationsresults')[0];
            thisGrid.features[0].disable();
        }
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
        icon: './resources/images/refresh.gif'
    }*/],
    stripeRows: true,
    features: [{
        ftype: 'filters',
        encode: true,
        local: true,
        
        filters: [{
            //type: 'list',
            //options: ['Carey', 'Pershing'],
            type: 'string',
            dataIndex: 'StoreName'
        }, {
            type: 'date',
            //type: 'string',
            dataIndex: 'BusinessDate',
            dateFormat: 'm/d/Y'
        }]
    }],
    columns: [
        { 
            header: 'Company',
            dataIndex: 'CompanyName',
            renderer: function(value, metaData, record, rowIndex) {
                return this.extras.filterRepeats(value, rowIndex, 'prevCompany');
            }
        },
        { 
            header: 'FranGroup',
            dataIndex: 'FranGroup',
            renderer: function(value, metaData, record, rowIndex) {
                return this.extras.filterRepeats(value, rowIndex, 'prevFranGrp');
            }
        },
        { 
            header: 'StoreName',
            dataIndex: 'StoreName',
            /*filter: {
                type: 'list',
                options: ['Carey', 'Pershing'] 
                //type: 'string'
            },*/
            /*locked: true,*/
            hidden: true,
            renderer: function(value, metaData, record, rowIndex) {
                var endString = value.split(' - ')[1];
                return this.extras.filterRepeats(endString, rowIndex, 'prevStoreName');
            },
            summaryRenderer: function() {
                return '<span style="font-style: italic; font-weight: bold;">Total</span>'; 
            }
        },
        { 
            header: 'Week Of',                
            dataIndex: 'WeekOf',
            renderer: function(value, metaData, record, rowIndex) {
                return this.extras.filterRepeats(value, rowIndex, 'prevWeekOf');
            }
        },
        { 
            header: 'Business Date',          
            dataIndex: 'BusinessDate',
            renderer: Ext.util.Format.dateRenderer('m/d/Y')/*,
//            renderer: Ext.util.Format.dateRenderer('m/d/Y')
            filter: {
                type: 'date',
                dateFormat: 'm/d/Y',
                dataIndex: 'BusinessDate'
            },*/
            /*renderer: function(val) {
                //var filterJsonDate = /[0-9]+/;
                //var resultMatch = val.toString();
                //return val.match(filterJsonDate);
                var nDate = Number(val.substr(6,13));
                var date = new Date(nDate);
                return Ext.Date.format(date, 'm/d/Y');
            }*/
        },
        { 
            header: 'Promo Adjusted Sales',   
            dataIndex: 'PromoAdjSales', 
            renderer: function (value) {
                return this.extras.formatNumber(value);
            },
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }
        },
        { 
            header: 'Net Sales',         
            dataIndex: 'NetSales', 
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }
        },
        { 
            header: 'Customers',         
            dataIndex: 'CustomerCount', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }
        },
        { 
            header: 'Drive Thru Sales',                     
            dataIndex: 'DriveThruSales', 
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }
        },
        { 
            header: 'AdjustedSalesCalcTY',      
            dataIndex: 'AdjustedSalesCalcTY',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }
        }, 
        { 
            header: 'CustomerCountCalcTY',      
            dataIndex: 'CustomerCountCalcTY', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }      
        }, 
        { 
            header: 'CashOverShort',            
            dataIndex: 'CashOverShort',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }
        },   
        { 
            header: 'LunchSales',               
            dataIndex: 'LunchSales',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }               
        },  
        { 
            header: 'AfternoonSales',           
            dataIndex: 'AfternoonSales',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }           
        },  
        { 
            header: 'DinnerSales',              
            dataIndex: 'DinnerSales',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }              
        }, 
        { 
            header: 'NightSales',               
            dataIndex: 'NightSales',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }               
        },  
        { 
            header: 'CloseSales',               
            dataIndex: 'CloseSales',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }               
        },  
        { 
            header: 'Deposit4',                 
            dataIndex: 'Deposit4',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                 
        },    
        { 
            header: 'Deposit5',                 
            dataIndex: 'Deposit5',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit6',                 
            dataIndex: 'Deposit6',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit7',                 
            dataIndex: 'Deposit7',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit8',                 
            dataIndex: 'Deposit8',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                 
        }, 
        { 
            header: 'DriveCount',               
            dataIndex: 'DriveCount', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }               
        }, 
        { 
            header: 'BreakfastCount',           
            dataIndex: 'BreakfastCount', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }           
        }, 
        { 
            header: 'Dep568CreditCardPct',      
            dataIndex: 'Dep568CreditCardPct', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }      
        }, 
        { 
            header: 'Dep5678CreditCardPct',     
            dataIndex: 'Dep5678CreditCardPct', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }     
        },   
        { 
            header: 'AdjustedSalesCalcLY',      
            dataIndex: 'AdjustedSalesCalcLY',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }      
        }, 
        { 
            header: 'CustomerCountCalcLY',      
            dataIndex: 'CustomerCountCalcLY', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }      
        }, 
        { 
            header: 'AdjustedSalesCalc2Y',      
            dataIndex: 'AdjustedSalesCalc2Y',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }      
        }, 
        { 
            header: 'CustomerCountCalc2Y',      
            dataIndex: 'CustomerCountCalc2Y', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }      
        }, 
        { 
            header: 'AdjustedSalesCalcTYvs2Y',  
            dataIndex: 'AdjustedSalesCalcTYvs2Y',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }  
        }, 
        { 
            header: 'CustomerCountCalcTYvs2Y',  
            dataIndex: 'CustomerCountCalcTYvs2Y', 
            renderer: function (value) {return this.extras.formatNumber(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatNumber(value) + '</span>';
            }  
        }, 

        // --- Not part of the standard set of fields --- //
        { 
            header: 'Sales %',                    
            dataIndex: 'web_Field1', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                     
        },
        { 
            header: '2 Yrs Sales',                
            dataIndex: 'web_Field2',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                     
        },
        { 
            header: 'Customer %',                 
            dataIndex: 'web_Field3', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                     
        },
        { 
            header: '2 Yrs Customer %',           
            dataIndex: 'web_Field4', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                     
        },
        { 
            header: 'Avg Check $',                
            dataIndex: 'web_AvgCk',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                    
        },              
        { 
            header: 'DT %',                       
            dataIndex: 'web_DTPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                
        },          
        { 
            header: 'DT Sales LY%',               
            dataIndex: 'web_Field8', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                   
        },             
        { 
            header: 'DT Customer LY %',           
            dataIndex: 'web_LYDtCountComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }            
        },      
        { 
            header: 'Taco John Promo $',          
            dataIndex: 'web_Field5',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                   
        },             
        { 
            header: 'TJ Promo %',                 
            dataIndex: 'web_TjPromoPct', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }               
        },         
        { 
            header: 'BreakFast Avg Ticket',       
            dataIndex: 'web_BFAvgTicket',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }              
        },        
        { 
            header: 'Breakfast %',                
            dataIndex: 'web_BreakfastPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }         
        },   
        { 
            header: 'BreakFast Sales LY %',       
            dataIndex: 'web_LYBreakfastComp',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }          
        },    
        { 
            header: 'Lunch %',                    
            dataIndex: 'web_LunchSalesPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }        
        },  
        { 
            header: 'Lunch Sales LY %',           
            dataIndex: 'web_LYLunchComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }              
        },        
        //{ header: 'Day Sales %',           dataIndex: 'web_DinnerSalesPct',           },   
        { 
            header: 'Day Sales LY %',             
            dataIndex: 'web_LYDayComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }                
        },          
        { 
            header: 'Dinner %',                   
            dataIndex: 'web_DinnerSalesPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }       
        }, 
        { 
            header: 'Dinner Sales LY%',           
            dataIndex: 'web_LYDinnerComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }             
        },       
        { 
            header: 'Night Sales %',              
            dataIndex: 'web_NightSalesPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }        
        },  
        { 
            header: 'NightSales LY %',            
            dataIndex: 'web_LYNightComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }              
        },        
        { 
            header: 'Close %',                    
            dataIndex: 'web_CloseSalesPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }        
        },  
        /// My calculated Field ///
        {
            header: 'My LY Close Sales %',
            dataIndex: 'MyLyClose',
            renderer: function(value) {
                //var adjVal = (parseFloat(value) * 100.0).toFixed(2);
                return this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value, summaryData, dataIndex) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }
        },
        /// End my calculated Field ///
        { 
            header: 'Close Sales LY %',           
            dataIndex: 'web_LYCloseComp', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }              
        },        
        { 
            header: 'LY Close Sales as % of Adjusted Sales',          
            dataIndex: 'web_LYCloseSalesPercent', 
            renderer: function (value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return  this.extras.formatPercent(value);
            },
            summaryType: 'average',
            summaryRenderer: function(value) {
                //var adjVal = (parseFloat(value) *100.0).toFixed(2);
                return '<span style="font-weight: bold;">' + this.extras.formatPercent(value) + '</span>';
            }      
        },
        { 
            header: 'Gift Card Rdm',              
            dataIndex: 'web_Deposite4',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }            
        },      
        { 
            header: 'Visa',                       
            dataIndex: 'web_Deposite5',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                
        },          
        { 
            header: 'MasterCard',                 
            dataIndex: 'web_Deposite6',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                
        },          
        { 
            header: 'Amex',                       
            dataIndex: 'web_Deposite7',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                
        },          
        { 
            header: 'Discover',                   
            dataIndex: 'web_Deposite8',      
            renderer: function (value) {return this.extras.formatMoney(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.extras.formatMoney(value) + '</span>';
            }                
        }          

    ],
    
    initComponent: function () {
        /*Ext.Loader.setConfig({enabled: true});
        Ext.Loader.setPath('Ext.ux', '../ux');
        Ext.require([
            'Ext.grid.*',
            'Ext.data.*',
            'Ext.ux.grid.FiltersFeature',
            'Ext.toolbar.Paging'
        ]);*/
       
        // below is a workaround for upgrading from 4.0 to 4.1
        var groupingFeature = Ext.create(Ext.grid.feature.GroupingSummary, {
            id: 'group',
             groupHeaderTpl: '{name}',
             hideGroupHeader: false,
             enableGroupingMenu: true,
             extras: new QS.common.HelperMethods()
        });
        
        this.features.unshift(groupingFeature);
        // end of workaround for extjs 4.1
                                
        this.superclass.extras = new QS.common.HelperMethods();
        this.extras = new QS.common.HelperMethods();
        
        this.callParent();
    }

});
