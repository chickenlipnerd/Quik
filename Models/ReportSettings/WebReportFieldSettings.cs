using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class WebReportFieldSettings
    {
        [Key]
        public int WebReportFieldSettingId { get; set; }
        public int WebReportSettingId { get; set; }
        public string DefaultFieldName { get; set; }
        public string CustomFieldName { get; set; }
        public int DisplayOrder { get; set; }
        public int SortOrder { get; set; }
        public int Visible { get; set; }
        public int Locked { get; set; }
        public int SummaryType { get; set; }
        public int ValueType { get; set; }
    }
}
