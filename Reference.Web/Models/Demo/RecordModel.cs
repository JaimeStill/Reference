using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reference.Web.Models.Demo
{
    public class RecordModel
    {
        public int id { get; set; }
        public string filePath { get; set; }
        public string fileName { get; set; }
        public string displayName { get; set; }
        public string uploadedBy { get; set; }
        public DateTime uploadDate { get; set; }
    }
}