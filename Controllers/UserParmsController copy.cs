using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;
using System.Data.Linq.Mapping;
using System.Collections;

namespace QuikServe.Controllers
{
    public class UserParmsController : Controller
    {
        //
        // GET: /UserParms/
        //private QsSupportContext _db = new QsSupportContext();
        private UserPrefParmsDataDataContext _db = new UserPrefParmsDataDataContext();

        /*[HttpPost]*/
        public ActionResult Index()
        {
            try
            {
                /*Session.Timeout = 480;
                Session["QsUserId"] = "540";*/
                if (Session["QsUserId"] == null)
                {
                    return RedirectToAction("SErr", "Home", new { iExpired = true });
                }

                /// This works pretty good
                //var query = "SELECT T1.WebReportID, "
                //    + "ReportName = CASE WHEN isnull(CustomReportName,'') = '' THEN ReportName "
                //    + "ELSE CustomReportName "
                //    + "END , T1.[Procedure], T2.DateRangeType, T2.[Type], SeedIncrement, SeedDate, "
                //    + "FromDate = CASE "
                //    + "WHEN T2.DateRangeType = 2 THEN CAST(DATEPART(M,GETDATE()) AS VARCHAR)+'/1/'+CAST(DATEPART(YY,GETDATE()) AS VARCHAR) "
                //    + "WHEN T2.DateRangeType = 4 THEN DATEADD(D, -1, CONVERT(VARCHAR, GETDATE(), 101)) "
                //    + "END , ToDate = DATEADD(D, -1, CONVERT(VARCHAR, GETDATE(), 101))"
                //    + "FROM WebReports T1 "
                //    + "JOIN WebReportSettings T2 "
                //    + "ON T1.WebReportId = T2.WebReportId "
                //    + "JOIN WebUserWebReportSettings T3 "
                //    + "ON T2.WebReportSettingId = T3.WebReportSettingId "
                //    + "JOIN WebUsers T4 "
                //    + "ON T3.UserId = T4.WebUserId "
                //    + "WHERE WebUserId = " + (Session["QsUserId"]).ToString() + " "
                //    + "AND T1.[Status] = 1";

                //var data = _db.Database.SqlQuery<UserParms>(query);
                //return Json(data.ToList(), JsonRequestBehavior.AllowGet);

                /// but try this
                try
                {
                    var result = _db.sp_QSLIVE_WebUserReports((int)(Session["QsUserId"]));
                    //return Json(new { data = result, UserId = (Session["QsUserId"]).ToString() }, JsonRequestBehavior.AllowGet);
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                catch (FormatException ex)
                {
                    Models.ErrorMessage formatError = new Models.ErrorMessage();
                    formatError.errorName = "Unable to execute procedure " + ex.ToString();
                    return Json(formatError, JsonRequestBehavior.AllowGet);
                }
            }
            catch (FormatException ex)
            {
                ViewData["HomeError"] = ex.ToString();
                return View("SErr", "Home");
            }
        }

    }
}
