using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Reference.Web.Models.Demo
{
    public class RadarModel
    {
        public IEnumerable<string> categories { get; set; }
        public IEnumerable<double> maxHours { get; set; }
        public IEnumerable<double> avgHours { get; set; }
        public IEnumerable<double> minHours { get; set; }
    }
}