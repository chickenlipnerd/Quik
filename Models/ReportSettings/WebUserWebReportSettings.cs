using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class WebUserWebReportSettings
    {
        [Key]
        public int WebUserWebReportSettingId { get; set; }
        public int UserId { get; set; }
        public int WebReportSettingId { get; set; }
        public int Status { get; set; }
    }
}
