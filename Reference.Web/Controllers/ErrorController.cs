﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Reference.Web.Controllers
{
    public class ErrorController : Controller
    {
        public Task<ActionResult> UnauthorizedAccess()
        {
            return Task.Run(() =>
            {
                return (ActionResult)View();
            });
        }
    }
}