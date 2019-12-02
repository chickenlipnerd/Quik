using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity.Infrastructure;

namespace QuikServe.Controllers
{
    public class StoreprocTestController : Controller
    {
        //
        // GET: /StoreprocTest/

        /// For DbContext "QsSupport" - this could be defined in the QsSupportContext.cs
        //private class Ta
        //{
        //    public string Store_No { get; set; }
        //}

        public ActionResult Index()
        {
            //using (QuikServeContext _db = new QuikServeContext())
            using (QsSupportContext _db = new QsSupportContext())
            {
                try
                {
                    /// scalar value used when query a database with context.Database.SqlQuery<...>(...);
                    //var parameter = new SqlParameter
                    //{
                    //    DbType = DbType.String,
                    //    ParameterName = "Organization",
                    //    Value = "TJCorp"
                    //};

                    //var result = _db.Database.SqlQuery<Ta>("selectedstores @organization", parameter);

                    var parameter = new SqlParameter
                    {
                        DbType = DbType.Int32,
                        ParameterName = "UserId",
                        Value = 540
                    };

                    ((IObjectContextAdapter)_db).ObjectContext.CommandTimeout = 3600;

                    var result = _db.Database.SqlQuery<UserPrefParms>("sp_QSLIVE_WebUserReports @UserId", parameter);

                    return Json(result.ToList(), JsonRequestBehavior.AllowGet);
                }
                catch (FormatException ex)
                {
                    return Json(new { Err = "Somethnig bad happened!", errDesc = ex.Message }, JsonRequestBehavior.AllowGet);
                }
            };
        }

    }
}
