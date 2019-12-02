using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;

namespace QuikServe.Controllers
{
    public class KpiTrendController : Controller
    {
        private KpiTrendDataDataContext kpi = new KpiTrendDataDataContext();
        //
        // GET: /KpiTrend/

        public JsonResult Index(string uid = "0", string sDate = "", string eDate = "", string org = "", string company = "", string market = "", string dm = "", string storenum = "")
        {
            if (Session["QsUserId"] == null)
            {
                Models.ErrorMessage err = new Models.ErrorMessage();

                err.errorName = "Session Error";
                err.errorMessage = "User session expired.";

                return Json(err, JsonRequestBehavior.AllowGet);
            }

            DateTime fromDate = new DateTime();
            DateTime toDate = new DateTime();

            try
            {
                fromDate = DateTime.Parse(sDate).Date;
                toDate = DateTime.Parse(eDate).Date;
            }
            catch(FormatException ex)
            {
                Models.ErrorMessage formatError = new Models.ErrorMessage();
                formatError.errorName = "InvalidParams";
                formatError.errorMessage = ex.ToString();
                return Json(formatError, JsonRequestBehavior.AllowGet);
            }

            try
            {
                var result = kpi.spQsKPITrendV2(fromDate, toDate, org, company, market, dm, storenum);
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (FormatException ex)
            {
                Models.ErrorMessage formatError = new Models.ErrorMessage();
                formatError.errorName = "Unable to execute procedure " + ex.ToString();
                return Json(formatError, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
