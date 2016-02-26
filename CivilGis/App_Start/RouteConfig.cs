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
            name: "home",
            url: "home/{action}/{area}/",
            defaults: new { controller = "Home", action = "local",  area = "city" }
        );


            routes.MapRoute(
               name: "thememap",
               url: "thememap/{action}/{area}/{subject}/",
               defaults: new { controller = "ThemeMap", action = "index" }
           );



            routes.MapRoute(
                name: "localmap",
                url: "localmap/{action}/{area}/{subject}/",
                defaults: new { controller = "LocalMap", action = "index" }
            );



            routes.MapRoute(
                name: "localmap2",
                url: "localmap/{action}/{area}/",
                defaults: new { controller = "LocalMap", action = "localmaplistpaged", area = "city" }
            );



            routes.MapRoute(
                name: "bingmap",
                url: "bingmap/{action}/{area}/{subject}/",
                defaults: new { controller = "BingMap", action = "index" }
            );


            routes.MapRoute(
                name: "openlayersmap",
                url: "openlayers/{action}/{area}/{subject}/",
                defaults: new { controller = "Openlayers", action = "index" }
            );


            routes.MapRoute(
                name: "leafletmap",
                url: "leaflet/{action}/{area}/{subject}/",
                defaults: new { controller = "Leaflet", action = "index" }
            );




            routes.MapRoute(
                name: "map",
                url: "map/{action}/{area}/{subject}/",
                defaults: new { controller = "Map", action = "index" }
            );


            routes.MapRoute(
               name: "map2",
               url: "map/{action}/{area}/",
               defaults: new { controller = "Map", action = "maplistpaged", area = "city" }
           );
            
             

            routes.MapRoute(
               name: "Default",
               url: "",
               defaults: new { controller = "Map", action = "index" }
           );

        }
    }
}
