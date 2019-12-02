using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Common;
using System.Data.SqlClient;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web.Script.Serialization;

namespace QuikServe.Controllers
{

    public class ReportProcController : Controller
    {

        public ActionResult Index(string sp = "", string uid = "0", string sDate = "", string eDate = "", string org = "", string company = "", string market = "", string dm = "", string storenum = "")
        {

            if (Session["QsUserId"] == null)
            {
                ViewData["HomeError"] = "User Session expired";
                return RedirectToAction("SErr", "Home", new { iExpired = true });
            }

            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["QuikServeContext"].ConnectionString;

            string cmdText = sp;

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandText = cmdText;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 3600;

            conn.Open();
            SqlCommandBuilder.DeriveParameters(cmd);
            conn.Close();

            List<SqlParameter> inputParamList = new List<SqlParameter>();

            string [] aUrlParms = { sDate.ToString(), eDate.ToString(), org.ToString(), company.ToString(), market.ToString(), dm.ToString(), storenum.ToString() };

            int iArb = 0;

            foreach (SqlParameter param in cmd.Parameters)
            {
                if (param.Direction == ParameterDirection.Input)
                {
                    param.Value = aUrlParms[iArb];
                    iArb++;
                    inputParamList.Add(param);
                }
            }

            conn.Open();
            SqlDataReader rs = cmd.ExecuteReader();

            ArrayList rows = new ArrayList();

            while (rs.Read())
            {
                Dictionary<string, object> columns = new Dictionary<string, object>();
                // or Dictionary<string, string> columns = new Dictionary<string, string>();
                for (int i = 0; i < rs.FieldCount; i++)
                {
                    columns.Add(rs.GetName(i), rs.GetValue(i));
                    // or columns.Add(rs.GetName(i), rs.GetValue(i).ToString());
                }

                rows.Add(columns);
            }

            conn.Close();
            
            //return Json(rows, JsonRequestBehavior.AllowGet);
            //return Json(rows);
            var serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = Int32.MaxValue;

            var result = new ContentResult
            {
                Content = serializer.Serialize(rows),
                ContentType = "application/json"
            };
            return result;
        }

    }
}
