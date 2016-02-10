using Reference.Web.Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Reference.Web.Infrastructure
{
    public class FileNameMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public FileNameMultipartFormDataStreamProvider(string path) : base(path) { }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            if (string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
            {
                return "UnknownFileName";
            }
            else
            {
                return headers.ContentDisposition.FileName.GetCleanFileName().Result;
            }
        }
    }
}