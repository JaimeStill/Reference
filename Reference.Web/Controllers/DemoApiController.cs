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
        private HttpServerUtilityBase server;

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
            await Context.DeleteRecord(id, Server);
        }

        #endregion

        #region SignalR

        [Route("api/rt/getCategories")]
        [HttpGet]
        public async Task<IEnumerable<CategoryModel>> GetCategories()
        {
            return await Context.GetCategories();
        }

        [Route("api/rt/getAssignments")]
        [HttpGet]
        public async Task<IEnumerable<AssignmentModel>> GetAssignments()
        {
            return await Context.GetAssignments();
        }

        [Route("api/rt/addAssignment")]
        [HttpPost]
        public async Task AddAssignment([FromBody]AssignmentModel model)
        {
            await Context.AddAssignment(model);
        }

        [Route("api/rt/updateAssignment")]
        [HttpPost]
        public async Task UpdateAssignment([FromBody]AssignmentModel model)
        {
            await Context.UpdateAssignment(model);
        }

        [Route("api/rt/deleteAssignment")]
        [HttpPost]
        public async Task DeleteAssignemnt([FromBody]int id)
        {
            await Context.DeleteAssignment(id);
        }

        [Route("api/rt/getAssignmentRadar")]
        [HttpGet]
        public async Task<RadarModel> GetAssignmentRadar()
        {
            return await Context.GetAssignmentRadar();
        }

        #endregion
    }
}