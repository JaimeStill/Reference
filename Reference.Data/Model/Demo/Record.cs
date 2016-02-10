using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reference.Data.Model.Demo
{
    public class Record
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FilePath { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public DateTime UploadDate { get; set; }

        [Required]
        public string UploadedBy { get; set; }        
    }
}
