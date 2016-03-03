using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reference.Data.Model.Tracker
{
    public class Assignment
    {
        [Key]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public double Hours { get; set; }

        public Category Category { get; set; }
    }
}
