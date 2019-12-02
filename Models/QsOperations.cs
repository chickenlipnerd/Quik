using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Data;
using System.Reflection;
using System.Linq.Expressions;
using System.ComponentModel;

namespace QuikServe.Models
{
    [global::System.Data.Linq.Mapping.TableAttribute(Name = "")]
    public partial class QsOperations
    {

        private string _FranGroup;                                  // Custom Name: CompanyName

        private string _CompanyName;                                // Custom Name: CompanyName

        private string _StoreName;                                  // Custom Name: StoreName

        private string _WeekOf;                                     // Custom Name: Week Of

        private DateTime _BusinessDate;                             // Custom Name: Date

        private System.Nullable<decimal> _PromoAdjSales;            // Custom Name: Promo Adjusted Sales

        private System.Nullable<decimal> _NetSales;                 // Custom Name: Promo Adjusted Sales

        private System.Nullable<decimal> _CustomerCount;            // Custom Name: Customers

        private System.Nullable<decimal> _DriveThruSales;           // Custom Name: Drive Thru Sales
        /*private string _MarketName;*/
        /*private string _DMName;*/
        private System.Nullable<decimal> _AdjustedSalesCalcTY;
        private System.Nullable<decimal> _CustomerCountCalcTY;
        private System.Nullable<decimal> _CashOverShort;
        ////-----//
        private System.Nullable<decimal> _LunchSales;
        private System.Nullable<decimal> _AfternoonSales;
        private System.Nullable<decimal> _DinnerSales;
        private System.Nullable<decimal> _NightSales;
        private System.Nullable<decimal> _CloseSales;
        private System.Nullable<decimal> _Deposit4;
        private System.Nullable<decimal> _Deposit5;
        private System.Nullable<decimal> _Deposit6;
        private System.Nullable<decimal> _Deposit7;
        private System.Nullable<decimal> _Deposit8;
        private System.Nullable<decimal> _DriveCount;
        private System.Nullable<decimal> _BreakfastCount;
        private System.Nullable<decimal> _Dep568CreditCardPct;
        private System.Nullable<decimal> _Dep5678CreditCardPct;
        private System.Nullable<decimal> _AdjustedSalesCalcLY;
        private System.Nullable<int> _CustomerCountCalcLY;
        private System.Nullable<decimal> _AdjustedSalesCalc2Y;
        private System.Nullable<int> _CustomerCountCalc2Y;
        private System.Nullable<decimal> _AdjustedSalesCalcTYvs2Y;
        private System.Nullable<int> _CustomerCountCalcTYvs2Y;

        /// <summary>
        /// these fields are calculated fields that are not part of the output of the stored procedure
        /// they are fields that are displayed in the spreadsheet but based on actual fields from the stored procedure
        /// </summary>
        /// 

        private System.Nullable<decimal> _web_Field1             ;     // Sales %
        private System.Nullable<decimal> _web_Field2             ;     // 2 Yrs Sales
        private System.Nullable<decimal> _web_Field3             ;     // Customer %
        private System.Nullable<decimal> _web_Field4             ;     // 2 Yrs Customer %
        private System.Nullable<decimal> _web_AvgCk              ;     // Avg Check $
        private System.Nullable<decimal> _web_DTPercent          ;     // DT %
        private System.Nullable<decimal> _web_Field8             ;     // DT Sales LY%
        private System.Nullable<decimal> _web_LYDtCountComp      ;     // DT Customer LY %
        private System.Nullable<decimal> _web_Field5             ;     // Taco John Promo $
        private System.Nullable<decimal> _web_TjPromoPct         ;     // TJ Promo %
        private System.Nullable<decimal> _web_BFAvgTicket        ;     // BreakFast Avg Ticket 
        private System.Nullable<decimal> _web_BreakfastPercent   ;     // Breakfast %
        private System.Nullable<decimal> _web_LYBreakfastComp    ;     // BreakFast Sales LY %
        private System.Nullable<decimal> _web_LunchSalesPercent  ;     // Lunch %
        private System.Nullable<decimal> _web_LYLunchComp        ;     // Lunch Sales LY %
        //private System.Nullable<decimal> _web_DinnerSalesPct     ;     // Day Sales %
        private System.Nullable<decimal> _web_LYDayComp          ;     // Day Sales LY %
        private System.Nullable<decimal> _web_DinnerSalesPercent ;     // Dinner %
        private System.Nullable<decimal> _web_LYDinnerComp       ;     // Dinner Sales LY%
        private System.Nullable<decimal> _web_NightSalesPercent  ;     // Night Sales %
        private System.Nullable<decimal> _web_LYNightComp        ;     // NightSales LY %
        private System.Nullable<decimal> _web_CloseSalesPercent  ;     // Close %
        private System.Nullable<decimal> _web_LYCloseComp        ;     // Close Sales LY %
        private System.Nullable<decimal> _web_LYCloseSalesPercent;     // LY Close Sales as % of Adjusted Sales
        private System.Nullable<decimal> _web_Deposite4      ;     // Gift Card Rdm
        private System.Nullable<int>     _web_Deposite5          ;     // Visa
        private System.Nullable<int>     _web_Deposite6          ;     // MasterCard
        private System.Nullable<int>     _web_Deposite7          ;     // Amex
        private System.Nullable<int>     _web_Deposite8          ;     // Discover

        public QsOperations()
        {
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FranGroup")]
        public string FranGroup
        {
            get
            {
                return this._FranGroup;
            }
            set
            {
                if ((this._FranGroup != value))
                {
                    this._FranGroup = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CompanyName")]
        public string CompanyName
        {
            get
            {
                return this._CompanyName;
            }
            set
            {
                if ((this._CompanyName != value))
                {
                    this._CompanyName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_StoreName")]
        public string StoreName
        {
            get
            {
                return this._StoreName;
            }
            set
            {
                if ((this._StoreName != value))
                {
                    this._StoreName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_WeekOf")]
        public string WeekOf
        {
            get
            {
                return this._WeekOf;
            }
            set
            {
                if ((this._WeekOf != value))
                {
                    this._WeekOf = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BusinessDate")]
        public DateTime BusinessDate
        {
            get
            {
                return this._BusinessDate;
            }
            set
            {
                if ((this._BusinessDate != value))
                {
                    this._BusinessDate = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PromoAdjSales")]
        public System.Nullable<decimal> PromoAdjSales
        {
            get
            {
                return this._PromoAdjSales;
            }
            set
            {
                if ((this._PromoAdjSales != value))
                {
                    this._PromoAdjSales = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NetSales")]
        public System.Nullable<decimal> NetSales
        {
            get
            {
                return this._NetSales;
            }
            set
            {
                if ((this._NetSales != value))
                {
                    this._NetSales = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCount")]
        public System.Nullable<decimal> CustomerCount
        {
            get
            {
                return this._CustomerCount;
            }
            set
            {
                if ((this._CustomerCount != value))
                {
                    this._CustomerCount = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DriveThruSales")]
        public System.Nullable<decimal> DriveThruSales
        {
            get
            {
                return this._DriveThruSales;
            }
            set
            {
                if ((this._DriveThruSales != value))
                {
                    this._DriveThruSales = value;
                }
            }
        }

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MarketName")]
        //public string MarketName
        //{
        //    get
        //    {
        //        return this._MarketName;
        //    }
        //    set
        //    {
        //        if ((this._MarketName != value))
        //        {
        //            this._MarketName = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DMName")]
        //public string DMName
        //{
        //    get
        //    {
        //        return this._DMName;
        //    }
        //    set
        //    {
        //        if ((this._DMName != value))
        //        {
        //            this._DMName = value;
        //        }
        //    }
        //}


        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalcTY")]
        public System.Nullable<decimal> AdjustedSalesCalcTY
        {
            get
            {
                return this._AdjustedSalesCalcTY;
            }
            set
            {
                if ((this._AdjustedSalesCalcTY != value))
                {
                    this._AdjustedSalesCalcTY = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalcTY")]
        public System.Nullable<decimal> CustomerCountCalcTY
        {
            get
            {
                return this._CustomerCountCalcTY;
            }
            set
            {
                if ((this._CustomerCountCalcTY != value))
                {
                    this._CustomerCountCalcTY = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CashOverShort")]
        public System.Nullable<decimal> CashOverShort
        {
            get
            {
                return this._CashOverShort;
            }
            set
            {
                if ((this._CashOverShort != value))
                {
                    this._CashOverShort = value;
                }
            }
        }

        //-----//

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_LunchSales")]
        public System.Nullable<decimal> LunchSales
        {
            get
            {
                return this._LunchSales;
            }
            set
            {
                if ((this._LunchSales != value))
                {
                    this._LunchSales = value;
                }
            }
        }


        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AfternoonSales")]
        public System.Nullable<decimal> AfternoonSales
        {
            get
            {
                return this._AfternoonSales;
            }
            set
            {
                if ((this._AfternoonSales != value))
                {
                    this._AfternoonSales = value;
                }
            }
        }


        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DinnerSales")]
        public System.Nullable<decimal> DinnerSales
        {
            get
            {
                return this._DinnerSales;
            }
            set
            {
                if ((this._DinnerSales != value))
                {
                    this._DinnerSales = value;
                }
            }
        }


        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NightSales")]
        public System.Nullable<decimal> NightSales
        {
            get
            {
                return this._NightSales;
            }
            set
            {
                if ((this._NightSales != value))
                {
                    this._NightSales = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CloseSales")]
        public System.Nullable<decimal> CloseSales
        {
            get
            {
                return this._CloseSales;
            }
            set
            {
                if ((this._CloseSales != value))
                {
                    this._CloseSales = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit4")]
        public System.Nullable<decimal> Deposit4
        {
            get
            {
                return this._Deposit4;
            }
            set
            {
                if ((this._Deposit4 != value))
                {
                    this._Deposit4 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit5")]
        public System.Nullable<decimal> Deposit5
        {
            get
            {
                return this._Deposit5;
            }
            set
            {
                if ((this._Deposit5 != value))
                {
                    this._Deposit5 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit6")]
        public System.Nullable<decimal> Deposit6
        {
            get
            {
                return this._Deposit6;
            }
            set
            {
                if ((this._Deposit6 != value))
                {
                    this._Deposit6 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit7")]
        public System.Nullable<decimal> Deposit7
        {
            get
            {
                return this._Deposit7;
            }
            set
            {
                if ((this._Deposit7 != value))
                {
                    this._Deposit7 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit8")]
        public System.Nullable<decimal> Deposit8
        {
            get
            {
                return this._Deposit8;
            }
            set
            {
                if ((this._Deposit8 != value))
                {
                    this._Deposit8 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DriveCount")]
        public System.Nullable<decimal> DriveCount
        {
            get
            {
                return this._DriveCount;
            }
            set
            {
                if ((this._DriveCount != value))
                {
                    this._DriveCount = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BreakfastCount")]
        public System.Nullable<decimal> BreakfastCount
        {
            get
            {
                return this._BreakfastCount;
            }
            set
            {
                if ((this._BreakfastCount != value))
                {
                    this._BreakfastCount = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep568CreditCardPct")]
        public System.Nullable<decimal> Dep568CreditCardPct
        {
            get
            {
                return this._Dep568CreditCardPct;
            }
            set
            {
                if ((this._Dep568CreditCardPct != value))
                {
                    this._Dep568CreditCardPct = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep5678CreditCardPct")]
        public System.Nullable<decimal> Dep5678CreditCardPct
        {
            get
            {
                return this._Dep5678CreditCardPct;
            }
            set
            {
                if ((this._Dep5678CreditCardPct != value))
                {
                    this._Dep5678CreditCardPct = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalcLY")]
        public System.Nullable<decimal> AdjustedSalesCalcLY
        {
            get
            {
                return this._AdjustedSalesCalcLY;
            }
            set
            {
                if ((this._AdjustedSalesCalcLY != value))
                {
                    this._AdjustedSalesCalcLY = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalcLY")]
        public System.Nullable<int> CustomerCountCalcLY
        {
            get
            {
                return this._CustomerCountCalcLY;
            }
            set
            {
                if ((this._CustomerCountCalcLY != value))
                {
                    this._CustomerCountCalcLY = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalc2Y")]
        public System.Nullable<decimal> AdjustedSalesCalc2Y
        {
            get
            {
                return this._AdjustedSalesCalc2Y;
            }
            set
            {
                if ((this._AdjustedSalesCalc2Y != value))
                {
                    this._AdjustedSalesCalc2Y = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalc2Y")]
        public System.Nullable<int> CustomerCountCalc2Y
        {
            get
            {
                return this._CustomerCountCalc2Y;
            }
            set
            {
                if ((this._CustomerCountCalc2Y != value))
                {
                    this._CustomerCountCalc2Y = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalcTYvs2Y")]
        public System.Nullable<decimal> AdjustedSalesCalcTYvs2Y
        {
            get
            {
                return this._AdjustedSalesCalcTYvs2Y;
            }
            set
            {
                if ((this._AdjustedSalesCalcTYvs2Y != value))
                {
                    this._AdjustedSalesCalcTYvs2Y = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalcTYvs2Y")]
        public System.Nullable<int> CustomerCountCalcTYvs2Y
        {
            get
            {
                return this._CustomerCountCalcTYvs2Y;
            }
            set
            {
                if ((this._CustomerCountCalcTYvs2Y != value))
                {
                    this._CustomerCountCalcTYvs2Y = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field1")] // Sales %
        public System.Nullable<decimal> web_Field1
        {
            get
            {
                return this._web_Field1;
            }
            set
            {
                if ((this._web_Field1 != value))
                {
                    this._web_Field1 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field2")] // 2 Yrs Sales
        public System.Nullable<decimal> web_Field2
        {
            get
            {
                return this._web_Field2;
            }
            set
            {
                if ((this._web_Field2 != value))
                {
                    this._web_Field2 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field3")] // Customer %
        public System.Nullable<decimal> web_Field3
        {
            get
            {
                return this._web_Field3;
            }
            set
            {
                if ((this._web_Field3 != value))
                {
                    this._web_Field3 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field4")] // 2 Yrs Customer %
        public System.Nullable<decimal> web_Field4
        {
            get
            {
                return this._web_Field4;
            }
            set
            {
                if ((this._web_Field4 != value))
                {
                    this._web_Field4 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_AvgCk")]
        public System.Nullable<decimal> web_AvgCk
        {
            get
            {
                return this._web_AvgCk;
            }
            set
            {
                if ((this._web_AvgCk != value))
                {
                    this._web_AvgCk = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_DTPercent")]
        public System.Nullable<decimal> web_DTPercent
        {
            get
            {
                return this._web_DTPercent;
            }
            set
            {
                if ((this._web_DTPercent != value))
                {
                    this._web_DTPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field8")]
        public System.Nullable<decimal> web_Field8
        {
            get
            {
                return this._web_Field8;
            }
            set
            {
                if ((this._web_Field8 != value))
                {
                    this._web_Field8 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYDtCountComp")]
        public System.Nullable<decimal> web_LYDtCountComp
        {
            get
            {
                return this._web_LYDtCountComp;
            }
            set
            {
                if ((this._web_LYDtCountComp != value))
                {
                    this._web_LYDtCountComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Field5")]
        public System.Nullable<decimal> web_Field5
        {
            get
            {
                return this._web_Field5;
            }
            set
            {
                if ((this._web_Field5 != value))
                {
                    this._web_Field5 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_TjPromoPct")]
        public System.Nullable<decimal> web_TjPromoPct
        {
            get
            {
                return this._web_TjPromoPct;
            }
            set
            {
                if ((this._web_TjPromoPct != value))
                {
                    this._web_TjPromoPct = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_BFAvgTicket")]
        public System.Nullable<decimal> web_BFAvgTicket
        {
            get
            {
                return this._web_BFAvgTicket;
            }
            set
            {
                if ((this._web_BFAvgTicket != value))
                {
                    this._web_BFAvgTicket = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_BreakfastPercent")]
        public System.Nullable<decimal> web_BreakfastPercent
        {
            get
            {
                return this._web_BreakfastPercent;
            }
            set
            {
                if ((this._web_BreakfastPercent != value))
                {
                    this._web_BreakfastPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYBreakfastComp")]
        public System.Nullable<decimal> web_LYBreakfastComp
        {
            get
            {
                return this._web_LYBreakfastComp;
            }
            set
            {
                if ((this._web_LYBreakfastComp != value))
                {
                    this._web_LYBreakfastComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LunchSalesPercent")]
        public System.Nullable<decimal> web_LunchSalesPercent
        {
            get
            {
                return this._web_LunchSalesPercent;
            }
            set
            {
                if ((this._web_LunchSalesPercent != value))
                {
                    this._web_LunchSalesPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYLunchComp")]
        public System.Nullable<decimal> web_LYLunchComp
        {
            get
            {
                return this._web_LYLunchComp;
            }
            set
            {
                if ((this._web_LYLunchComp != value))
                {
                    this._web_LYLunchComp = value;
                }
            }
        }

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Dinner Sales %")]
        //public System.Nullable<decimal> web_DinnerSalesPct
        //{
        //    get
        //    {
        //        return this._web_DinnerSalesPct;
        //    }
        //    set
        //    {
        //        if ((this._web_DinnerSalesPct != value))
        //        {
        //            this._web_DinnerSalesPct = value;
        //        }
        //    }
        //}

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYDayComp")]
        public System.Nullable<decimal> web_LYDayComp
        {
            get
            {
                return this._web_LYDayComp;
            }
            set
            {
                if ((this._web_LYDayComp != value))
                {
                    this._web_LYDayComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_DinnerSalesPercent")]
        public System.Nullable<decimal> web_DinnerSalesPercent
        {
            get
            {
                return this._web_DinnerSalesPercent;
            }
            set
            {
                if ((this._web_DinnerSalesPercent != value))
                {
                    this._web_DinnerSalesPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYDinnerComp")]
        public System.Nullable<decimal> web_LYDinnerComp
        {
            get
            {
                return this._web_LYDinnerComp;
            }
            set
            {
                if ((this._web_LYDinnerComp != value))
                {
                    this._web_LYDinnerComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_NightSalesPercent")]
        public System.Nullable<decimal> web_NightSalesPercent
        {
            get
            {
                return this._web_NightSalesPercent;
            }
            set
            {
                if ((this._web_NightSalesPercent != value))
                {
                    this._web_NightSalesPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYNightComp")]
        public System.Nullable<decimal> web_LYNightComp
        {
            get
            {
                return this._web_LYNightComp;
            }
            set
            {
                if ((this._web_LYNightComp != value))
                {
                    this._web_LYNightComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_CloseSalesPercent")]
        public System.Nullable<decimal> web_CloseSalesPercent
        {
            get
            {
                return this._web_CloseSalesPercent;
            }
            set
            {
                if ((this._web_CloseSalesPercent != value))
                {
                    this._web_CloseSalesPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYCloseComp")]
        public System.Nullable<decimal> web_LYCloseComp
        {
            get
            {
                return this._web_LYCloseComp;
            }
            set
            {
                if ((this._web_LYCloseComp != value))
                {
                    this._web_LYCloseComp = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_LYCloseSalesPercent")]
        public System.Nullable<decimal> web_LYCloseSalesPercent
        {
            get
            {
                return this._web_LYCloseSalesPercent;
            }
            set
            {
                if ((this._web_LYCloseSalesPercent != value))
                {
                    this._web_LYCloseSalesPercent = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Deposite4")]
        public System.Nullable<decimal> web_Deposite4
        {
            get
            {
                return this._web_Deposite4;
            }
            set
            {
                if ((this._web_Deposite4 != value))
                {
                    this._web_Deposite4 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Deposite5")]
        public System.Nullable<int> web_Deposite5
        {
            get
            {
                return this._web_Deposite5;
            }
            set
            {
                if ((this._web_Deposite5 != value))
                {
                    this._web_Deposite5 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Deposite6")]
        public System.Nullable<int> web_Deposite6
        {
            get
            {
                return this._web_Deposite6;
            }
            set
            {
                if ((this._web_Deposite6 != value))
                {
                    this._web_Deposite6 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Deposite7")]
        public System.Nullable<int> web_Deposite7
        {
            get
            {
                return this._web_Deposite7;
            }
            set
            {
                if ((this._web_Deposite7 != value))
                {
                    this._web_Deposite7 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_web_Deposite8")]
        public System.Nullable<int> web_Deposite8
        {
            get
            {
                return this._web_Deposite8;
            }
            set
            {
                if ((this._web_Deposite8 != value))
                {
                    this._web_Deposite8 = value;
                }
            }
        }
    }
    [global::System.Data.Linq.Mapping.DatabaseAttribute(Name = "QuikServe")]
    public partial class QsOperationsDataDataContext : System.Data.Linq.DataContext
    {

        private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();

        #region Extensibility Method Definitions
        partial void OnCreated();
        #endregion

        public QsOperationsDataDataContext() :
            base(global::System.Configuration.ConfigurationManager.ConnectionStrings["QuikServeContext"].ConnectionString, mappingSource)
        {
            OnCreated();
        }

        public QsOperationsDataDataContext(string connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public QsOperationsDataDataContext(System.Data.IDbConnection connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public QsOperationsDataDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public QsOperationsDataDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public System.Data.Linq.Table<QsOperations> QsOperations
        {
            get
            {
                return this.GetTable<QsOperations>();
            }
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.spQSOperationsReport")]
        public ISingleResult<QsOperations> spQSOperationsReport([global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> FROMDate, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> ToDate, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "Char(25)")] string Organization, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Company", DbType = "Char(25)")] string Company, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Market", DbType = "Char(25)")] string Market, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "DM", DbType = "Char(25)")] string DM, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "StoreNumber", DbType = "Char(25)")] string StoreNumber)
        {
            return ((ISingleResult<QsOperations>)(this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), FROMDate, ToDate, Organization, Company, Market, DM, StoreNumber).ReturnValue));
        }
    }
    partial class QsOperationsDataDataContext : System.Data.Linq.DataContext
    {
        partial void OnCreated()
        {
            //Put your desired timeout here.
            // Timeout is based on tests performed in the stage environment
            this.CommandTimeout = 3600;

            //If you do not want to hard code it, then take it 
            //from Application Settings / AppSettings
            //this.CommandTimeout = Settings.Default.CommandTimeout;
        }
    }
}