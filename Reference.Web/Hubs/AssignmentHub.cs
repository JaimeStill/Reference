using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR.Hubs;

namespace Reference.Web.Hubs
{
    public class AssignmentHub : Hub
    {
        public Task Send()
        {
            return Task.Run(() =>
            {
                Clients.All.updateAssignments();
            });
        }
    }
}