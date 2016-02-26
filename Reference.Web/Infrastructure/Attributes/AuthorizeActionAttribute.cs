using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Reference.Web.Infrastructure.Attributes
{
    public class AuthorizeActionAttribute : ActionFilterAttribute
    {
        public string Roles { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (!String.IsNullOrEmpty(Roles))
            {
                var Manager = HttpContext.Current.GetOwinContext().Get<UserManager>();

                var roles = Roles.Split(',');

                if (!Manager.Authenticate(roles))
                {
                    filterContext.Result = new RedirectResult("/Error/UnauthorizedAccess");
                }
            }
        }
    }
}