using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;
using QuikServe.Models.ReportSettings;
using System.Collections;

namespace QuikServe.Controllers
{ 
    public class WebReportsAdminController : Controller
    {
        private QsSupportContext db = new QsSupportContext();
        private QuikServeContext qsdb = new QuikServeContext();

        //
        // GET: /WebReportsAdmin/

        public ActionResult AdminConsole(int? UserId)
        {
            List<WebUser> webuser = (from usr in db.WebUsers
                                        where usr.WebUserId == UserId
                                        select usr).ToList<WebUser>();
            
            if (webuser.Any())
            {
                //DataType someValue = (DataType)Session["SessionVariableNameHere"]; //Getter 
                //Session["SessionVariableNameHere"] = someNewValue; //Setter
                Session.Timeout = 480;
                Session["QsUserId"] = UserId;
                Session["QsUserPrivilegeId"] = webuser[0].PrivilegeId.ToString();
                Session["LoginTime"] = DateTime.Now;
            }
            else
            {
                ViewData["HomeError"] = "User could not be validated!";
                return RedirectToAction("SErr", "Home", new { iExpired = true });
            }

            return View();
        }

        public ViewResult Index()
        {
            return View(db.WebReports.ToList());
        }

        //
        // GET: /WebReportsAdmin/Details/5

        public ViewResult Details(int id)
        {
            WebReports webreports = db.WebReports.Find(id);
            return View(webreports);
        }

        //
        // GET: /WebReportsAdmin/Create

        public ActionResult Create()
        {
            SelectList rslist = new SelectList(qsdb.Database.SqlQuery<StoreProc>("SELECT Name FROM sysobjects WHERE type = 'P' ORDER BY name"), "name", "name");

            ViewBag.Procedure = rslist;
            
            return View();
        } 

        //
        // POST: /WebReportsAdmin/Create

        [HttpPost]
        public ActionResult Create(WebReports webreports, WebReportSettings webreportsettings)
        {
            if (ModelState.IsValid)
            {
                var report = (from rpt in db.WebReports
                              where rpt.ReportName == webreports.ReportName
                              select rpt);

                if (report.Any())
                {
                    return Json(new { msg = "Report names must be unique" });
                }

                db.WebReports.Add(webreports);
                db.SaveChanges();

                webreportsettings.WebReportId = webreports.WebReportId;
                db.WebReportSettings.Add(webreportsettings);
                db.SaveChanges();

                return Json(new { msg = "Your report has been saved successfully!" });  
            }

            //return View(webreports);
            return Json(new {msg = "Your report was not saved. Please reconfigure the report and try again."});
        }
        
        //
        // GET: /WebReportsAdmin/Edit/5
 
        public ActionResult Edit(int id)
        {
            WebReports webreports = db.WebReports.Find(id);
            return View(webreports);
        }

        //
        // POST: /WebReportsAdmin/Edit/5

        [HttpPost]
        public ActionResult Edit(WebReports webreports)
        {
            if (ModelState.IsValid)
            {
                db.Entry(webreports).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(webreports);
        }

        //
        // GET: /WebReportsAdmin/Delete/5
 
        public ActionResult Delete(int id)
        {
            WebReports webreports = db.WebReports.Find(id);
            return View(webreports);
        }

        //
        // POST: /WebReportsAdmin/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            WebReports webreports = db.WebReports.Find(id);
            db.WebReports.Remove(webreports);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public ActionResult GetSPList()
        {
            var splist = qsdb.Database.SqlQuery<StoreProc>("SELECT Name FROM sysobjects WHERE type = 'P' ORDER BY name");

            return Json(splist, JsonRequestBehavior.AllowGet);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}