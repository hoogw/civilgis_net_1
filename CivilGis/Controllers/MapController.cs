using CivilGis.Models;

using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace CivilGis.Controllers
{
    public class MapController : Controller
    {


        public string GetBaseUrl()
        {

            var request = System.Web.HttpContext.Current.Request;
            
            var appUrl = HttpRuntime.AppDomainAppVirtualPath;

            if (appUrl != "/")
               {
                   appUrl += "/";
                }

            var baseUrl = string.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, appUrl);

            return baseUrl;
        }






        //    map/index default is google map
        public ActionResult Index()
        {
            return View();
           
        }



        public ActionResult Googlemap()
        {

            return View();

        }

        public ActionResult Heremap()
        {

            return View();

        }


        public ActionResult Mapboxgl()
        {

            return View();

        }


        public ActionResult Mapbox()
        {

            return View();

        }


        public ActionResult Mapquest()
        {

            return View();

        }



        public ActionResult Bingmap()
        {
            
            return View();

        }


        
        public ActionResult Leaflet()
        {

            return View();

        }





        public ActionResult Leafletmvt()
        {

            return View();

        }



        public ActionResult Openlayers()
        {

            return View();

        }




        public ActionResult Arcgis()
        {

            return View();

        }


        public ActionResult Arcgisleaflet()
        {

            return View();

        }


        public ActionResult Arcgisjavascriptapi()
        {

            return View();

        }


        public ActionResult carto()
        {

            return View();

        }


        public ActionResult vg()
        {

            return View();

        }



        public ActionResult iot()
        {

            return View();

        }


        public ActionResult mongodb()
        {

            return View();

        }


        public ActionResult postgis()
        {

            return View();

        }



        public ActionResult material_design()
        {

            return View();

        }


    }
}