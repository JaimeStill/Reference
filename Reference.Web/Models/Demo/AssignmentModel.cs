using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reference.Web.Models.Demo
{
    public class AssignmentModel
    {
        public int id { get; set; }
        public string description { get; set; }
        public double hours { get; set; }
        public CategoryModel category { get; set; }
    }
}