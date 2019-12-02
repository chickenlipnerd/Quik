using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Security.Cryptography;

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

        public ActionResult Index(string uid="0", string AuthToken="blahblah")
        {
            /*Session["UserGood"] = true;
            Session["User"] = "DeviceId=d3066f5601949f96212dbd6960abdf65&UserKey=03c7c0ace395d80182db07ae2c30f034&UserName=Johna&RememberMe=1&UserPass=Saved";
            Session["UserOrg"] = "TJCorp";
            Session["UserScope"] = 1;
            Session["UserId"] = 540;*/

            ViewData["UserGood"] = Session["UserGood"];
            ViewData["UserOrg"] = Session["UserOrg"];
            ViewData["UserScope"] = Session["UserScope"];
            ViewData["UserId"] = Session["UserId"];

            // TODO: Set up a mechanism to check sessions and redirect if necessary to an error page or designated home screen
            Models.UserSessionData userdata = new Models.UserSessionData();
            userdata.IsUserGood = Convert.ToBoolean(Session["UserGood"]);
            userdata.UserId = Convert.ToInt32(Session["UserId"]);
            userdata.UserOrg = Convert.ToString(Session["UserOrg"]);

            if (!userdata.IsUserGood)
            {
                ViewData["HomeError"] = "Your session timed out";
                return View("SErr");
            }

            // user id has hash
            string sUser = Convert.ToString(Session["User"]);
            string[] hashVals = sUser.Split(new Char[] { '&', '=' });
            string userHash = "";

            for (int i = 0; i < hashVals.Length; i++)
            {
                if (hashVals[i] == "UserKey")
                {
                    userHash = hashVals[i + 1];
                }
            }

            // compare hashed strings
            using (MD5 md5Hash = MD5.Create())
            {
                if (VerifyMd5Hash(md5Hash, "540", userHash))
                {
                    Console.WriteLine("The hashes are the same.");
                }
                else
                {
                    Console.WriteLine("The hashes are not same.");
                }
            }

            if (!(userdata.UserId == 540) && !(userdata.UserId == 558))
            {
                ViewData["HomeError"] = "User is not logged on";
                return View("SErr");
            }

            if (!(Convert.ToInt32(Session["UserScope"]) == 1))
            {
                ViewData["HomeError"] = "You don't have permission to view this report";
                return View("SErr");
            }

            if (!(userdata.UserOrg == "TJCorp"))
            {
                ViewData["HomeError"] = "Only organizations level users are able to view reports";
                return View("SErr");
            }

            return View();
        }

        public ActionResult SErr()
        {
            return View();
        }

    }
}
