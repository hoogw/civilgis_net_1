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






            // arcgis -----------
           

            routes.MapRoute(
              name: "arcgis",
              url: "arcgis/{action}/{frontmap}/{area}/{subject}/",
              defaults: new { controller = "Arcgis", action = "simplemap", area = "city", subject = "zoning"}
          );


           




            routes.MapRoute(
              name: "arcgisleaflet",
              url: "arcgisleaflet/{action}/{area}/{subject}/",
              defaults: new { controller = "arcgisleaflet", action = "index" }
          );



            routes.MapRoute(
             name: "arcgisjavascriptapi",
             url: "arcgisjavascriptapi/{action}/{area}/{subject}/",
             defaults: new { controller = "arcgisjavascriptapi", action = "index" }
         );



            // mapping -----------------

            routes.MapRoute(
            name: "home",
            url: "home/{action}/{area}/",
            defaults: new { controller = "Home", action = "local",  area = "city" }
        );


            routes.MapRoute(
            name: "home_arcgis",
            url: "home/{action}/{frontmap}/{area}/",
            defaults: new { controller = "Home", action = "arcgis", frontmap = "googlemap", area = "city" }
        );




            routes.MapRoute(
                name: "googlemap",
                url: "googlemap/{action}/{area}/{subject}/",
                defaults: new { controller = "GoogleMap", action = "index" }
            );



            routes.MapRoute(
               name: "mapboxgl",
               url: "mapboxgl/{action}/{area}/{subject}/",
               defaults: new { controller = "MapBoxGl", action = "index" }
           );

            routes.MapRoute(
              name: "mapboxgl_overlay1",
              url: "mapboxgl/{action}/{area}/{subject}/{overlay1}/",
              defaults: new { controller = "MapBoxGl", action = "index" }
          );


            routes.MapRoute(
              name: "mapboxgl_overlay2",
              url: "mapboxgl/{action}/{area}/{subject}/{overlay1}/{overlay2}/",
              defaults: new { controller = "MapBoxGl", action = "index" }
          );


            routes.MapRoute(
                name: "mapbox",
                url: "mapbox/{action}/{area}/{subject}/",
                defaults: new { controller = "MapBox", action = "index" }
            );


            routes.MapRoute(
               name: "mapquest",
               url: "mapquest/{action}/{area}/{subject}/",
               defaults: new { controller = "MapQuest", action = "index" }
           );



            routes.MapRoute(
               name: "heremap",
               url: "heremap/{action}/{area}/{subject}/",
               defaults: new { controller = "HereMap", action = "index" }
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
                name: "leafletmvtmap",
                url: "leafletmvt/{action}/{area}/{subject}/",
                defaults: new { controller = "Leafletmvt", action = "index" }
            );



            routes.MapRoute(
                name: "map",
                url: "map/{action}/{area}/{subject}/",
                defaults: new { controller = "Map", action = "index" }
            );


            routes.MapRoute(
               name: "maplist",
               url: "map/{action}/{area}/",
               defaults: new { controller = "Map", action = "maplistpaged", area = "city" }
           );


            routes.MapRoute(
               name: "map_provider",
               url: "map/{action}/",
               defaults: new { controller = "Map", action = "Index" }
           );



            routes.MapRoute(
               name: "Default",
               url: "",
               defaults: new { controller = "Map", action = "index" }
           );

        }
    }
}
