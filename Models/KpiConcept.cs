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
    public partial class KpiConcept
    {

        private string _Store;

        private string _Org;

        private string _MM;

        private string _DM;

        private string _Loc;

        private string _KPI;

        private System.Nullable<decimal> _Val1;

        private System.Nullable<decimal> _Val2;

        private System.Nullable<decimal> _Val3;

        private System.Nullable<int> _Rank;

        private System.Nullable<int> _MaxRank;

        private System.Nullable<decimal> _RankPerc;

        private System.Nullable<decimal> _Band;

        private string _FBC;

        public KpiConcept()
        {
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

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Val3")]
        public System.Nullable<decimal> Val3
        {
            get
            {
                return this._Val3;
            }
            set
            {
                if ((this._Val3 != value))
                {
                    this._Val3 = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Rank")]
        public System.Nullable<int> Rank
        {
            get
            {
                return this._Rank;
            }
            set
            {
                if ((this._Rank != value))
                {
                    this._Rank = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_MaxRank")]
        public System.Nullable<int> MaxRank
        {
            get
            {
                return this._MaxRank;
            }
            set
            {
                if ((this._MaxRank != value))
                {
                    this._MaxRank = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_RankPerc")]
        public System.Nullable<decimal> RankPerc
        {
            get
            {
                return this._RankPerc;
            }
            set
            {
                if ((this._RankPerc != value))
                {
                    this._RankPerc = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Band")]
        public System.Nullable<decimal> Band
        {
            get
            {
                return this._Band;
            }
            set
            {
                if ((this._Band != value))
                {
                    this._Band = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FBC")]
        public string FBC
        {
            get
            {
                return this._FBC;
            }
            set
            {
                if ((this._FBC != value))
                {
                    this._FBC = value;
                }
            }
        }
    }
    [global::System.Data.Linq.Mapping.DatabaseAttribute(Name = "QuikServe")]
    public partial class KpiConceptDataDataContext : System.Data.Linq.DataContext
    {

        private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();

        #region Extensibility Method Definitions
        partial void OnCreated();
        #endregion

        public KpiConceptDataDataContext() :
            base(global::System.Configuration.ConfigurationManager.ConnectionStrings["QuikServeContext"].ConnectionString, mappingSource)
        {
            OnCreated();
        }

        public KpiConceptDataDataContext(string connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiConceptDataDataContext(System.Data.IDbConnection connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiConceptDataDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public KpiConceptDataDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public System.Data.Linq.Table<KpiConcept> KpiConcepts
        {
            get
            {
                return this.GetTable<KpiConcept>();
            }
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.terKPIConceptV2")]
        public ISingleResult<KpiConcept> terKPIConceptV2([global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> date1, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "SmallDateTime")] System.Nullable<System.DateTime> date2, [global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "Char(25)")] string org, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Company", DbType = "Char(25)")] string company, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "Market", DbType = "Char(25)")] string market, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "DM", DbType = "Char(25)")] string dM, [global::System.Data.Linq.Mapping.ParameterAttribute(Name = "StoreNumber", DbType = "Char(25)")] string storeNumber)
        {
            return ((ISingleResult<KpiConcept>)(this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), date1, date2, org, company, market, dM, storeNumber).ReturnValue));
        }
    }
    partial class KpiConceptDataDataContext : System.Data.Linq.DataContext
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