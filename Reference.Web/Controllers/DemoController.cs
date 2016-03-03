using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Reference.Web.Controllers
{
    public class DemoController : Controller
    {
        // GET: Demo
        public Task<ActionResult> Index()
        {
            return Task.Run(() =>
            {
                return (ActionResult)View();
            });
        }

        public Task<ActionResult> SignalRServer()
        {
            return Task.Run(() =>
            {
                return (ActionResult)View();
            });
        }

        public Task<ActionResult> SignalRClient()
        {
            return Task.Run(() =>
            {
                return (ActionResult)View();
            });
        }
    }
}