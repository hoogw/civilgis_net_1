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



            

            //    -------------    mapping    --------------------------------

           // SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';

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
