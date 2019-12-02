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
    public class ReportFieldsSettingController : Controller
    {
        private QsSupportContext _db = new QsSupportContext();

        /*[HttpPost]*/
        public ActionResult Index()
        {
            try
            {
                if (Session["QsUserId"] == null)
                {
                    ViewData["HomeError"] = "User Session expired";
                    return RedirectToAction("SErr", "Home", new { iExpired = true });
                }

                var query = from t1 in _db.WebReports
                            join t2 in _db.WebReportSettings on t1.WebReportId equals t2.WebReportId
                            join t3 in _db.WebReportFieldSettings on t2.WebReportSettingId equals t3.WebReportSettingId
                            where t1.ReportName == "KPI Concept"
                            select new
                            {
                                t3.WebReportFieldSettingId,
                                t3.DefaultFieldName,
                                t3.CustomFieldName,
                                t3.SortOrder,
                                t3.Visible
                            };

                return Json(query.ToList(), JsonRequestBehavior.AllowGet);
                //return Json(data.ToList());
            }
            catch (FormatException ex)
            {
                ViewData["HomeError"] = ex.ToString();
                return View("SErr", "Home");
            }
        }

    }
}
