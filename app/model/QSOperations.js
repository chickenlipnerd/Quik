Ext.define('QS.model.QsOperations', {
	extend: 'Ext.data.Model',
	fields:
    [
        { name: 'id',                       type: 'int'     },
        { name: 'CompanyName',              type: 'string'  },
        { name: 'StoreName',                type: 'string'  },
        { name: 'FranGroup',                type: 'string'  },
        { name: 'WeekOf',                   type: 'string'  },
        { 
            name: 'BusinessDate',
            type: 'date',
            convert: function(val, record) {
                //var nDate = Number(val.substr(6,13));
                var nDate = Number(val.match(/\d+/g).join(''));
                var date = new Date(nDate);
                return date;// Ext.Date.format(date, 'm/d/Y'); // moved to renderer in grid
            }  
        }, //, dateFormat: 'n/j h:ia'},
        { name: 'PromoAdjSales',            type: 'float'   }, 
        { name: 'NetSales',                 type: 'float'   }, 
        { name: 'CustomerCount',            type: 'float'   }, // Customer Count
        { name: 'DriveThruSales',           type: 'float'   }, // Drive Thru Sales
        { name: 'AdjustedSalesCalcTY',      type: 'float'   }, 
        { name: 'CustomerCountCalcTY',      type: 'float'   }, 
        { name: 'CashOverShort',            type: 'float'   },   
        { name: 'LunchSales',               type: 'float'   },  
        { name: 'AfternoonSales',           type: 'float'   },  
        { name: 'DinnerSales',              type: 'float'   }, 
        { name: 'NightSales',               type: 'float'   },  
        { name: 'CloseSales',               type: 'float'   },  
        { name: 'Deposit4',                 type: 'float'   },    
        { name: 'Deposit5',                 type: 'float'   }, 
        { name: 'Deposit6',                 type: 'float'   }, 
        { name: 'Deposit7',                 type: 'float'   }, 
        { name: 'Deposit8',                 type: 'float'   }, 
        { name: 'DriveCount',               type: 'float'   }, 
        { name: 'BreakfastCount',           type: 'float'   }, 
        { name: 'Dep568CreditCardPct',      type: 'float'   }, 
        { name: 'Dep5678CreditCardPct',     type: 'float'   },   
        { name: 'AdjustedSalesCalcLY',      type: 'float'   }, 
        { name: 'CustomerCountCalcLY',      type: 'int'     }, 
        { name: 'AdjustedSalesCalc2Y',      type: 'float'   }, 
        { name: 'CustomerCountCalc2Y',      type: 'int'     }, 
        { name: 'AdjustedSalesCalcTYvs2Y',  type: 'float'   }, 
        { name: 'CustomerCountCalcTYvs2Y',  type: 'int'     }, 
        
        // --- Not part of the standard set of fields --- //
        { name: 'web_Field1',                  type: 'float'   },
        { name: 'web_Field2',                  type: 'float'   },
        { name: 'web_Field3',                  type: 'float'   },
        { name: 'web_Field4',                  type: 'float'   },           
        { name: 'web_AvgCk',                   type: 'float'   },              
        { name: 'web_DTPercent',               type: 'float'   },          
        { name: 'web_Field8',                  type: 'float'   },             
        { name: 'web_LYDtCountComp',           type: 'float'   },      
        { name: 'web_Field5',                  type: 'float'   },             
        { name: 'web_TjPromoPct',              type: 'float'   },         
        { name: 'web_BFAvgTicket',             type: 'float'   },        
        { name: 'web_BreakfastPercent',        type: 'float'   },   
        { name: 'web_LYBreakfastComp',         type: 'float'   },    
        { name: 'web_LunchSalesPercent',       type: 'float'   },  
        { name: 'web_LYLunchComp',             type: 'float'   },        
        //{ name: '_web_DinnerSalesPct',          type: 'float'   },   
        { name: 'web_LYDayComp',               type: 'float'   },          
        { name: 'web_DinnerSalesPercent',      type: 'float'   }, 
        { name: 'web_LYDinnerComp',            type: 'float'   },       
        { name: 'web_NightSalesPercent',       type: 'float'   },  
        { name: 'web_LYNightComp',             type: 'float'   },        
        { name: 'web_CloseSalesPercent',       type: 'float'   },  
        { name: 'web_LYCloseComp',             type: 'float'   },        
        { name: 'web_LYCloseSalesPercent',     type: 'float'   },
        /// My calculated field ///
        { 
            name: 'MyLyClose', 
            type: 'float' ,
            convert: function(val, record) {
                var result = 0,
                    closeSales = record.data.CloseSales,
                    netSales = record.data.NetSales;
                    
                if (netSales != NaN && netSales != 0) {
                    result = closeSales/netSales;
                } else {
                    result = 0;
                }
                
                return result;
            }
        },
        /// End my calculated field ///
        { name: 'web_Deposite4',                type: 'float'   },      
        { name: 'web_Deposite5',                type: 'int'   },          
        { name: 'web_Deposite6',                type: 'int'   },          
        { name: 'web_Deposite7',                type: 'int'   },          
        { name: 'web_Deposite8',                type: 'int'   }          

    ],
    
    proxy: {
        type: 'ajax',
        //headers: { 'Content-Type': 'application/json;charset=utf-8'},  //This tells ASP.NET to return JSON formatted response
        url: /\/$/g.test(location.href.split('?')[0]) ? "reportproc.aspx" : "/reportproc.aspx",
        reader: {
            type: 'json',
            root: 'kpiconcept',
            successProperty: 'success'
        },
        /*extraParams: {      // Set in controller - example here
            uid: 501,
            sDate: '2011,12,01',
            eDate: '2011,12,07'
        },*/
        actionMethods: {
            read: 'POST'
        }, 
        timeout: 240000
    }
});
