using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Reference.Web.Hubs
{
    public class FileHub : Hub
    {
        public void Send()
        {
            Clients.All.getRecords();
        }
    }
}