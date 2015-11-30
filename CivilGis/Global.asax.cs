using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Http;

namespace CivilGis
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            GlobalConfiguration.Configure(WebApiConfig.Register); // should use this instead of below
           // WebApiConfig.Register(GlobalConfiguration.Configuration);  

            
            // web api route should always before MVC route,

            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }
}
