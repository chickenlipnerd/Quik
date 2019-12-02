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
        private UserPrefParmsDataDataContext _db = new UserPrefParmsDataDataContext();

        /*[HttpPost]*/
        public ActionResult Index()
        {
            try
            {
                if (Session["QsUserId"] == null)
                {
                    return RedirectToAction("SErr", "Home", new { iExpired = true });
                }

                try
                {
                    var result = _db.sp_QSLIVE_WebUserReports((int)(Session["QsUserId"]));
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
