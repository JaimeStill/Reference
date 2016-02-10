using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reference.Data.Model.Identity
{
    public class AppRole
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
