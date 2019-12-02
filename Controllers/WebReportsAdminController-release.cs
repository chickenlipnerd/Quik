using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Security.Cryptography;
using QuikServe.Models;
using QuikServe.Models.ReportSettings;
using System.Collections;

namespace QuikServe.Controllers
{ 
    public class WebReportsAdminController : Controller
    {
        private QsSupportContext db = new QsSupportContext();
        private QuikServeContext qsdb = new QuikServeContext();

        // Verify a hash against a string.
        static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            // Hash the input.
            string hashOfInput = GetMd5Hash(md5Hash, input);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            if (0 == comparer.Compare(hashOfInput, hash))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        //
        // GET: /WebReportsAdmin/
        // auth just copied from HomeController Index - TODO: move logic to own class
        public ActionResult AdminConsole(int UserId = 0, string AuthToken = "")
        {
            string strAuthTokenKey = "AKD02NGalorunb9FK934mlq01983GN02dms93mdMS93Nlcnb2vq257powm798dlamvhf";
            string sUser = Convert.ToString(UserId) + strAuthTokenKey + DateTime.Now.ToShortDateString(); //final
            //string sUser = Convert.ToString(UserId) + strAuthTokenKey + "03/06/2012"; //temp

            using (MD5 md5Hash = MD5.Create())
            {
                string hash = GetMd5Hash(md5Hash, sUser);
                if (hash != AuthToken)
                {
                    ViewData["HomeError"] = "User could not be validated!";
                    return View("SErr");
                }
                else
                {
                    List<WebUser> webuser = (from usr in db.WebUsers
                                                where usr.WebUserId == UserId
                                                select usr).ToList<WebUser>();

                    if (webuser.Any())
                    {
                        if (webuser[0].PrivilegeId == 1 || webuser[0].PrivilegeId == 2)
                        {
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
                    }
                }
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