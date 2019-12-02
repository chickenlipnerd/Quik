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
    public partial class KpiTrend
    {

        private string _Org;

        private string _MM;

        private string _DM;

        private string _Loc;

        private string _Store;

        private string _KPI;

        private System.Nullable<int> _Per;

        private System.Nullable<decimal> _Val1;

        private System.Nullable<decimal> _Val2;

        private System.Nullable<decimal> _ReportValue;

        private System.Nullable<decimal> _BenchMark;

        private System.Nullable<decimal> _BenchMark2;

        public KpiTrend()
        {
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Org")]
        public string Org
        {
            get
            {
                return this._Org;
            }
            set
            {
                if ((this._Org != value))
                {
                    this._Org = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MM")]
        public string MM
        {
            get
            {
                return this._MM;
            }
            set
            {
                if ((this._MM != value))
                {
                    this._MM = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_DM")]
        public string DM
        {
            get
            {
                return this._DM;
            }
            set
            {
                if ((this._DM != value))
                {
                    this._DM = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Loc")]
        public string Loc
        {
            get
            {
                return this._Loc;
            }
            set
            {
                if ((this._Loc != value))
                {
                    this._Loc = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Store")]
        public string Store
        {
            get
            {
                return this._Store;
            }
            set
            {
                if ((this._Store != value))
                {
                    this._Store = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_KPI")]
        public string KPI
        {
            get
            {
                return this._KPI;
            }
            set
            {
                if ((this._KPI != value))
                {
                    this._KPI = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Per")]
        public System.Nullable<int> Per
        {
            get
            {
                return this._Per;
            }
            set
            {
                if ((this._Per != value))
                {
                    this._Per = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Val1")]
        public System.Nullable<decimal> Val1
        {
            get
            {
                return this._Val1;
            }
            set
            {
                if ((this._Val1 != value))
                {
                    this._Val1 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Val2")]
        public System.Nullable<decimal> Val2
        {
            get
            {
                return this._Val2;
            }
            set
            {
                if ((this._Val2 != value))
                {
                    this._Val2 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_ReportValue")]
        public System.Nullable<decimal> ReportValue
        {
            get
            {
                return this._ReportValue;
            }
            set
            {
                if ((this._ReportValue != value))
                {
                    this._ReportValue = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BenchMark")]
        public System.Nullable<decimal> BenchMark
        {
            get
            {
                return this._BenchMark;
            }
            set
            {
                if ((this._BenchMark != value))
                {
                    this._BenchMark = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_BenchMark2")]
        public System.Nullable<decimal> BenchMark2
        {
            get
            {
                return this._BenchMark2;
            }
            set
            {
                if ((this._BenchMark2 != value))
                {
                    this._BenchMark2 = value;
                }
            }
        }
    }

    [global::System.Data.Linq.Mapping.DatabaseAttribute(Name = "QuikServe")]
    public partial class KpiTrendDataDataContext : System.Data.Linq.DataContext
    {

        private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();

        #region Extensibility Method Definitions
        partial void OnCreated();
        #endregion

        public KpiTrendDataDataContext() :
            base(global::System.Configuration.ConfigurationManager.ConnectionStrings["QuikServeContext"].ConnectionString, mappingSource)
        {
            OnCreated();
        }

        public KpiTrendDataDataContext(string connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiTrendDataDataContext(System.Data.IDbConnection connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiTrendDataDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiTrendDataDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public System.Data.Linq.Table<KpiTrend> KpiTrends
        {
            get
            {
                return this.GetTable<KpiTrend>();
            }
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.spQsKPITrendV2")]
        public ISingleResult<KpiTrend> spQsKPITrendV2([global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> date1, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> date2, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "Char(25)")] string org, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Company", DbType = "Char(25)")] string company, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Market", DbType = "Char(25)")] string market, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "DM", DbType = "Char(35)")] string dM, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "StoreNumber", DbType = "Char(35)")] string storeNumber)
        {
            return ((ISingleResult<KpiTrend>)(this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), date1, date2, org, company, market, dM, storeNumber).ReturnValue));
        }
    }
    partial class KpiTrendDataDataContext : System.Data.Linq.DataContext
    {
        partial void OnCreated()
        {
            // based on test in the stage environment
            this.CommandTimeout = 120;
        }
    }
}