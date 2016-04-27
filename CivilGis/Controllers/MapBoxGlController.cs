using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CivilGis.Controllers
{
    public class MapBoxGlController : Controller
    {
        // GET: MapBox
        public ActionResult Index()
        {
            return View();
        }



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



        



        //----------------------- simple map section -------------------------------
        public ActionResult simplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult simplecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }





        public ActionResult multilayersimplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult multilayersimplecolormap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult singlelayersimplemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


       





        //----------------------- End simple map section -------------------------------




        //----------------------- table map section -------------------------------

        public ActionResult multilayerrenderedfeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult multilayerrenderedfeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult multilayersourcefeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult multilayersourcefeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult multilayerpagedfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult multilayerscrollerfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        // .................... single layer ................
        public ActionResult singlelayerrenderedfeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerrenderedfeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult singlelayersourcefeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayersourcefeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult singlelayerpagedfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult singlelayerscrollerfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


















        //-----------------------End  table map section -------------------------------




        //----------------------- classification map section -------------------------------
        public ActionResult classifycheckboxbuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult classifyradiobuttonmap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        //-----------------------end  classification map section -------------------------------






    }
}