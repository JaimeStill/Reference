using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Reference.Data;
using Reference.Web.Infrastructure;

[assembly: OwinStartup(typeof(Reference.Web.Startup))]

namespace Reference.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext(AppDbContext.Create);
            app.CreatePerOwinContext<UserManager>(UserManager.Create);
        }
    }
}
