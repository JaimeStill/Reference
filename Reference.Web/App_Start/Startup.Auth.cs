using Owin;
using Reference.Data;
using Reference.Web.Infrastructure;

namespace Reference.Web
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.CreatePerOwinContext(AppDbContext.Create);
            app.CreatePerOwinContext<UserManager>(UserManager.Create);
        }
    }
}