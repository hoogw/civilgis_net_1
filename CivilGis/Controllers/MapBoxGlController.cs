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



       


        //----------------------- End simple map section -------------------------------




        //----------------------- table map section -------------------------------

        public ActionResult renderedfeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult renderedfeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }


        public ActionResult sourcefeaturepagedtablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult sourcefeaturescrollertablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }



        public ActionResult pagedfulltablemap(string area, string subject)
        {

            ViewBag.Subject = subject; // for api call 
            ViewBag.Side_Bar = area;

            ViewBag.Area = area;


            return View();
        }




        public ActionResult scrollerfulltablemap(string area, string subject)
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