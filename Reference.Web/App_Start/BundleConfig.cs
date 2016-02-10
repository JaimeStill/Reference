using System.Web;
using System.Web.Optimization;

namespace Reference.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js"));

            bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
                "~/Scripts/toastr.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/charts").Include(
                "~/Scripts/Chart.Core.js",
                "~/Scripts/Chart.Line.js"));

            bundles.Add(new Bundle("~/bundles/app").Include(
                "~/Scripts/app/*.js",
                "~/Scripts/app/core/directives/*.js",
                "~/Scripts/app/core/services/*.js"));

            bundles.Add(new Bundle("~/bundles/demo").Include(
                "~/Scripts/app/demo/directives/*.js",
                "~/Scripts/app/demo/services/*.js"));
        }
    }
}
