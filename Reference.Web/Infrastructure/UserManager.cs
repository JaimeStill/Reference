using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Reference.Data;
using Reference.Data.Model.Identity;
using Reference.Web.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;

namespace Reference.Web.Infrastructure
{
    public class UserManager : IDisposable
    {
        public AppUser CurrentUser { get; set; }
        public UserPrincipal CurrentPrincipal { get; set; }
        public List<string> UserRoles { get; set; }

        public static UserManager Create(IdentityFactoryOptions<UserManager> options, IOwinContext context)
        {
            var manager = new UserManager();

            var user = context.Authentication.User.Identity;
            manager.CurrentPrincipal = user.GetUserPrincipal().Result;

            if (manager.CurrentPrincipal != null)
            {
                using (AppDbContext Context = new AppDbContext())
                {
                    manager.CurrentUser = manager.CurrentPrincipal.GetAppUser(Context).Result;

                    if (manager.CurrentUser != null)
                    {
                        manager.UserRoles = Context.AppUserRoles.Where(x => x.AppUserId == manager.CurrentUser.Id).Select(x => x.AppRole.Role).ToList();
                    }
                }
            }

            return manager;
        }

        public bool Authenticate(params string[] roles)
        {
            try
            {
                if (CurrentPrincipal == null)
                {
                    return false;
                }

                if (CurrentUser == null)
                {
                    return false;
                }

                if (UserRoles == null)
                {
                    return false;
                }

                if (UserRoles.Count < 1)
                {
                    return false;
                }

                foreach (string role in roles)
                {
                    if (UserRoles.Contains(role.Trim()))
                    {
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public void Dispose()
        {
            CurrentUser = new AppUser();
            CurrentPrincipal.Dispose();
            UserRoles = new List<string>();
        }
    }
}