using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Security.Cryptography;
using QuikServe.Models;

namespace QuikServe.Controllers
{
    public class HomeController : Controller
    {
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
        // GET: /Home/

        //public ActionResult Index(string UserId = "540", string AuthToken = "e1d08c232e8330b35aaf1e2d0e4b1132")
        public ActionResult Index(int UserId = 0, string AuthToken = "")
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
                    using (QsSupportContext _db = new QsSupportContext())
                    {
                        List<WebUser> webuser = (from usr in _db.WebUsers
                                                 where usr.WebUserId == UserId
                                                 select usr).ToList<WebUser>();

                        if (webuser.Any())
                        {
                            Session.Timeout = 480;
                            Session["QsUserId"] = UserId;
                            Session["LoginTime"] = DateTime.Now;
                        }
                        else
                        {
                            ViewData["HomeError"] = "User could not be validated!";
                            return View("SErr");
                        }
                    }
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
