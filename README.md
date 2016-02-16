![Demo Screen](https://cloud.githubusercontent.com/assets/14102723/12961854/7b889454-d010-11e5-91aa-2a3c757a7f21.png)

## Reference for Patterns and Practices

### External Libraries
* [ChartJs](http://www.chartjs.org) (1.0.2) - Chart.Core.js and Chart.Line.js
* [jQuery](http://jquery.com) (1.10.2)
* [Bootstrap](http://getbootstrap.com) (3.0.0)

<hr />

### NuGet Packages

#### Reference.Web
<pre>
Microsoft.AspNet.Identity.Owin (2.2.1)
Microsoft.Owin.Host.SystemWeb (3.0.1)
EntityFramework (6.1.3)
AngularJS.Core (1.4.9)
toastr (2.1.1)
</pre>

#### Reference.Data
<pre>
EntityFramework (6.1.3)
</pre>

<hr />

### Class Library References

#### Reference.Web
<pre>
Assemblies -> Framework -> System.DirectoryServices.AccountManagement
Projects   -> Solution  -> Reference.Data
</pre>

<hr />

### Entity Framework Setup
<pre>
Enable-Migrations
Add-Migration Initial
Update-Database
</pre>
