using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Reference.Web.Models.Demo;

namespace Reference.Web.Hubs
{
    public class ChartHub : Hub
    {
        public void Send(string[] labels, IEnumerable<DataSetModel> datasets, IEnumerable<SampleDataModel> samples)
        {
            Clients.Others.updateChart(labels, datasets, samples);
        }
    }
}