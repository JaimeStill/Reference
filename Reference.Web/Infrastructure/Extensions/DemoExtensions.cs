using Reference.Data;
using Reference.Data.Model.Demo;
using Reference.Data.Model.Tracker;
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

        public static Task<IEnumerable<CategoryModel>> GetCategories(this AppDbContext context)
        {
            return Task.Run(() =>
            {
                var model = context.Categories.Select(x => new CategoryModel
                {
                    id = x.Id,
                    name = x.Name
                }).OrderBy(x => x.id).AsEnumerable();

                return model;
            });
        }

        public static Task<IEnumerable<AssignmentModel>> GetAssignments(this AppDbContext context)
        {
            return Task.Run(() =>
            {
                var model = context.Assignments.Select(x => new AssignmentModel
                {
                    id = x.Id,
                    description = x.Description,
                    hours = x.Hours,
                    category = new CategoryModel { id = x.Category.Id, name = x.Category.Name }
                }).OrderBy(x => x.category.id).AsEnumerable();

                return model;
            });
        }

        public static async Task AddAssignment(this AppDbContext context, AssignmentModel model)
        {
            var assignment = new Assignment
            {
                Description = model.description,
                CategoryId = model.category.id,
                Hours = model.hours
            };

            context.Assignments.Add(assignment);

            await context.SaveChangesAsync();
        }

        public static async Task UpdateAssignment(this AppDbContext context, AssignmentModel model)
        {
            var assignment = await context.Assignments.FindAsync(model.id);

            assignment.Description = model.description;
            assignment.Hours = model.hours;
            assignment.CategoryId = model.category.id;

            await context.SaveChangesAsync();
        }

        public static async Task DeleteAssignment(this AppDbContext context, int id)
        {
            var assignment = await context.Assignments.FindAsync(id);

            context.Assignments.Remove(assignment);

            await context.SaveChangesAsync();
        }

        public static Task<RadarModel> GetAssignmentRadar(this AppDbContext context)
        {
            return Task.Run(() =>
            {
                IEnumerable<string> categories = context.Categories.Select(x => x.Name).AsEnumerable();
                List<double> maxHours = new List<double>();
                List<double> avgHours = new List<double>();
                List<double> minHours = new List<double>();

                foreach (var category in categories)
                {
                    maxHours.Add(context.Assignments.Where(x => x.Category.Name == category).Max(x => x.Hours));
                    avgHours.Add(context.Assignments.Where(x => x.Category.Name == category).Average(x => x.Hours));
                    minHours.Add(context.Assignments.Where(x => x.Category.Name == category).Min(x => x.Hours));
                }

                return new RadarModel
                {
                    categories = categories,
                    maxHours = maxHours.AsEnumerable(),
                    avgHours = avgHours.AsEnumerable(),
                    minHours = minHours.AsEnumerable()
                };
            });
        }
    }
}