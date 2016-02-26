using Microsoft.AspNet.Identity.Owin;
using Reference.Web.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Reference.Web.Infrastructure.Attributes
{
    public class AuthorizeApiAttribute : ActionFilterAttribute
    {
        public string Roles { get; set; }

        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);

            if (!String.IsNullOrEmpty(Roles))
            {
                var Manager = HttpContext.Current.GetOwinContext().Get<UserManager>();

                var roles = Roles.Split(',');

                if (!Manager.Authenticate(roles))
                {
                    HttpResponseMessage message = new HttpResponseMessage(HttpStatusCode.Redirect);
                    message.Headers.Location = actionContext.GetRedirectUri("/Error/UnauthorizedAccess");
                    actionContext.Response = message;
                }
            }
        }
    }
}