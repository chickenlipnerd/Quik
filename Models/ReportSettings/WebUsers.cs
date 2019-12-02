using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace QuikServe.Models
{
    public class WebUsers
    {
        [Key]
        public int WebUserId { get; set; }
        public string UserName { get; set; }
        public string Org { get; set; }
    }
}
