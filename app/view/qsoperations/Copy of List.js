Ext.define('QS.view.qsoperations.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.qsoperationsresults',
    store: 'QsOperations',
    title: 'QS Operations',
    viewConfig: {
        loadMask: false,
        //style: {overflow: 'auto'}
    },
    //autoScroll: true,
    scroll: true,
    closable: true,
    tbar: [{
        text: 'Refresh',
        icon: './resources/images/refresh.gif'
    }],
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
        
        countChange: function (val) {
            if (val > 0) {
                return '<span style="color:black;">' +     Ext.util.Format.number(val, '0,0') + '</span>';
            } else if (val < 0) {
                return '<span style="color:red;">' +     Ext.util.Format.number(val, '0,0') + '</span>';
            }
            return val;
        },

        change: function (val) {        // copied from this List.js change function
            if (val > 0) {
                return '<span style="color:black; font-weight: bold;">' + Ext.util.Format.usMoney(val) + '</span>';
            } else if (val < 0) {
                return '<span style="color:red; font-weight: bold;">' + Ext.util.Format.usMoney(val) + '</span>';
            }
            return val;
        },
    
        pctChange: function (val) {     // copied from this List.js pctChange function
            if (val > 0) {
                return '<span style="color:black; font-weight: bold;">' + val + '%</span>';
            } else if (val < 0) {
                return '<span style="color:red; font-weight: bold;">' + val + '%</span>';
            }
            return val;
        }

    }],
    columns: [
        { 
            header: 'FranGroup',
            dataIndex: 'FranGroup',
            renderer: function(value, metaData, record, rowIndex) {
                return this.filterRepeats(value, rowIndex, 'prevFranGrp');
            }
        },
        { 
            header: 'Company',
            dataIndex: 'CompanyName',
            renderer: function(value, metaData, record, rowIndex) {
                return this.filterRepeats(value, rowIndex, 'prevCompany');
            }
        },
        { 
            header: 'StoreName',
            dataIndex: 'StoreName',
            renderer: function(value, metaData, record, rowIndex) {
                var endString = value.split(' - ')[1];
                return this.filterRepeats(endString, rowIndex, 'prevStoreName');
            }
        },
        { 
            header: 'Week Of',                
            dataIndex: 'WeekOf',
            renderer: function(value, metaData, record, rowIndex) {
                return this.filterRepeats(value, rowIndex, 'prevWeekOf');
            }
        },
        { 
            header: 'Business Date',          
            dataIndex: 'BusinessDate', 
            renderer: function(val) {
                //new RegExp('/Date\\((-?[0-9]+)\\)/'))
                var nDate = Number(val.substr(6,13));
                var date = new Date(nDate);
                return Ext.Date.format(date, 'm/d/Y');
            }
        },
        { 
            header: 'Promo Adjusted Sales',   
            dataIndex: 'PromoAdjSales', 
            renderer: function (value) {
                return this.change(value);
            },
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }
        },
        { 
            header: 'Net Sales',         
            dataIndex: 'NetSales', 
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }
        },
        { 
            header: 'Customers',         
            dataIndex: 'CustomerCount', 
            renderer: function (value) {return this.countChange(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.countChange(value) + '</span>';
            }
        },
        { 
            header: 'Drive Thru Sales',                     
            dataIndex: 'DriveThruSales', 
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }
        },
//       { 
//           header: 'Employee Hours',         
//           dataIndex: 'EmployeeHours' 
//       },
//        { header: 'MarketName',               dataIndex: 'MarketName'               },
//        { header: 'DMName',                   dataIndex: 'DMName'                   },  
//       { header: 'StoreNumber',              dataIndex: 'StoreNumber'              },
//       { header: 'AdjustedSales',            dataIndex: 'AdjustedSales'            },   
//       { header: 'AdjustedSalesLY',          dataIndex: 'AdjustedSalesLY'          }, 
        { 
            header: 'AdjustedSalesCalcTY',      
            dataIndex: 'AdjustedSalesCalcTY',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }
        }, 
//        { header: 'CustomerCountLY',          dataIndex: 'CustomerCountLY'          }, 
        { header: 'CustomerCountCalcTY',      dataIndex: 'CustomerCountCalcTY'      }, 
        { 
            header: 'CashOverShort',            
            dataIndex: 'CashOverShort',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }
        },   
//        { header: 'WasteAmount',              dataIndex: 'WasteAmount'              }, 
//        { header: 'AuditTotal',               dataIndex: 'AuditTotal'               },  
//        { header: 'ManagerMeals',             dataIndex: 'ManagerMeals'             },    
//        { header: 'EmplyeeMeals',             dataIndex: 'EmplyeeMeals'             },    
//        { header: 'FreeFood',                 dataIndex: 'FreeFood'                 },    
//        { header: 'BreakfastSales',           dataIndex: 'BreakfastSales'           },  
        { 
            header: 'LunchSales',               
            dataIndex: 'LunchSales',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }               
        },  
        { 
            header: 'AfternoonSales',           
            dataIndex: 'AfternoonSales',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }           
        },  
        { 
            header: 'DinnerSales',              
            dataIndex: 'DinnerSales',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }              
        }, 
        { 
            header: 'NightSales',               
            dataIndex: 'NightSales',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }               
        },  
//        { header: 'MidnightSales',            dataIndex: 'MidnightSales'            },   
        { 
            header: 'CloseSales',               
            dataIndex: 'CloseSales',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }               
        },  
//        { header: 'SalesTax',                 dataIndex: 'SalesTax'                 },    
//        { header: 'NonFoodA',                 dataIndex: 'NonFoodA'                 },    
//        { header: 'NonFoodB',                 dataIndex: 'NonFoodB'                 },    
//        { header: 'KidsCredit',               dataIndex: 'KidsCredit'               },  
//        { header: 'GiftCertSNew',             dataIndex: 'GiftCertSNew'             },    
//        { header: 'PaidIns',                  dataIndex: 'PaidIns'                  }, 
//        { header: 'PaidOuts',                 dataIndex: 'PaidOuts'                 },    
//        { header: 'DiscountAmount',           dataIndex: 'DiscountAmount'           },  
//        { header: 'Deposit1',                 dataIndex: 'Deposit1'                 },    
//        { header: 'Deposit2',                 dataIndex: 'Deposit2'                 },    
//        { header: 'Deposit3',                 dataIndex: 'Deposit3'                 },    
        { 
            header: 'Deposit4',                 
            dataIndex: 'Deposit4',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                 
        },    
//        { header: 'CashOnHand',               dataIndex: 'CashOnHand'               },  
//        { header: 'CashAccountabiliy',        dataIndex: 'CashAccountabiliy'        },   
//        { header: 'VoidAmount',               dataIndex: 'VoidAmount'               },  
//        { header: 'StateTaxRate',             dataIndex: 'StateTaxRate'             }, 
//        { header: 'CalculatedTax',            dataIndex: 'CalculatedTax'            }, 
        { 
            header: 'Deposit5',                 
            dataIndex: 'Deposit5',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit6',                 
            dataIndex: 'Deposit6',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit7',                 
            dataIndex: 'Deposit7',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                 
        }, 
        { 
            header: 'Deposit8',                 
            dataIndex: 'Deposit8',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                 
        }, 
//        { header: 'Deposit9',                 dataIndex: 'Deposit9'                 }, 
//        { header: 'Deposit10',                dataIndex: 'Deposit10'                }, 
//        { header: 'Deposit11',                dataIndex: 'Deposit11'                }, 
//        { header: 'Deposit12',                dataIndex: 'Deposit12'                }, 
//        { header: 'Deposit13',                dataIndex: 'Deposit13'                }, 
//        { header: 'Deposit14',                dataIndex: 'Deposit14'                }, 
//        { header: 'DayName',                  dataIndex: 'DayName'                  }, 
        { header: 'DriveCount',               dataIndex: 'DriveCount'               }, 
//        { header: 'AdjustedSales2Y',          dataIndex: 'AdjustedSales2Y'          }, 
//        { header: 'CustomerCount2Y',          dataIndex: 'CustomerCount2Y'          }, 
        { header: 'BreakfastCount',           dataIndex: 'BreakfastCount'           }, 
//        { header: 'NetSalesLy',               dataIndex: 'NetSalesLy'               }, 
//        { header: 'CreditCardPct',            dataIndex: 'CreditCardPct'            }, 
//        { header: 'BreakfastSalesLY',         dataIndex: 'BreakfastSalesLY'         }, 
//        { header: 'LunchSalesLY',             dataIndex: 'LunchSalesLY'             }, 
//        { header: 'AfternoonSalesLY',         dataIndex: 'AfternoonSalesLY'         }, 
//        { header: 'DinnerSalesLY',            dataIndex: 'DinnerSalesLY'            }, 
//        { header: 'NightSalesLY',             dataIndex: 'NightSalesLY'             }, 
//        { header: 'CloseSalesLY',             dataIndex: 'CloseSalesLY'             }, 
//        { header: 'CashSales',                dataIndex: 'CashSales'                }, 
//        { header: 'CancelledItems',           dataIndex: 'CancelledItems'           }, 
//        { header: 'CancelledOrders',          dataIndex: 'CancelledOrders'          }, 
//        { header: 'Ticket_1_$',               dataIndex: 'Ticket_1_$'               },  
//        { header: 'Ticket_2_$',               dataIndex: 'Ticket_2_$'               }, 
//        { header: 'pettycASh1',               dataIndex: 'pettycASh1'               }, 
//        { header: 'DriveCountLY',             dataIndex: 'DriveCountLY'             }, 
//        { header: 'DriveSalesLY',             dataIndex: 'DriveSalesLY'             }, 
//        { header: 'QsVoidTotal',              dataIndex: 'QsVoidTotal'              }, 
//        { header: 'QsVoidCount',              dataIndex: 'QsVoidCount'              }, 
//        { header: 'WkDate',                   dataIndex: 'WkDate'                   }, 
        { header: 'Dep568CreditCardPct',      dataIndex: 'Dep568CreditCardPct'      }, 
//        { header: 'Concept4Total',            dataIndex: 'Concept4Total'            }, 
//        { header: 'PromoDollar1',             dataIndex: 'PromoDollar1'             }, 
//        { header: 'Discount10Amount',         dataIndex: 'Discount10Amount'         }, 
//        { header: 'PromoDollar2',             dataIndex: 'PromoDollar2'             }, 
//        { header: 'PromoDollar4',             dataIndex: 'PromoDollar4'             }, 
        { header: 'Dep5678CreditCardPct',     dataIndex: 'Dep5678CreditCardPct'     },   
//        { header: 'PromoDollar5',             dataIndex: 'PromoDollar5'             }, 
//        { header: 'Dep45CreditCardPct',       dataIndex: 'Dep45CreditCardPct'       }, 
//        { header: 'SrDiscount',               dataIndex: 'SrDiscount'               }, 
//        { header: 'Dep5CreditCardPct',        dataIndex: 'Dep5CreditCardPct'        }, 
//        { header: 'Concept1Total',            dataIndex: 'Concept1Total'            }, 
//        { header: 'Concept1TotalLY',          dataIndex: 'Concept1TotalLY'          }, 
//        { header: 'Concept2Total',            dataIndex: 'Concept2Total'            }, 
//        { header: 'Concept2TotalLY',          dataIndex: 'Concept2TotalLY'          }, 
//        { header: 'MonthName',                dataIndex: 'MonthName'                }, 
//        { header: 'BreakfastCountLy',         dataIndex: 'BreakfastCountLy'         }, 
//        { header: 'OtherDate',                dataIndex: 'OtherDate'                }, 
//        { header: 'GiftCert1Total',           dataIndex: 'GiftCert1Total'           }, 
//        { header: 'Refund_T',                 dataIndex: 'Refund_T'                 }, 
//        { header: 'VISA',                     dataIndex: 'VISA'                     }, 
//        { header: 'GiftCardReload',           dataIndex: 'GiftCardReload'           }, 
//        { header: 'CouponAmount',             dataIndex: 'CouponAmount'             }, 
//        { header: 'TotalCredCard',            dataIndex: 'TotalCredCard'            }, 
//        { header: 'CredCardNetTax',           dataIndex: 'CredCardNetTax'           }, 
//        { header: 'AdjustedSalesDowLy',       dataIndex: 'AdjustedSalesDowLy'       }, 
        { 
            header: 'AdjustedSalesCalcLY',      
            dataIndex: 'AdjustedSalesCalcLY',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }      
        }, 
//        { header: 'FlagSaleCalc',             dataIndex: 'FlagSaleCalc'             }, 
        { header: 'CustomerCountCalcLY',      dataIndex: 'CustomerCountCalcLY'      }, 
        { 
            header: 'AdjustedSalesCalc2Y',      
            dataIndex: 'AdjustedSalesCalc2Y',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }      
        }, 
//        { header: 'FlagSaleCalc2LY',          dataIndex: 'FlagSaleCalc2LY'          }, 
        { header: 'CustomerCountCalc2Y',      dataIndex: 'CustomerCountCalc2Y'      }, 
        { 
            header: 'AdjustedSalesCalcTYvs2Y',  
            dataIndex: 'AdjustedSalesCalcTYvs2Y',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }  
        }, 
        { header: 'CustomerCountCalcTYvs2Y',  dataIndex: 'CustomerCountCalcTYvs2Y'  }, 
//        { header: 'DTSalesCalc',              dataIndex: 'DTSalesCalc'              }, 
//        { header: 'DTSalesCalcLY',            dataIndex: 'DTSalesCalcLY'            }, 
//        { header: 'Disc_AmtCoupon',           dataIndex: 'Disc_AmtCoupon'           }, 
//        { header: 'Disc_AmtDiscount',         dataIndex: 'Disc_AmtDiscount'         }, 
//        { header: 'Disc_10_T',                dataIndex: 'Disc_10_T'                }, 
//        { header: 'CalcPromo',                dataIndex: 'CalcPromo'                }, 
//        { header: 'CalcBreakfastSalesCY',     dataIndex: 'CalcBreakfastSalesCY'     }, 
//        { header: 'CalcLunchSalesCY',         dataIndex: 'CalcLunchSalesCY'         }, 
//        { header: 'CalcAfternoonSalesCY',     dataIndex: 'CalcAfternoonSalesCY'     }, 
//        { header: 'CalcDinnerSalesCY',        dataIndex: 'CalcDinnerSalesCY'        }, 
//        { header: 'CalcNightSalesCY',         dataIndex: 'CalcNightSalesCY'         }, 
//        { header: 'CalcCloseSalesCY',         dataIndex: 'CalcCloseSalesCY'         }, 
//        { header: 'DiscountsDisc',            dataIndex: 'DiscountsDisc'            }, 
//        { header: 'DiscountsCoup',            dataIndex: 'DiscountsCoup'            }, 
//        { header: 'DiscountsPromo',           dataIndex: 'DiscountsPromo'           }, 
//        { header: 'TotalLaborCost',           dataIndex: 'TotalLaborCost'           },
        // --- Not part of the standard set of fields --- //
        { header: 'Sales %',                    dataIndex: 'web_Field1'                     },
        { 
            header: '2 Yrs Sales',                
            dataIndex: 'web_Field2',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                     
        },
        { header: 'Customer %',                 dataIndex: 'web_Field3'                     },
        { header: '2 Yrs Customer %',           dataIndex: 'web_Field4'                     },
        { 
            header: 'Avg Check $',                
            dataIndex: 'web_AvgCk',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                    
        },              
        { header: 'DT %',                       dataIndex: 'web_DTPercent',                },          
        { header: 'DT Sales LY%',               dataIndex: 'web_Field8',                   },             
        { header: 'DT Customer LY %',           dataIndex: 'web_LYDtCountComp',            },      
        { 
            header: 'Taco John Promo $',          
            dataIndex: 'web_Field5',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                   
        },             
        { header: 'TJ Promo %',                 dataIndex: 'web_TjPromoPct',               },         
        { 
            header: 'BreakFast Avg Ticket',       
            dataIndex: 'web_BFAvgTicket',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }              
        },        
        { header: 'Breakfast %',                dataIndex: 'web_BreakfastPercent',         },   
        { 
            header: 'BreakFast Sales LY %',       
            dataIndex: 'web_LYBreakfastComp',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }          
        },    
        { header: 'Lunch %',                    dataIndex: 'web_LunchSalesPercent',        },  
        { header: 'Lunch Sales LY %',           dataIndex: 'web_LYLunchComp',              },        
        //{ header: 'Day Sales %',           dataIndex: 'web_DinnerSalesPct',           },   
        { header: 'Day Sales LY %',             dataIndex: 'web_LYDayComp',                },          
        { header: 'Dinner %',                   dataIndex: 'web_DinnerSalesPercent',       }, 
        { header: 'Dinner Sales LY%',           dataIndex: 'web_LYDinnerComp',             },       
        { header: 'Night Sales %',              dataIndex: 'web_NightSalesPercent',        },  
        { header: 'NightSales LY %',            dataIndex: 'web_LYNightComp',              },        
        { header: 'Close %',                    dataIndex: 'web_CloseSalesPercent',        },  
        { header: 'Close Sales LY %',           dataIndex: 'web_LYCloseComp',              },        
        { header: 'LY Close Sales as % of Adjusted Sales',          dataIndex: 'web_LYCloseSalesPercent',      },
        { 
            header: 'Gift Card Rdm',              
            dataIndex: 'web_Deposite4',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }            
        },      
        { 
            header: 'Visa',                       
            dataIndex: 'web_Deposite5',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                
        },          
        { 
            header: 'MasterCard',                 
            dataIndex: 'web_Deposite6',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                
        },          
        { 
            header: 'Amex',                       
            dataIndex: 'web_Deposite7',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                
        },          
        { 
            header: 'Discover',                   
            dataIndex: 'web_Deposite8',      
            renderer: function (value) {return this.change(value);},
            summaryType: 'sum',
            summaryRenderer: function(value) {
                return '<span style="font-weight: bold;">' + this.change(value) + '</span>';
            }                
        }          

    ],
    
    countChange: function (val) {
        if (val > 0) {
            return '<span style="color:black;">' +     Ext.util.Format.number(val, '0,0') + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' +     Ext.util.Format.number(val, '0,0') + '</span>';
        }
        return val;
    },
    
    change: function (val) {
        if (val > 0) {
            return '<span style="color:black;">' + Ext.util.Format.usMoney(val) + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + Ext.util.Format.usMoney(val) + '</span>';
        }
        return val;
    },
    
    pctChange: function (val) {
        if (val > 0) {
            return '<span style="color:black;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },
    
    temp: {     //hold previous value used to allow dynamic display of KPI max rank data
        'prevFranGrp': '',
        'prevCompany': '',
        'prevStoreName': '',
        'prevWeekOf': ''
    },

    filterRepeats: function(value, rowIndex, tempObjVar) {
        
        if (rowIndex == 0 || this.temp[tempObjVar] != value) {
            this.temp[tempObjVar] = value;
            return value;
        } else {
            return '';
        }
    },

    initComponent: function () {
        // TODO: These need to be dynamic based on
//        this.setAutoScroll(true); 
        this.callParent(arguments);
    }

});
