using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class UserParms
    {
        [Key]
        public int WebReportId { get; set; }
        public string ReportName { get; set; }
        public string Procedure { get; set; }
        public int? DateRangeType { get; set; }
        public int? Type { get; set; }
        public int? SeedIncrement { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}