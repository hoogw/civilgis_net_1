﻿using CivilGis.Models;

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






        // GET: Map
        public ActionResult Index()
        {
            
            
           // CivilGisEntities GE = new CivilGisEntities();
           // return View(GE.Locations.ToList());

            return View();
           //return  PartialView();
        }



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


        public ActionResult Maplistpaged(string subject)
        {

            ViewBag.Area = subject; // for api call 
           // ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            return View();
        }


        public ActionResult Maplistscroller(string subject)
        {

            ViewBag.Area = subject; // for api call 
            //ViewBag.Subject_uppercase = subject.ToUpper(); // for display title in view

            return View();
        }



        [HttpPost]
        public ActionResult Search(string Location)
        {

            CivilGisEntities GE = new CivilGisEntities();
            var result = GE.Locations.Where(x => x.LocationName.StartsWith(Location)).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}