using System.Web;
using System.Web.Optimization;

namespace Reference.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/core").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery.validate*",
                "~/Scripts/modernizr-*",
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js",
                "~/Scripts/angular.js",
                "~/Scripts/toastr.js",
                "~/Scripts/app/*.js",
                "~/Scripts/app/core/directives/*.js",
                "~/Scripts/app/core/services/*.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/charts").Include(
                "~/Scripts/Chart.Core.js",
                "~/Scripts/Chart.Line.js"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/app/*.js",
                "~/Scripts/app/core/directives/*.js",
                "~/Scripts/app/core/services/*.js"));

            bundles.Add(new ScriptBundle("~/bundles/demo").Include(
                "~/Scripts/app/demo/directives/*.js",
                "~/Scripts/app/demo/services/*.js"));
        }
    }
}
