using Reference.Data;
using Reference.Web.Infrastructure;
using Reference.Web.Infrastructure.Extensions;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web;
using System.Collections.Generic;
using Reference.Web.Models.Demo;

namespace Reference.Web.Controllers
{
    public class DemoApiController : ApiController
    {
        private AppDbContext context;
        private UserManager manager;
        private System.Web.HttpServerUtilityBase server;

        public AppDbContext Context
        {
            get
            {
                return context ?? Request.GetOwinContext().Get<AppDbContext>();
            }
            private set
            {
                context = value;
            }
        }

        public UserManager Manager
        {
            get
            {
                return manager ?? Request.GetOwinContext().Get<UserManager>();
            }
            private set
            {
                manager = value;
            }
        }

        public HttpServerUtilityBase Server
        {
            get
            {
                var context = Request.Properties["MS_HttpContext"] as HttpContextWrapper;
                return context.Server;
            }
            private set
            {
                server = value;
            }
        }

        #region Records

        [Route("api/files/getRecords")]
        [HttpGet]
        public async Task<IEnumerable<RecordModel>> GetRecords()
        {
            return await Context.GetRecords();
        }

        [Route("api/files/uploadRecords")]
        [HttpPut]
        public async Task UploadRecords()
        {
            FileNameMultipartFormDataStreamProvider provider = await Request.Content.GetMultipartFormData(Server.MapPath("~/Content/Records/"));
            await Context.CreateRecords(provider.FileData, Manager.CurrentPrincipal.SamAccountName);
        }

        [Route("api/files/deleteRecord")]
        [HttpPost] 
        public async Task DeleteRecord([FromBody]int id)
        {
            await Context.DeleteRecord(id);
        }
        #endregion
    }
}