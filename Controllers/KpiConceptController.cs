using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;

namespace QuikServe.Controllers
{
    public class KpiConceptController : Controller
    {
        private KpiConceptDataDataContext kpi = new KpiConceptDataDataContext();
        //
        // GET: /KpiConcept/

        public JsonResult Index(string uid = "0", string sDate = "", string eDate = "", string org = "", string company = "", string market = "", string dm = "", string storenum = "")
        {
            //DateTime fromDate = new DateTime(2012, 01, 01);
            //DateTime toDate = new DateTime(2012, 01, 07);

            if (Session["QsUserId"] == null)
            {
                Models.ErrorMessage err = new Models.ErrorMessage();
                
                err.errorName = "Session Error";
                err.errorMessage = "User session expired.";
                
                return Json( err, JsonRequestBehavior.AllowGet);
            }

            DateTime fromDate = new DateTime();
            DateTime toDate = new DateTime();

            /*int userId = 500;
            int userId2 = 501;

            if (!(Convert.ToInt32(uid) == userId) && !(Convert.ToInt32(uid) == userId2))
            {
                Models.ErrorMessage invalidUid = new Models.ErrorMessage();
                invalidUid.errorName = "InvalidUser";
                invalidUid.errorMessage = "The user could not be validated";
                return Json(invalidUid, JsonRequestBehavior.AllowGet);
            }*/

            try
            {
                fromDate = DateTime.Parse(sDate).Date;
                toDate = DateTime.Parse(eDate).Date;
            }
            catch (FormatException ex)
            {
                Models.ErrorMessage formatError = new Models.ErrorMessage();
                formatError.errorName = "InvalidParams";
                formatError.errorMessage = ex.ToString();
                return Json(formatError, JsonRequestBehavior.AllowGet);
            }
 
            try {
                //Response.Write("The Context Timeout is set to: " + kpi.CommandTimeout + "\n");
                var result = kpi.terKPIConceptV2(fromDate, toDate, org, company, market, dm, storenum);
                return Json(result, JsonRequestBehavior.AllowGet);
            } catch (FormatException ex) {
                Models.ErrorMessage formatError = new Models.ErrorMessage();
                formatError.errorName = "Unable to execute procedure " + ex.ToString();
                return Json(formatError, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
