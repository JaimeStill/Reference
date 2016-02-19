using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Reference.Web.Models.Demo;
using System.Threading.Tasks;

namespace Reference.Web.Hubs
{
    public class ChartHub : Hub
    {
        public Task Send(string[] labels, IEnumerable<DataSetModel> datasets, IEnumerable<SampleDataModel> samples)
        {
            return Task.Run(() =>
            {
                Clients.Others.updateChart(labels, datasets, samples);
            });
        }
    }
}