using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CivilGis
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            // more specific route should on the top order, more generic route should at the bottom 



            // table - data -------------------

            routes.MapRoute(
                name: "table_data",
                url: "data/{action}/{area}/{subject}",
                defaults: new { controller = "Data", action = "paged", area = "Chicago"  }
            );




            routes.MapRoute(
                name: "table_content",
                url: "data/{action}/{area}/",
                defaults: new { controller = "Data", action = "listPaged", area = "Chicago" }
            );

          





            // mapping -----------------

          /*
            routes.MapRoute(
                name: "city",
                url: "map/city/",
                defaults: new { controller = "Map", action = "city", subject = "zoning" }
            );



            routes.MapRoute(
                name: "county",
                url: "map/county/",
                defaults: new { controller = "Map", action = "county", subject = "bounds" }
            );

         */

           


            routes.MapRoute(
                name: "map1",
                url: "map/{action}/{area}/{subject}/",
                defaults: new { controller = "Map", action = "index" }
            );


            routes.MapRoute(
               name: "map2",
               url: "map/{action}/{subject}/",
               defaults: new { controller = "Map", action = "city", subject = "zoning" }
           );
            
              

            routes.MapRoute(
               name: "Default",
               url: "",
               defaults: new { controller = "Map", action = "index" }
           );

        }
    }
}
