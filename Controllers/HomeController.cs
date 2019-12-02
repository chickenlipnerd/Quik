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
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index(int? UserId)
        {
            using (QsSupportContext _db = new QsSupportContext())
            {
                List<WebUser> webuser = (from usr in _db.WebUsers
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
                    return View("SErr");
                }

            }

            return View();
        }

        public ActionResult SErr(bool iExpired = false)
        {
            if (iExpired)
            {
                ViewData["HomeError"] = "Login timed out. Please login again";
            }
            return View();
        }

    }
}
