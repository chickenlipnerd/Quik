using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class WebReports
    {
        [Key]
        public int WebReportId { get; set; }
        public string ReportName { get; set; }
        public string Procedure { get; set; }
        public int Status { get; set; }
    }
}
