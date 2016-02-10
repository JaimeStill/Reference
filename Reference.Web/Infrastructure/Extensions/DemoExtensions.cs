using Reference.Data;
using Reference.Data.Model.Demo;
using Reference.Web.Models.Demo;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Reference.Web.Infrastructure.Extensions
{
    public static class DemoExtensions
    {
        public static Task<IEnumerable<RecordModel>> GetRecords(this AppDbContext context)
        {
            return Task.Run(() =>
            {
                return context.Records.Select(x => new RecordModel
                {
                    id = x.Id,
                    displayName = x.DisplayName,
                    fileName = x.FileName,
                    filePath = x.FilePath,
                    uploadDate = x.UploadDate,
                    uploadedBy = x.UploadedBy
                }).AsEnumerable();
            });
        }

        public static async Task CreateRecords(this AppDbContext context, Collection<MultipartFileData> files, string user)
        {
            foreach (var file in files)
            {
                var fileName = await file.LocalFileName.GetCleanFileName();

                Record record = new Record
                {
                    FileName = fileName,
                    DisplayName = fileName,
                    FilePath = "/Content/Records/" + fileName,
                    UploadDate = DateTime.Now,
                    UploadedBy = user
                };

                context.Records.Add(record);
                await context.SaveChangesAsync();
            }
        }

        public static async Task DeleteRecord(this AppDbContext context, int id, HttpServerUtilityBase server)
        {
            var record = await context.Records.FindAsync(id);
            var path = server.MapPath(record.FilePath);

            if (File.Exists(path))
            {
                File.Delete(path);
            }

            context.Records.Remove(record);
            await context.SaveChangesAsync();
        }
    }
}