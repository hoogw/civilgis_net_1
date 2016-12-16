using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http.Headers;
using WebApiContrib.Formatting;

namespace CivilGis
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            // note: ..../{area}/{subject}/   in action method, must use same name parameter as here. For example, in this case, must use action(string area, string subject),  if use 'subj' will fail.

            // --------------  table data  -------------------------

            config.Routes.MapHttpRoute(
                name: "TableDataApi",
                routeTemplate: "api/{controller}/{action}/{area}/{subject}/",
                defaults: new { id = RouteParameter.Optional }
            );


            config.Routes.MapHttpRoute(
                name: "TableContentApi",
                routeTemplate: "api/{controller}/{action}/{area}/",
                defaults: new { id = RouteParameter.Optional }
            );


            //----------------------------------------------------------------



            // *****************  database api *******************

            //  example:  http://locahost:100/api/DB_Postgis/sql/geojson/civilgis/select%20.../

            config.Routes.MapHttpRoute(
                name: "Api_sql",
                routeTemplate: "api/{controller}/{action}/{format}/{db}/{sql}/",
                defaults: new { id = RouteParameter.Optional }
            );


            //  example:  http://locahost:100/api/DB_Postgis/intersect/geojson/civilgis/city_parks/117.98/32.98/127.90/49.78/
            config.Routes.MapHttpRoute(
                name: "Api_intersect",
                routeTemplate: "api/{controller}/{action}/{format}/{db}/{table}/{SWlong}/{SWlat}/{NElong}/{NElat}/",
                defaults: new { id = RouteParameter.Optional }
            );




            // *****************  End   database api *******************








            //    -------------    mapping    --------------------------------

            // SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
            // Note .../{subj}/... subj must match parameter in controller action method, if you use subj, in methed parameter must use subj, if you use subject, will mismatch, will failed to map to


            config.Routes.MapHttpRoute(
                name: "MapApi",
                routeTemplate: "api/{controller}/{action}/{area}/{subj}/{SWlong}/{SWlat}/{NElong}/{NElat}/",
                defaults: new { id = RouteParameter.Optional }
            );


            // webapicontrib.formatting plain text formatter
            config.Formatters.Add(new PlainTextFormatter());


            // below two case all use json formatter, which add extra "", and extra \", not what I want. have to use above plain text formatter. 

            // this line will make sure the response message is JSON format, without this line, the default response message is XML format.
           // config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));


            // remove xml formatters, default to JSON formatters,
          //  config.Formatters.Remove(config.Formatters.XmlFormatter);

        }
    }
}
