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

        private string _MarketName;

        private string _DMName;

        private System.Nullable<int> _StoreNumber;

        private System.Nullable<decimal> _AdjustedSales;

        private System.Nullable<decimal> _AdjustedSalesLY;

        private System.Nullable<decimal> _AdjustedSalesCalcTY;

        private System.Nullable<decimal> _CustomerCountLY;

        private System.Nullable<decimal> _CustomerCountCalcTY;

        private System.Nullable<decimal> _CashOverShort;
        //-----//
        //private System.Nullable<decimal> _AuditTotal;
        //private System.Nullable<decimal> _ManagerMeals;
        //private System.Nullable<decimal> _EmplyeeMeals;
        //private System.Nullable<decimal> _FreeFood;
        //private System.Nullable<decimal> _BreakfastSales;
        //private System.Nullable<decimal> _LunchSales;
        //private System.Nullable<decimal> _AfternoonSales;
        //private System.Nullable<decimal> _DinnerSales;
        //private System.Nullable<decimal> _NightSales;
        //private System.Nullable<decimal> _MidnightSales;
        //private System.Nullable<decimal> _CloseSales;
        //private System.Nullable<decimal> _SalesTax;                
        //private System.Nullable<decimal> _NonFoodA;                
        //private System.Nullable<decimal> _NonFoodB;                
        //private System.Nullable<decimal> _KidsCredit;
        //private System.Nullable<decimal> _GiftCertSNew;            
        //private System.Nullable<decimal> _PaidIns;                 
        //private System.Nullable<decimal> _PaidOuts;  
        //private System.Nullable<decimal> _DiscountAmount;
        //private System.Nullable<decimal> _Deposit1;
        //private System.Nullable<decimal> _Deposit2;
        //private System.Nullable<decimal> _Deposit3;
        //private System.Nullable<decimal> _Deposit4;
        //private System.Nullable<decimal> _CashOnHand;
        //private System.Nullable<decimal> _CashAccountabiliy;
        //private System.Nullable<decimal> _VoidAmount;
        //private System.Nullable<decimal> _StateTaxRate;
        //private System.Nullable<decimal> _CalculatedTax;
        //private System.Nullable<decimal> _Deposit5;
        //private System.Nullable<decimal> _Deposit6;
        //private System.Nullable<decimal> _Deposit7;
        //private System.Nullable<decimal> _Deposit8;
        //private System.Nullable<decimal> _Deposit9;
        //private System.Nullable<decimal> _Deposit10;
        //private System.Nullable<decimal> _Deposit11;
        //private System.Nullable<decimal> _Deposit12;
        //private System.Nullable<decimal> _Deposit13;
        //private System.Nullable<decimal> _Deposit14;
        //private string _DayName;
        //private System.Nullable<decimal> _DriveCount;
        //private System.Nullable<decimal> _AdjustedSales2Y;
        //private System.Nullable<decimal> _CustomerCount2Y;
        //private System.Nullable<decimal> _BreakfastCount;
        //private System.Nullable<decimal> _NetSalesLy;
        //private System.Nullable<decimal> _CreditCardPct;
        //private System.Nullable<decimal> _BreakfastSalesLY;
        //private System.Nullable<decimal> _LunchSalesLY;
        //private System.Nullable<decimal> _AfternoonSalesLY;
        //private System.Nullable<decimal> _DinnerSalesLY;
        //private System.Nullable<decimal> _NightSalesLY;
        //private System.Nullable<decimal> _CloseSalesLY;
        //private System.Nullable<decimal> _CashSales;
        //private System.Nullable<decimal> _CancelledItems;
        //private System.Nullable<decimal> _CancelledOrders;
        ////private System.Nullable<decimal> _Ticket_1;           // Ticket_1_$
        ////private System.Nullable<decimal> _Ticket_2;           // Ticket_2_$
        //private System.Nullable<decimal> _pettycASh1;
        //private System.Nullable<decimal> _DriveCountLY;
        //private System.Nullable<decimal> _DriveSalesLY;
        //private System.Nullable<decimal> _QsVoidTotal;
        //private string _QsVoidCount;
        //private System.Nullable<DateTime> _WkDate;
        //private System.Nullable<int> _Dep568CreditCardPct;
        //private System.Nullable<decimal> _Concept4Total;
        //private System.Nullable<decimal> _PromoDollar1;
        //private System.Nullable<decimal> _Discount10Amount;
        //private System.Nullable<decimal> _PromoDollar2;
        //private System.Nullable<decimal> _PromoDollar4;
        //private System.Nullable<decimal> _Dep5678CreditCardPct;
        //private System.Nullable<decimal> _PromoDollar5;
        //private System.Nullable<decimal> _Dep45CreditCardPct;
        //private System.Nullable<decimal> _SrDiscount;
        //private System.Nullable<decimal> _Dep5CreditCardPct;
        //private System.Nullable<decimal> _Concept1Total;
        //private System.Nullable<decimal> _Concept1TotalLY;
        //private System.Nullable<decimal> _Concept2Total;
        //private System.Nullable<decimal> _Concept2TotalLY;
        //private string _MonthName;
        //private System.Nullable<decimal> _BreakfastCountLy;
        //private System.Nullable<DateTime> _OtherDate;
        //private System.Nullable<decimal> _GiftCert1Total;
        //private System.Nullable<decimal> _Refund_T;
        //private System.Nullable<decimal> _VISA;
        //private System.Nullable<decimal> _GiftCardReload;
        //private System.Nullable<decimal> _CouponAmount;
        //private System.Nullable<decimal> _TotalCredCard;
        //private System.Nullable<decimal> _CredCardNetTax;
        //private System.Nullable<decimal> _AdjustedSalesDowLy;
        //private System.Nullable<decimal> _AdjustedSalesCalcLY;
        //private System.Nullable<decimal> _FlagSaleCalc;
        //private System.Nullable<decimal> _CustomerCountCalcLY;
        //private System.Nullable<decimal> _AdjustedSalesCalc2Y;
        //private System.Nullable<decimal> _FlagSaleCalc2LY;
        //private System.Nullable<decimal> _CustomerCountCalc2Y;
        //private System.Nullable<decimal> _AdjustedSalesCalcTYvs2Y;
        //private System.Nullable<decimal> _CustomerCountCalcTYvs2Y;
        //private System.Nullable<decimal> _DTSalesCalc;
        //private System.Nullable<decimal> _DTSalesCalcLY;
        //private System.Nullable<decimal> _Disc_AmtCoupon;
        //private System.Nullable<decimal> _Disc_AmtDiscount;
        //private System.Nullable<decimal> _Disc_10_T;
        //private System.Nullable<decimal> _CalcPromo;
        //private System.Nullable<decimal> _CalcBreakfastSalesCY;
        //private System.Nullable<decimal> _CalcLunchSalesCY;
        //private System.Nullable<decimal> _CalcAfternoonSalesCY;
        //private System.Nullable<decimal> _CalcDinnerSalesCY;
        //private System.Nullable<decimal> _CalcNightSalesCY;
        //private System.Nullable<decimal> _CalcCloseSalesCY;
        //private System.Nullable<decimal> _DiscountsDisc;
        //private System.Nullable<decimal> _DiscountsCoup;
        //private System.Nullable<decimal> _DiscountsPromo;
        //private System.Nullable<decimal> _TotalLaborCost;

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

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MarketName")]
        public string MarketName
        {
            get
            {
                return this._MarketName;
            }
            set
            {
                if ((this._MarketName != value))
                {
                    this._MarketName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DMName")]
        public string DMName
        {
            get
            {
                return this._DMName;
            }
            set
            {
                if ((this._DMName != value))
                {
                    this._DMName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_StoreNumber")]
        public System.Nullable<int> StoreNumber
        {
            get
            {
                return this._StoreNumber;
            }
            set
            {
                if ((this._StoreNumber != value))
                {
                    this._StoreNumber = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSales")]
        public System.Nullable<decimal> AdjustedSales
        {
            get
            {
                return this._AdjustedSales;
            }
            set
            {
                if ((this._AdjustedSales != value))
                {
                    this._AdjustedSales = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesLY")]
        public System.Nullable<decimal> AdjustedSalesLY
        {
            get
            {
                return this._AdjustedSalesLY;
            }
            set
            {
                if ((this._AdjustedSalesLY != value))
                {
                    this._AdjustedSalesLY = value;
                }
            }
        }

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

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountLY")]
        public System.Nullable<decimal> CustomerCountLY
        {
            get
            {
                return this._CustomerCountLY;
            }
            set
            {
                if ((this._CustomerCountLY != value))
                {
                    this._CustomerCountLY = value;
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
        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AuditTotal")]
        //public System.Nullable<decimal> AuditTotal
        //{
        //    get
        //    {
        //        return this._AuditTotal;
        //    }
        //    set
        //    {
        //        if ((this._AuditTotal != value))
        //        {
        //            this._AuditTotal = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_ManagerMeals")]
        //public System.Nullable<decimal> ManagerMeals
        //{
        //    get
        //    {
        //        return this._ManagerMeals;
        //    }
        //    set
        //    {
        //        if ((this._ManagerMeals != value))
        //        {
        //            this._ManagerMeals = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_EmplyeeMeals")]
        //public System.Nullable<decimal> EmplyeeMeals
        //{
        //    get
        //    {
        //        return this._EmplyeeMeals;
        //    }
        //    set
        //    {
        //        if ((this._EmplyeeMeals != value))
        //        {
        //            this._EmplyeeMeals = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FreeFood")]
        //public System.Nullable<decimal> FreeFood
        //{
        //    get
        //    {
        //        return this._FreeFood;
        //    }
        //    set
        //    {
        //        if ((this._FreeFood != value))
        //        {
        //            this._FreeFood = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BreakfastSales")]
        //public System.Nullable<decimal> BreakfastSales
        //{
        //    get
        //    {
        //        return this._BreakfastSales;
        //    }
        //    set
        //    {
        //        if ((this._BreakfastSales != value))
        //        {
        //            this._BreakfastSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_LunchSales")]
        //public System.Nullable<decimal> LunchSales
        //{
        //    get
        //    {
        //        return this._LunchSales;
        //    }
        //    set
        //    {
        //        if ((this._LunchSales != value))
        //        {
        //            this._LunchSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AfternoonSales")]
        //public System.Nullable<decimal> AfternoonSales
        //{
        //    get
        //    {
        //        return this._AfternoonSales;
        //    }
        //    set
        //    {
        //        if ((this._AfternoonSales != value))
        //        {
        //            this._AfternoonSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DinnerSales")]
        //public System.Nullable<decimal> DinnerSales
        //{
        //    get
        //    {
        //        return this._DinnerSales;
        //    }
        //    set
        //    {
        //        if ((this._DinnerSales != value))
        //        {
        //            this._DinnerSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NightSales")]
        //public System.Nullable<decimal> NightSales
        //{
        //    get
        //    {
        //        return this._NightSales;
        //    }
        //    set
        //    {
        //        if ((this._NightSales != value))
        //        {
        //            this._NightSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MidnightSales")]
        //public System.Nullable<decimal> MidnightSales
        //{
        //    get
        //    {
        //        return this._MidnightSales;
        //    }
        //    set
        //    {
        //        if ((this._MidnightSales != value))
        //        {
        //            this._MidnightSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CloseSales")]
        //public System.Nullable<decimal> CloseSales
        //{
        //    get
        //    {
        //        return this._CloseSales;
        //    }
        //    set
        //    {
        //        if ((this._CloseSales != value))
        //        {
        //            this._CloseSales = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_SalesTax")]
        //public System.Nullable<decimal> SalesTax
        //{
        //    get
        //    {
        //        return this._SalesTax;
        //    }
        //    set
        //    {
        //        if ((this._SalesTax != value))
        //        {
        //            this._SalesTax = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NonFoodA")]
        //public System.Nullable<decimal> NonFoodA
        //{
        //    get
        //    {
        //        return this._NonFoodA;
        //    }
        //    set
        //    {
        //        if ((this._NonFoodA != value))
        //        {
        //            this._NonFoodA = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NonFoodB")]
        //public System.Nullable<decimal> NonFoodB
        //{
        //    get
        //    {
        //        return this._NonFoodB;
        //    }
        //    set
        //    {
        //        if ((this._NonFoodB != value))
        //        {
        //            this._NonFoodB = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_KidsCredit")]
        //public System.Nullable<decimal> KidsCredit
        //{
        //    get
        //    {
        //        return this._KidsCredit;
        //    }
        //    set
        //    {
        //        if ((this._KidsCredit != value))
        //        {
        //            this._KidsCredit = value;
        //        }
        //    }
        //}


        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_GiftCertSNew")]
        //public System.Nullable<decimal> GiftCertSNew
        //{
        //    get
        //    {
        //        return this._GiftCertSNew;
        //    }
        //    set
        //    {
        //        if ((this._GiftCertSNew != value))
        //        {
        //            this._GiftCertSNew = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PaidIns")]
        //public System.Nullable<decimal> PaidIns
        //{
        //    get
        //    {
        //        return this._PaidIns;
        //    }
        //    set
        //    {
        //        if ((this._PaidIns != value))
        //        {
        //            this._PaidIns = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PaidOuts")]
        //public System.Nullable<decimal> PaidOuts
        //{
        //    get
        //    {
        //        return this._PaidOuts;
        //    }
        //    set
        //    {
        //        if ((this._PaidOuts != value))
        //        {
        //            this._PaidOuts = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DiscountAmount")]
        //public System.Nullable<decimal> DiscountAmount
        //{
        //    get
        //    {
        //        return this._DiscountAmount;
        //    }
        //    set
        //    {
        //        if ((this._DiscountAmount != value))
        //        {
        //            this._DiscountAmount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit1")]
        //public System.Nullable<decimal> Deposit1
        //{
        //    get
        //    {
        //        return this._Deposit1;
        //    }
        //    set
        //    {
        //        if ((this._Deposit1 != value))
        //        {
        //            this._Deposit1 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit2")]
        //public System.Nullable<decimal> Deposit2
        //{
        //    get
        //    {
        //        return this._Deposit2;
        //    }
        //    set
        //    {
        //        if ((this._Deposit2 != value))
        //        {
        //            this._Deposit2 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit3")]
        //public System.Nullable<decimal> Deposit3
        //{
        //    get
        //    {
        //        return this._Deposit3;
        //    }
        //    set
        //    {
        //        if ((this._Deposit3 != value))
        //        {
        //            this._Deposit3 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit4")]
        //public System.Nullable<decimal> Deposit4
        //{
        //    get
        //    {
        //        return this._Deposit4;
        //    }
        //    set
        //    {
        //        if ((this._Deposit4 != value))
        //        {
        //            this._Deposit4 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CashOnHand")]
        //public System.Nullable<decimal> CashOnHand
        //{
        //    get
        //    {
        //        return this._CashOnHand;
        //    }
        //    set
        //    {
        //        if ((this._CashOnHand != value))
        //        {
        //            this._CashOnHand = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CashAccountabiliy")]
        //public System.Nullable<decimal> CashAccountabiliy
        //{
        //    get
        //    {
        //        return this._CashAccountabiliy;
        //    }
        //    set
        //    {
        //        if ((this._CashAccountabiliy != value))
        //        {
        //            this._CashAccountabiliy = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_VoidAmount")]
        //public System.Nullable<decimal> VoidAmount
        //{
        //    get
        //    {
        //        return this._VoidAmount;
        //    }
        //    set
        //    {
        //        if ((this._VoidAmount != value))
        //        {
        //            this._VoidAmount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_StateTaxRate")]
        //public System.Nullable<decimal> StateTaxRate
        //{
        //    get
        //    {
        //        return this._StateTaxRate;
        //    }
        //    set
        //    {
        //        if ((this._StateTaxRate != value))
        //        {
        //            this._StateTaxRate = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalculatedTax")]
        //public System.Nullable<decimal> CalculatedTax
        //{
        //    get
        //    {
        //        return this._CalculatedTax;
        //    }
        //    set
        //    {
        //        if ((this._CalculatedTax != value))
        //        {
        //            this._CalculatedTax = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit5")]
        //public System.Nullable<decimal> Deposit5
        //{
        //    get
        //    {
        //        return this._Deposit5;
        //    }
        //    set
        //    {
        //        if ((this._Deposit5 != value))
        //        {
        //            this._Deposit5 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit6")]
        //public System.Nullable<decimal> Deposit6
        //{
        //    get
        //    {
        //        return this._Deposit6;
        //    }
        //    set
        //    {
        //        if ((this._Deposit6 != value))
        //        {
        //            this._Deposit6 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit7")]
        //public System.Nullable<decimal> Deposit7
        //{
        //    get
        //    {
        //        return this._Deposit7;
        //    }
        //    set
        //    {
        //        if ((this._Deposit7 != value))
        //        {
        //            this._Deposit7 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit8")]
        //public System.Nullable<decimal> Deposit8
        //{
        //    get
        //    {
        //        return this._Deposit8;
        //    }
        //    set
        //    {
        //        if ((this._Deposit8 != value))
        //        {
        //            this._Deposit8 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit9")]
        //public System.Nullable<decimal> Deposit9
        //{
        //    get
        //    {
        //        return this._Deposit9;
        //    }
        //    set
        //    {
        //        if ((this._Deposit9 != value))
        //        {
        //            this._Deposit9 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit10")]
        //public System.Nullable<decimal> Deposit10
        //{
        //    get
        //    {
        //        return this._Deposit10;
        //    }
        //    set
        //    {
        //        if ((this._Deposit10 != value))
        //        {
        //            this._Deposit10 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit11")]
        //public System.Nullable<decimal> Deposit11
        //{
        //    get
        //    {
        //        return this._Deposit11;
        //    }
        //    set
        //    {
        //        if ((this._Deposit11 != value))
        //        {
        //            this._Deposit11 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit12")]
        //public System.Nullable<decimal> Deposit12
        //{
        //    get
        //    {
        //        return this._Deposit12;
        //    }
        //    set
        //    {
        //        if ((this._Deposit12 != value))
        //        {
        //            this._Deposit12 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit13")]
        //public System.Nullable<decimal> Deposit13
        //{
        //    get
        //    {
        //        return this._Deposit13;
        //    }
        //    set
        //    {
        //        if ((this._Deposit13 != value))
        //        {
        //            this._Deposit13 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Deposit14")]
        //public System.Nullable<decimal> Deposit14
        //{
        //    get
        //    {
        //        return this._Deposit14;
        //    }
        //    set
        //    {
        //        if ((this._Deposit14 != value))
        //        {
        //            this._Deposit14 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DayName")]
        //public string DayName
        //{
        //    get
        //    {
        //        return this._DayName;
        //    }
        //    set
        //    {
        //        if ((this._DayName != value))
        //        {
        //            this._DayName = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DriveCount")]
        //public System.Nullable<decimal> DriveCount
        //{
        //    get
        //    {
        //        return this._DriveCount;
        //    }
        //    set
        //    {
        //        if ((this._DriveCount != value))
        //        {
        //            this._DriveCount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSales2Y")]
        //public System.Nullable<decimal> AdjustedSales2Y
        //{
        //    get
        //    {
        //        return this._AdjustedSales2Y;
        //    }
        //    set
        //    {
        //        if ((this._AdjustedSales2Y != value))
        //        {
        //            this._AdjustedSales2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCount2Y")]
        //public System.Nullable<decimal> CustomerCount2Y
        //{
        //    get
        //    {
        //        return this._CustomerCount2Y;
        //    }
        //    set
        //    {
        //        if ((this._CustomerCount2Y != value))
        //        {
        //            this._CustomerCount2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BreakfastCount")]
        //public System.Nullable<decimal> BreakfastCount
        //{
        //    get
        //    {
        //        return this._BreakfastCount;
        //    }
        //    set
        //    {
        //        if ((this._BreakfastCount != value))
        //        {
        //            this._BreakfastCount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NetSalesLy")]
        //public System.Nullable<decimal> NetSalesLy
        //{
        //    get
        //    {
        //        return this._NetSalesLy;
        //    }
        //    set
        //    {
        //        if ((this._NetSalesLy != value))
        //        {
        //            this._NetSalesLy = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CreditCardPct")]
        //public System.Nullable<decimal> CreditCardPct
        //{
        //    get
        //    {
        //        return this._CreditCardPct;
        //    }
        //    set
        //    {
        //        if ((this._CreditCardPct != value))
        //        {
        //            this._CreditCardPct = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BreakfastSalesLY")]
        //public System.Nullable<decimal> BreakfastSalesLY
        //{
        //    get
        //    {
        //        return this._BreakfastSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._BreakfastSalesLY != value))
        //        {
        //            this._BreakfastSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_LunchSalesLY")]
        //public System.Nullable<decimal> LunchSalesLY
        //{
        //    get
        //    {
        //        return this._LunchSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._LunchSalesLY != value))
        //        {
        //            this._LunchSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AfternoonSalesLY")]
        //public System.Nullable<decimal> AfternoonSalesLY
        //{
        //    get
        //    {
        //        return this._AfternoonSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._AfternoonSalesLY != value))
        //        {
        //            this._AfternoonSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DinnerSalesLY")]
        //public System.Nullable<decimal> DinnerSalesLY
        //{
        //    get
        //    {
        //        return this._DinnerSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._DinnerSalesLY != value))
        //        {
        //            this._DinnerSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_NightSalesLY")]
        //public System.Nullable<decimal> NightSalesLY
        //{
        //    get
        //    {
        //        return this._NightSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._NightSalesLY != value))
        //        {
        //            this._NightSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CloseSalesLY")]
        //public System.Nullable<decimal> CloseSalesLY
        //{
        //    get
        //    {
        //        return this._CloseSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._CloseSalesLY != value))
        //        {
        //            this._CloseSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CashSales")]
        //public System.Nullable<decimal> CashSales
        //{
        //    get
        //    {
        //        return this._CashSales;
        //    }
        //    set
        //    {
        //        if ((this._CashSales != value))
        //        {
        //            this._CashSales = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CancelledItems")]
        //public System.Nullable<decimal> CancelledItems
        //{
        //    get
        //    {
        //        return this._CancelledItems;
        //    }
        //    set
        //    {
        //        if ((this._CancelledItems != value))
        //        {
        //            this._CancelledItems = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CancelledOrders")]
        //public System.Nullable<decimal> CancelledOrders
        //{
        //    get
        //    {
        //        return this._CancelledOrders;
        //    }
        //    set
        //    {
        //        if ((this._CancelledOrders != value))
        //        {
        //            this._CancelledOrders = value;
        //        }
        //    }
        //}

        ////[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Ticket_1_$")]
        ////public System.Nullable<decimal> Ticket_1
        ////{
        ////    get
        ////    {
        ////        return this._Ticket_1;
        ////    }
        ////    set
        ////    {
        ////        if ((this._Ticket_1 != value))
        ////        {
        ////            this._Ticket_1 = value;
        ////        }
        ////    }
        ////}

        ////[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Ticket_2_$")]
        ////public System.Nullable<decimal> Ticket_2
        ////{
        ////    get
        ////    {
        ////        return this._Ticket_2;
        ////    }
        ////    set
        ////    {
        ////        if ((this._Ticket_2 != value))
        ////        {
        ////            this._Ticket_2 = value;
        ////        }
        ////    }
        ////}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_pettycASh1")]
        //public System.Nullable<decimal> pettycASh1
        //{
        //    get
        //    {
        //        return this._pettycASh1;
        //    }
        //    set
        //    {
        //        if ((this._pettycASh1 != value))
        //        {
        //            this._pettycASh1 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DriveCountLY")]
        //public System.Nullable<decimal> DriveCountLY
        //{
        //    get
        //    {
        //        return this._DriveCountLY;
        //    }
        //    set
        //    {
        //        if ((this._DriveCountLY != value))
        //        {
        //            this._DriveCountLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DriveSalesLY")]
        //public System.Nullable<decimal> DriveSalesLY
        //{
        //    get
        //    {
        //        return this._DriveSalesLY;
        //    }
        //    set
        //    {
        //        if ((this._DriveSalesLY != value))
        //        {
        //            this._DriveSalesLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_QsVoidTotal")]
        //public System.Nullable<decimal> QsVoidTotal
        //{
        //    get
        //    {
        //        return this._QsVoidTotal;
        //    }
        //    set
        //    {
        //        if ((this._QsVoidTotal != value))
        //        {
        //            this._QsVoidTotal = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_QsVoidCount")]
        //public string QsVoidCount
        //{
        //    get
        //    {
        //        return this._QsVoidCount;
        //    }
        //    set
        //    {
        //        if ((this._QsVoidCount != value))
        //        {
        //            this._QsVoidCount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_WkDate")]
        //public System.Nullable<DateTime> WkDate
        //{
        //    get
        //    {
        //        return this._WkDate;
        //    }
        //    set
        //    {
        //        if ((this._WkDate != value))
        //        {
        //            this._WkDate = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep568CreditCardPct")]
        //public System.Nullable<int> Dep568CreditCardPct
        //{
        //    get
        //    {
        //        return this._Dep568CreditCardPct;
        //    }
        //    set
        //    {
        //        if ((this._Dep568CreditCardPct != value))
        //        {
        //            this._Dep568CreditCardPct = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Concept4Total")]
        //public System.Nullable<decimal> Concept4Total
        //{
        //    get
        //    {
        //        return this._Concept4Total;
        //    }
        //    set
        //    {
        //        if ((this._Concept4Total != value))
        //        {
        //            this._Concept4Total = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PromoDollar1")]
        //public System.Nullable<decimal> PromoDollar1
        //{
        //    get
        //    {
        //        return this._PromoDollar1;
        //    }
        //    set
        //    {
        //        if ((this._PromoDollar1 != value))
        //        {
        //            this._PromoDollar1 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Discount10Amount")]
        //public System.Nullable<decimal> Discount10Amount
        //{
        //    get
        //    {
        //        return this._Discount10Amount;
        //    }
        //    set
        //    {
        //        if ((this._Discount10Amount != value))
        //        {
        //            this._Discount10Amount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PromoDollar2")]
        //public System.Nullable<decimal> PromoDollar2
        //{
        //    get
        //    {
        //        return this._PromoDollar2;
        //    }
        //    set
        //    {
        //        if ((this._PromoDollar2 != value))
        //        {
        //            this._PromoDollar2 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PromoDollar4")]
        //public System.Nullable<decimal> PromoDollar4
        //{
        //    get
        //    {
        //        return this._PromoDollar4;
        //    }
        //    set
        //    {
        //        if ((this._PromoDollar4 != value))
        //        {
        //            this._PromoDollar4 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep5678CreditCardPct")]
        //public System.Nullable<decimal> Dep5678CreditCardPct
        //{
        //    get
        //    {
        //        return this._Dep5678CreditCardPct;
        //    }
        //    set
        //    {
        //        if ((this._Dep5678CreditCardPct != value))
        //        {
        //            this._Dep5678CreditCardPct = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PromoDollar5")]
        //public System.Nullable<decimal> PromoDollar5
        //{
        //    get
        //    {
        //        return this._PromoDollar5;
        //    }
        //    set
        //    {
        //        if ((this._PromoDollar5 != value))
        //        {
        //            this._PromoDollar5 = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep45CreditCardPct")]
        //public System.Nullable<decimal> Dep45CreditCardPct
        //{
        //    get
        //    {
        //        return this._Dep45CreditCardPct;
        //    }
        //    set
        //    {
        //        if ((this._Dep45CreditCardPct != value))
        //        {
        //            this._Dep45CreditCardPct = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_SrDiscount")]
        //public System.Nullable<decimal> SrDiscount
        //{
        //    get
        //    {
        //        return this._SrDiscount;
        //    }
        //    set
        //    {
        //        if ((this._SrDiscount != value))
        //        {
        //            this._SrDiscount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Dep5CreditCardPct")]
        //public System.Nullable<decimal> Dep5CreditCardPct
        //{
        //    get
        //    {
        //        return this._Dep5CreditCardPct;
        //    }
        //    set
        //    {
        //        if ((this._Dep5CreditCardPct != value))
        //        {
        //            this._Dep5CreditCardPct = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Concept1Total")]
        //public System.Nullable<decimal> Concept1Total
        //{
        //    get
        //    {
        //        return this._Concept1Total;
        //    }
        //    set
        //    {
        //        if ((this._Concept1Total != value))
        //        {
        //            this._Concept1Total = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Concept1TotalLY")]
        //public System.Nullable<decimal> Concept1TotalLY
        //{
        //    get
        //    {
        //        return this._Concept1TotalLY;
        //    }
        //    set
        //    {
        //        if ((this._Concept1TotalLY != value))
        //        {
        //            this._Concept1TotalLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Concept2Total")]
        //public System.Nullable<decimal> Concept2Total
        //{
        //    get
        //    {
        //        return this._Concept2Total;
        //    }
        //    set
        //    {
        //        if ((this._Concept2Total != value))
        //        {
        //            this._Concept2Total = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Concept2TotalLY")]
        //public System.Nullable<decimal> Concept2TotalLY
        //{
        //    get
        //    {
        //        return this._Concept2TotalLY;
        //    }
        //    set
        //    {
        //        if ((this._Concept2TotalLY != value))
        //        {
        //            this._Concept2TotalLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MonthName")]
        //public string MonthName
        //{
        //    get
        //    {
        //        return this._MonthName;
        //    }
        //    set
        //    {
        //        if ((this._MonthName != value))
        //        {
        //            this._MonthName = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BreakfastCountLy")]
        //public System.Nullable<decimal> BreakfastCountLy
        //{
        //    get
        //    {
        //        return this._BreakfastCountLy;
        //    }
        //    set
        //    {
        //        if ((this._BreakfastCountLy != value))
        //        {
        //            this._BreakfastCountLy = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_OtherDate")]
        //public System.Nullable<DateTime> OtherDate
        //{
        //    get
        //    {
        //        return this._OtherDate;
        //    }
        //    set
        //    {
        //        if ((this._OtherDate != value))
        //        {
        //            this._OtherDate = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_GiftCert1Total")]
        //public System.Nullable<decimal> GiftCert1Total
        //{
        //    get
        //    {
        //        return this._GiftCert1Total;
        //    }
        //    set
        //    {
        //        if ((this._GiftCert1Total != value))
        //        {
        //            this._GiftCert1Total = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Refund_T")]
        //public System.Nullable<decimal> Refund_T
        //{
        //    get
        //    {
        //        return this._Refund_T;
        //    }
        //    set
        //    {
        //        if ((this._Refund_T != value))
        //        {
        //            this._Refund_T = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_VISA")]
        //public System.Nullable<decimal> VISA
        //{
        //    get
        //    {
        //        return this._VISA;
        //    }
        //    set
        //    {
        //        if ((this._VISA != value))
        //        {
        //            this._VISA = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_GiftCardReload")]
        //public System.Nullable<decimal> GiftCardReload
        //{
        //    get
        //    {
        //        return this._GiftCardReload;
        //    }
        //    set
        //    {
        //        if ((this._GiftCardReload != value))
        //        {
        //            this._GiftCardReload = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CouponAmount")]
        //public System.Nullable<decimal> CouponAmount
        //{
        //    get
        //    {
        //        return this._CouponAmount;
        //    }
        //    set
        //    {
        //        if ((this._CouponAmount != value))
        //        {
        //            this._CouponAmount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_TotalCredCard")]
        //public System.Nullable<decimal> TotalCredCard
        //{
        //    get
        //    {
        //        return this._TotalCredCard;
        //    }
        //    set
        //    {
        //        if ((this._TotalCredCard != value))
        //        {
        //            this._TotalCredCard = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CredCardNetTax")]
        //public System.Nullable<decimal> CredCardNetTax
        //{
        //    get
        //    {
        //        return this._CredCardNetTax;
        //    }
        //    set
        //    {
        //        if ((this._CredCardNetTax != value))
        //        {
        //            this._CredCardNetTax = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesDowLy")]
        //public System.Nullable<decimal> AdjustedSalesDowLy
        //{
        //    get
        //    {
        //        return this._AdjustedSalesDowLy;
        //    }
        //    set
        //    {
        //        if ((this._AdjustedSalesDowLy != value))
        //        {
        //            this._AdjustedSalesDowLy = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalcLY")]
        //public System.Nullable<decimal> AdjustedSalesCalcLY
        //{
        //    get
        //    {
        //        return this._AdjustedSalesCalcLY;
        //    }
        //    set
        //    {
        //        if ((this._AdjustedSalesCalcLY != value))
        //        {
        //            this._AdjustedSalesCalcLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FlagSaleCalc")]
        //public System.Nullable<decimal> FlagSaleCalc
        //{
        //    get
        //    {
        //        return this._FlagSaleCalc;
        //    }
        //    set
        //    {
        //        if ((this._FlagSaleCalc != value))
        //        {
        //            this._FlagSaleCalc = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalcLY")]
        //public System.Nullable<decimal> CustomerCountCalcLY
        //{
        //    get
        //    {
        //        return this._CustomerCountCalcLY;
        //    }
        //    set
        //    {
        //        if ((this._CustomerCountCalcLY != value))
        //        {
        //            this._CustomerCountCalcLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalc2Y")]
        //public System.Nullable<decimal> AdjustedSalesCalc2Y
        //{
        //    get
        //    {
        //        return this._AdjustedSalesCalc2Y;
        //    }
        //    set
        //    {
        //        if ((this._AdjustedSalesCalc2Y != value))
        //        {
        //            this._AdjustedSalesCalc2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FlagSaleCalc2LY")]
        //public System.Nullable<decimal> FlagSaleCalc2LY
        //{
        //    get
        //    {
        //        return this._FlagSaleCalc2LY;
        //    }
        //    set
        //    {
        //        if ((this._FlagSaleCalc2LY != value))
        //        {
        //            this._FlagSaleCalc2LY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalc2Y")]
        //public System.Nullable<decimal> CustomerCountCalc2Y
        //{
        //    get
        //    {
        //        return this._CustomerCountCalc2Y;
        //    }
        //    set
        //    {
        //        if ((this._CustomerCountCalc2Y != value))
        //        {
        //            this._CustomerCountCalc2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_AdjustedSalesCalcTYvs2Y")]
        //public System.Nullable<decimal> AdjustedSalesCalcTYvs2Y
        //{
        //    get
        //    {
        //        return this._AdjustedSalesCalcTYvs2Y;
        //    }
        //    set
        //    {
        //        if ((this._AdjustedSalesCalcTYvs2Y != value))
        //        {
        //            this._AdjustedSalesCalcTYvs2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomerCountCalcTYvs2Y")]
        //public System.Nullable<decimal> CustomerCountCalcTYvs2Y
        //{
        //    get
        //    {
        //        return this._CustomerCountCalcTYvs2Y;
        //    }
        //    set
        //    {
        //        if ((this._CustomerCountCalcTYvs2Y != value))
        //        {
        //            this._CustomerCountCalcTYvs2Y = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DTSalesCalc")]
        //public System.Nullable<decimal> DTSalesCalc
        //{
        //    get
        //    {
        //        return this._DTSalesCalc;
        //    }
        //    set
        //    {
        //        if ((this._DTSalesCalc != value))
        //        {
        //            this._DTSalesCalc = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DTSalesCalcLY")]
        //public System.Nullable<decimal> DTSalesCalcLY
        //{
        //    get
        //    {
        //        return this._DTSalesCalcLY;
        //    }
        //    set
        //    {
        //        if ((this._DTSalesCalcLY != value))
        //        {
        //            this._DTSalesCalcLY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Disc_AmtCoupon")]
        //public System.Nullable<decimal> Disc_AmtCoupon
        //{
        //    get
        //    {
        //        return this._Disc_AmtCoupon;
        //    }
        //    set
        //    {
        //        if ((this._Disc_AmtCoupon != value))
        //        {
        //            this._Disc_AmtCoupon = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Disc_AmtDiscount")]
        //public System.Nullable<decimal> Disc_AmtDiscount
        //{
        //    get
        //    {
        //        return this._Disc_AmtDiscount;
        //    }
        //    set
        //    {
        //        if ((this._Disc_AmtDiscount != value))
        //        {
        //            this._Disc_AmtDiscount = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Disc_10_T")]
        //public System.Nullable<decimal> Disc_10_T
        //{
        //    get
        //    {
        //        return this._Disc_10_T;
        //    }
        //    set
        //    {
        //        if ((this._Disc_10_T != value))
        //        {
        //            this._Disc_10_T = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcPromo")]
        //public System.Nullable<decimal> CalcPromo
        //{
        //    get
        //    {
        //        return this._CalcPromo;
        //    }
        //    set
        //    {
        //        if ((this._CalcPromo != value))
        //        {
        //            this._CalcPromo = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcBreakfastSalesCY")]
        //public System.Nullable<decimal> CalcBreakfastSalesCY
        //{
        //    get
        //    {
        //        return this._CalcBreakfastSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcBreakfastSalesCY != value))
        //        {
        //            this._CalcBreakfastSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcLunchSalesCY")]
        //public System.Nullable<decimal> CalcLunchSalesCY
        //{
        //    get
        //    {
        //        return this._CalcLunchSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcLunchSalesCY != value))
        //        {
        //            this._CalcLunchSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcAfternoonSalesCY")]
        //public System.Nullable<decimal> CalcAfternoonSalesCY
        //{
        //    get
        //    {
        //        return this._CalcAfternoonSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcAfternoonSalesCY != value))
        //        {
        //            this._CalcAfternoonSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcDinnerSalesCY")]
        //public System.Nullable<decimal> CalcDinnerSalesCY
        //{
        //    get
        //    {
        //        return this._CalcDinnerSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcDinnerSalesCY != value))
        //        {
        //            this._CalcDinnerSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcNightSalesCY")]
        //public System.Nullable<decimal> CalcNightSalesCY
        //{
        //    get
        //    {
        //        return this._CalcNightSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcNightSalesCY != value))
        //        {
        //            this._CalcNightSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CalcCloseSalesCY")]
        //public System.Nullable<decimal> CalcCloseSalesCY
        //{
        //    get
        //    {
        //        return this._CalcCloseSalesCY;
        //    }
        //    set
        //    {
        //        if ((this._CalcCloseSalesCY != value))
        //        {
        //            this._CalcCloseSalesCY = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DiscountsDisc")]
        //public System.Nullable<decimal> DiscountsDisc
        //{
        //    get
        //    {
        //        return this._DiscountsDisc;
        //    }
        //    set
        //    {
        //        if ((this._DiscountsDisc != value))
        //        {
        //            this._DiscountsDisc = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DiscountsCoup")]
        //public System.Nullable<decimal> DiscountsCoup
        //{
        //    get
        //    {
        //        return this._DiscountsCoup;
        //    }
        //    set
        //    {
        //        if ((this._DiscountsCoup != value))
        //        {
        //            this._DiscountsCoup = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DiscountsPromo")]
        //public System.Nullable<decimal> DiscountsPromo
        //{
        //    get
        //    {
        //        return this._DiscountsPromo;
        //    }
        //    set
        //    {
        //        if ((this._DiscountsPromo != value))
        //        {
        //            this._DiscountsPromo = value;
        //        }
        //    }
        //}

        //[global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_TotalLaborCost")]
        //public System.Nullable<decimal> TotalLaborCost
        //{
        //    get
        //    {
        //        return this._TotalLaborCost;
        //    }
        //    set
        //    {
        //        if ((this._TotalLaborCost != value))
        //        {
        //            this._TotalLaborCost = value;
        //        }
        //    }
        //}

    }
    [global::System.Data.Linq.Mapping.DatabaseAttribute(Name = "QuikServe")]
    public partial class QsOperationsDataDataContext : System.Data.Linq.DataContext
    {

        private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();

        #region Extensibility Method Definitions
        partial void OnCreated();
        #endregion

        public QsOperationsDataDataContext() :
            base(global::System.Configuration.ConfigurationManager.ConnectionStrings["QuikServeConnectionString"].ConnectionString, mappingSource)
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