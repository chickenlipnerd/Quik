using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuikServe.Models
{
    public class UserSessionData
    {
        public enum UserScope 
        {
            ORG = 1,
            COMPANY,
            MARKET,
            STORE,
            FBC
        };

        public enum PrivilegeLevel
        {
            HAMMAD = 1,
            QSUSERS,
            EXTERNALADMIN,
            EXTERNALUSERS
        };

        public bool IsUserGood { get; set; }
        public int UserId { get; set; }
        public string UserOrg { get; set; }
    }
}