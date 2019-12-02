using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class WebReportSettings
    {
        [Key]
        public int WebReportSettingId { get; set; }
        public int? WebReportId { get; set; }
        public string CustomReportName { get; set; }
        public int DateRangeType { get; set; }
        public DateTime? SeedDate { get; set; }
        public int? SeedIncrement { get; set; }
        public int Type { get; set; }
        public string ColumnDefinition { get; set; }
        //public virtual WebReports WebReports { get; set; } //experimental - only use with WebReportsController.cs * don't erase
    }
}
