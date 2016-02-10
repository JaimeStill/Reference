using Reference.Data;
using Reference.Data.Model.Identity;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;

namespace Reference.Web.Infrastructure.Extensions
{
    public static class IdentityExtensions
    {
        public static Task<UserPrincipal> GetUserPrincipal(this IIdentity identity)
        {
            return Task.Run(() =>
            {
                try
                {
                    WindowsIdentity windowsIdentity = identity as WindowsIdentity;
                    PrincipalContext context = new PrincipalContext(ContextType.Domain);
                    UserPrincipal principal = new UserPrincipal(context);

                    if (context != null)
                    {
                        principal = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, windowsIdentity.Name);
                    }

                    return principal;
                }
                catch
                {
                    return null;
                }
            });
        }

        public static Task<AppUser> GetAppUser(this UserPrincipal user, AppDbContext context)
        {
            return Task.Run(() =>
            {
                AppUser appUser = context.AppUsers.FirstOrDefault(x => x.UserGuid == user.Guid.Value);

                return appUser;
            });
        }
    }
}