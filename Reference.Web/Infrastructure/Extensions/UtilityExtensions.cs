using Microsoft.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Reference.Web.Infrastructure.Extensions
{
    public static class UtilityExtensions
    {
        public static IOwinContext GetOwinContext(this HttpRequestMessage request)
        {
            var context = request.Properties["MS_HttpContext"] as HttpContextWrapper;

            if (context != null)
            {
                return HttpContextBaseExtensions.GetOwinContext(context.Request);
            }

            return null;
        }

        public static Task<string> GetCleanFileName(this string fileName)
        {
            return Task.Run(() =>
            {
                var split = fileName.Replace("\"", string.Empty).Split('\\');
                return split[split.Count() - 1];
            });
        }

        public static async Task<FileNameMultipartFormDataStreamProvider> GetMultipartFormData(this HttpContent content, string path)
        {
            if (!content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var provider = new FileNameMultipartFormDataStreamProvider(path);

            try
            {
                await content.ReadAsMultipartAsync(provider);
                return provider;
            }
            catch
            {
                throw new HttpResponseException(HttpStatusCode.InternalServerError);
            }
        }
    }
}