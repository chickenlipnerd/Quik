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
    public partial class UserPrefParms
    {

        private int _UserId;

        private string _ReportName;

        private string _Procedure;

        private int _WebReportId;

        private int _PrivilegeId;

        private int _WebReportSettingId;

        private string _CustomReportName;

        private string _ColumnDefinition;

        private int _Type;

        private string _Organization;

        private string _Market;

        private string _Company;

        private string _DM;

        private string _Store;

        private DateTime _FromDate;

        private DateTime _ToDate;

        public UserPrefParms()
        {
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_UserId")]
        public int UserId
        {
            get
            {
                return this._UserId;
            }
            set
            {
                if ((this._UserId != value))
                {
                    this._UserId = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_ReportName")]
        public string ReportName
        {
            get
            {
                return this._ReportName;
            }
            set
            {
                if ((this._ReportName != value))
                {
                    this._ReportName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Procedure")]
        public string Procedure
        {
            get
            {
                return this._Procedure;
            }
            set
            {
                if ((this._Procedure != value))
                {
                    this._Procedure = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_WebReportId")]
        public int WebReportId
        {
            get
            {
                return this._WebReportId;
            }
            set
            {
                if ((this._WebReportId != value))
                {
                    this._WebReportId = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_PrivilegeId")]
        public int PrivilegeId
        {
            get
            {
                return this._PrivilegeId;
            }
            set
            {
                if ((this._PrivilegeId != value))
                {
                    this._PrivilegeId = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_WebReportSettingId")]
        public int WebReportSettingId
        {
            get
            {
                return this._WebReportSettingId;
            }
            set
            {
                if ((this._WebReportSettingId != value))
                {
                    this._WebReportSettingId = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_CustomReportName")]
        public string CustomReportName
        {
            get
            {
                return this._CustomReportName;
            }
            set
            {
                if ((this._CustomReportName != value))
                {
                    this._CustomReportName = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_ColumnDefinition")]
        public string ColumnDefinition
        {
            get
            {
                return this._ColumnDefinition;
            }
            set
            {
                if ((this._ColumnDefinition != value))
                {
                    this._ColumnDefinition = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Type")]
        public int Type
        {
            get
            {
                return this._Type;
            }
            set
            {
                if ((this._Type != value))
                {
                    this._Type = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Organization")]
        public string Organization
        {
            get
            {
                return this._Organization;
            }
            set
            {
                if ((this._Organization != value))
                {
                    this._Organization = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Market")]
        public string Market
        {
            get
            {
                return this._Market;
            }
            set
            {
                if ((this._Market != value))
                {
                    this._Market = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_Company")]
        public string Company
        {
            get
            {
                return this._Company;
            }
            set
            {
                if ((this._Company != value))
                {
                    this._Company = value;
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

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_FromDate")]
        public DateTime FromDate
        {
            get
            {
                return this._FromDate;
            }
            set
            {
                if ((this._FromDate != value))
                {
                    this._FromDate = value;
                }
            }
        }

        [global::System.Data.Linq.Mapping.ColumnAttribute(Storage = "_ToDate")]
        public DateTime ToDate
        {
            get
            {
                return this._ToDate;
            }
            set
            {
                if ((this._ToDate != value))
                {
                    this._ToDate = value;
                }
            }
        }

    }

    [global::System.Data.Linq.Mapping.DatabaseAttribute(Name = "QsSupport")]
    public partial class UserPrefParmsDataDataContext : System.Data.Linq.DataContext
    {

        private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();

        #region Extensibility Method Definitions
        partial void OnCreated();
        #endregion

        public UserPrefParmsDataDataContext() :
            base(global::System.Configuration.ConfigurationManager.ConnectionStrings["QsSupportContext"].ConnectionString, mappingSource)
        {
            OnCreated();
        }

        public UserPrefParmsDataDataContext(string connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public UserPrefParmsDataDataContext(System.Data.IDbConnection connection) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public UserPrefParmsDataDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public UserPrefParmsDataDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) :
            base(connection, mappingSource)
        {
            OnCreated();
        }

        public System.Data.Linq.Table<UserPrefParms> UserPrefParms
        {
            get
            {
                return this.GetTable<UserPrefParms>();
            }
        }

        [global::System.Data.Linq.Mapping.FunctionAttribute(Name = "dbo.sp_QSLIVE_WebUserReports")]
        public ISingleResult<UserPrefParms> sp_QSLIVE_WebUserReports([global::System.Data.Linq.Mapping.ParameterAttribute(DbType = "int")] System.Nullable<int> UserId)
        {
            return ((ISingleResult<UserPrefParms>)(this.ExecuteMethodCall(this, ((MethodInfo)(MethodInfo.GetCurrentMethod())), UserId).ReturnValue));
        }
    }
    partial class UserPrefParmsDataDataContext : System.Data.Linq.DataContext
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