using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QuikServe.Controllers
{
    public class ReportsController : Controller
    {
        //
        // GET: /Reports/

        // All public methods in this controller are accessible in a URL
        // http://URL/Reports/KpiConcept?name="Bob"

        //[HttpPost]      // Action Selectors - only post is allowed
        [HttpGet]       // only get is allowed
        //[Authorize]      // utilize this later
        //[Authorize(Roles="Admin")] optional roles parameter
        // [OutputCache]   // leverage to increase performance and scaleability
        public ActionResult KpiConcept(string name = "*")
        {
            //return View();
            //var name = RouteData.Values["name"];    // this is made even easier if you use the parms for this method
            //return Content("You have reached the Reports Controller");
            //return RedirectToAction("Index", "Home");

            //if (name == "*")
            //{
            //    return Json(new { reportName = name }, JsonRequestBehavior.AllowGet);
            //    //return File(Server.MapPath("~/Content/Site.css"), "text/css");
            //    //return RedirectToRoute("Reports", new { name = "german" });
            //    //return RedirectToAction("Index", "Home", new { name = "french" });
            //}

            name = Server.HtmlEncode(name);     /// HtmlEncode method is only needed to when we return Content(); not needed when returning View();

            return Content(name);
        }

    }
}
