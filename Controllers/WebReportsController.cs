using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;
using System.Data.SqlClient;
using System.Configuration;
using QuikServe.Models.ReportSettings;

namespace QuikServe.Controllers
{ 
    public class WebReportsController : Controller
    {
        private QsSupportContext db = new QsSupportContext();
        private QuikServeContext qsdb = new QuikServeContext();

        //
        // GET: /WebReports/

        public ViewResult Index()
        {
            var webreportsettings = db.WebReportSettings.Include(w => w.WebReports);
            return View(webreportsettings.ToList());
        }

        //
        // GET: /WebReports/Details/5

        public ViewResult Details(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            return View(webreportsettings);
        }

        //
        // GET: /WebReports/Create

        public ActionResult Create()
        {
            ViewBag.WebReportId = new SelectList(db.WebReports, "WebReportId", "ReportName");
            return View();
        } 

        //
        // POST: /WebReports/Create

        [HttpPost]
        public ActionResult Create(WebReportSettings webreportsettings)
        {
            if (ModelState.IsValid)
            {
                db.WebReportSettings.Add(webreportsettings);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            ViewBag.WebReportId = new SelectList(db.WebReports, "WebReportId", "ReportName", webreportsettings.WebReportId);
            return View(webreportsettings);
        }
        
        //
        // GET: /WebReports/Edit/5
 
        public ActionResult Edit(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            ViewBag.WebReportId = new SelectList(db.WebReports, "WebReportId", "ReportName", webreportsettings.WebReportId);
            return View(webreportsettings);
        }

        //
        // POST: /WebReports/Edit/5

        [HttpPost]
        public ActionResult Edit(WebReportSettings webreportsettings)
        {
            if (ModelState.IsValid)
            {
                db.Entry(webreportsettings).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.WebReportId = new SelectList(db.WebReports, "WebReportId", "ReportName", webreportsettings.WebReportId);
            return View(webreportsettings);
        }

        //
        // GET: /WebReports/Delete/5
 
        public ActionResult Delete(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            return View(webreportsettings);
        }

        //
        // POST: /WebReports/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            db.WebReportSettings.Remove(webreportsettings);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        
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