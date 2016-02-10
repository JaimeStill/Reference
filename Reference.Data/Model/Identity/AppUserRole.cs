using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reference.Data.Model.Identity
{
    public class AppUserRole
    {
        [Key]
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public int AppRoleId { get; set; }

        public AppUser AppUser { get; set; }
        public AppRole AppRole { get; set; }
    }
}
