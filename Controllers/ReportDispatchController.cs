using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuikServe.Controllers
{
    public class ReportDispatchController : Controller
    {
        //
        // GET: /ReportDispatch/

        public ActionResult Index(string report,  object parms)
        {
            if (report == "KpiConcept")
                return RedirectToAction("Index", "KpiConcept", new { uid = "540", sDate = "2012,01,01", eDate = "2012,01,15", org = "TJCorp", company = "", market = "", dm = "", storenum = "" });

            if (report == "KpiTrend")
                return RedirectToAction("Index", "KpiTrend", new { uid = "540", sDate = "2012,01,01", eDate = "2012,01,15", org = "TJCorp", company = "", market = "", dm = "", storenum = "" });

            if (report == "QsOperations")
                return RedirectToAction("Index", "QsOperations", new { uid = "540", sDate = "2012,01,01", eDate = "2012,01,15", org = "TJCorp", company = "", market = "", dm = "", storenum = "" });

            return RedirectToAction("SErr", "Home");
        }

    }
}
