using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuikServe.Models;
using System.Diagnostics;
using System.Data.SqlClient;
using System.Configuration;
using System.Collections;

namespace QuikServe.Controllers
{ 
    public class AdminController : Controller
    {
        private QsSupportContext db = new QsSupportContext();

        //
        // GET: /Admn/

        public ViewResult Index()
        {
            return View(db.WebReportSettings.ToList());
        }

        //
        // GET: /Admn/Details/5

        public ViewResult Details(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            return View(webreportsettings);
        }

        //
        // GET: /Admn/Create

        public ActionResult Create()
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["QuikServeContext"].ConnectionString;

            string cmdText = "SELECT Name FROM sysobjects WHERE type = 'P' ORDER BY name";

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            cmd.CommandType = CommandType.Text;

            conn.Open();
            SqlDataReader results = cmd.ExecuteReader();

            ArrayList rslts = new ArrayList();

            while (results.Read())
            {
                string columns = "";

                for (int i = 0; i < results.FieldCount; i++)
                {
                    columns = results.GetValue(i).ToString();
                }

                rslts.Add(columns);
            }

            ViewBag.StoredProcList = rslts.ToArray();

            //conn.Close();

            return View();
        } 

        //
        // POST: /Admn/Create

        [HttpPost]
        public ActionResult Create(WebReportSettings webreportsettings, WebReports webreports)
        {
            if (ModelState.IsValid)
            {

                db.WebReportSettings.Add(webreportsettings);
                db.SaveChanges();
                return RedirectToAction("Index");  
            }

            return View(webreportsettings);
        }
        /*[HttpPost]
        public ActionResult Create(WebReportSettings webreportsettings)
        {
            if (ModelState.IsValid)
            {
                db.WebReportSettings.Add(webreportsettings);
                db.SaveChanges();
                //Trace.WriteLine("Web Report Save");
                return Json(new { success = new { message = "Web Report Saved", saveid = 1 } });
            }

            //Trace.WriteLine("Failed to save report");
            return Json(new { failure = new { message = "Web Report NOT Saved", error = 1 } });
        }*/
        
        //
        // GET: /Admn/Edit/5
 
        public ActionResult Edit(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            return View(webreportsettings);
        }

        //
        // POST: /Admn/Edit/5

        [HttpPost]
        public ActionResult Edit(WebReportSettings webreportsettings)
        {
            if (ModelState.IsValid)
            {
                db.Entry(webreportsettings).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(webreportsettings);
        }

        //
        // GET: /Admn/Delete/5
 
        public ActionResult Delete(int id)
        {
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            return View(webreportsettings);
        }

        //
        // POST: /Admn/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {            
            WebReportSettings webreportsettings = db.WebReportSettings.Find(id);
            db.WebReportSettings.Remove(webreportsettings);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}