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



        public ActionResult Openlayers()
        {

            return View();

        }



        // -------------   below are old, testing only, not in use --------------------------        

        public ActionResult mapsmpp(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

        public ActionResult mapsmps(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

        public ActionResult mappaged(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }

        public ActionResult mapscroller(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = area;


            return View();
        }




        public ActionResult City(string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = "city";


            return View();
        }

        public ActionResult County(string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            ViewBag.Area = "county";


            return View();
        }


        public ActionResult Maplistpaged(string area)
        {

            ViewBag.Area = area; // for api call 
           // ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            return View();
        }


        public ActionResult Maplistscroller(string area)
        {

            ViewBag.Area = area; // for api call 
            //ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            return View();
        }





        //--------------------above testing only, not in use --------------------------------------


    }
}